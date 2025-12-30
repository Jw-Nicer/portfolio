"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { MediaItem } from "@/types/database"
import Image from "next/image"
import { GripVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SortableMediaItemProps {
    item: MediaItem
    onEdit: (item: MediaItem) => void
    onDelete: (item: MediaItem) => void
}

export function SortableMediaItem({ item, onEdit, onDelete }: SortableMediaItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative aspect-square bg-muted rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all"
        >
            <Image
                src={item.public_url}
                alt={item.alt_text || "Image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />

            {/* Overlay controls */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-end">
                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 text-xs"
                        onClick={(e) => {
                            e.stopPropagation() // Prevent drag start
                            onDelete(item)
                        }}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>

                <div className="flex items-center justify-between">
                    {/* Drag Handle */}
                    <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 bg-white/20 rounded-md backdrop-blur-sm text-white hover:bg-white/30">
                        <GripVertical size={16} />
                    </div>

                    {/* Edit Button */}
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onEdit(item)}
                    >
                        <Pencil size={14} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
