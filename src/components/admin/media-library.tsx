"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { MediaItem } from "@/types/database"
import { UploadZone } from "./upload-zone"
import { SortableMediaItem } from "./sortable-media-item"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable"

export function MediaLibrary() {
    const [items, setItems] = useState<MediaItem[]>([])
    const [loading, setLoading] = useState(true)
    const [editingItem, setEditingItem] = useState<MediaItem | null>(null)

    const supabase = createClient()

    // DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Prevent accidental drags
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const fetchItems = async () => {
        setLoading(true)
        const { data } = await supabase
            .from("media_items")
            .select("*")
            .order("sort_order", { ascending: true }) // Respect sort order

        if (data) setItems(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    // --- ACTIONS ---

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        setItems((items) => {
            const oldIndex = items.findIndex((i) => i.id === active.id)
            const newIndex = items.findIndex((i) => i.id === over.id)
            const newItems = arrayMove(items, oldIndex, newIndex)

            // Persist order in background
            persistOrder(newItems)

            return newItems
        })
    }

    const persistOrder = async (newItems: MediaItem[]) => {
        // Optimization: Only update if changed? 
        // For simplicity, we just send a batch update of (id, sort_order)
        // Supabase JS doesn't support bulk update easily in one query without an edge function usually
        // But we can just iterate or use an 'upsert' if we constructed the data right.
        // Let's use simplified approach: just loop (not ideal for 1000 items, fine for 50)
        // OR BETTER: use `upsert` with all fields? No, that's heavy.
        // Let's just create a quick mapped array and upsert it.

        const updates = newItems.map((item, index) => ({
            ...item,
            sort_order: index,
        }))

        const { error } = await supabase.from("media_items").upsert(updates)
        if (error) toast.error("Failed to save order")
    }

    const handleDelete = async (item: MediaItem) => {
        if (!confirm("Are you sure? This cannot be undone.")) return

        // 1. Delete from Storage
        const { error: storageError } = await supabase.storage
            .from("portfolio-media")
            .remove([item.storage_path])

        if (storageError) {
            toast.error("Failed to delete file from storage")
            return
        }

        // 2. Delete from DB
        const { error: dbError } = await supabase
            .from("media_items")
            .delete()
            .eq("id", item.id)

        if (dbError) {
            toast.error("Failed to delete metadata")
        } else {
            toast.success("Image deleted")
            setItems((prev) => prev.filter((i) => i.id !== item.id))
        }
    }

    const handleSaveEdit = async () => {
        if (!editingItem) return

        const { error } = await supabase
            .from("media_items")
            .update({
                alt_text: editingItem.alt_text,
                caption: editingItem.caption,
            })
            .eq("id", editingItem.id)

        if (error) {
            toast.error("Failed to update")
        } else {
            toast.success("Updated details")
            setItems(prev => prev.map(i => i.id === editingItem.id ? editingItem : i))
            setEditingItem(null)
        }
    }

    return (
        <div className="space-y-8 pb-20">
            <UploadZone onUploadComplete={fetchItems} />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-tight">Library ({items.length})</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-muted-foreground" />
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-20 border rounded-lg bg-muted/20 text-muted-foreground">
                            No images yet. Upload some above!
                        </div>
                    ) : (
                        <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {items.map((item) => (
                                    <SortableMediaItem
                                        key={item.id}
                                        item={item}
                                        onEdit={setEditingItem}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    )}
                </div>
            </DndContext>

            {/* Edit Dialog */}
            <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Image Details</DialogTitle>
                    </DialogHeader>
                    {editingItem && (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label>Alt Text (Accessibility)</Label>
                                <Input
                                    value={editingItem.alt_text || ""}
                                    onChange={(e) => setEditingItem({ ...editingItem, alt_text: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Caption</Label>
                                <Input
                                    value={editingItem.caption || ""}
                                    onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
                        <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
