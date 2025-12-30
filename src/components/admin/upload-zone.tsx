"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, X } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function UploadZone({ onUploadComplete }: { onUploadComplete: () => void }) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        setUploading(true)
        setProgress(0)
        const supabase = createClient()
        let successfulUploads = 0

        // Sequential upload to show cleaner progress (or parallel if prefer speed)
        // Let's do parallel 3 at a time for efficiency
        // For simplicity, just parallel all
        const uploadPromises = acceptedFiles.map(async (file, index) => {
            try {
                const fileExt = file.name.split(".").pop()
                const fileName = `${crypto.randomUUID()}.${fileExt}`
                const filePath = `${fileName}` // We can use folders if we want, e.g. uploads/

                // 1. Upload to Storage
                const { error: storageError } = await supabase.storage
                    .from("portfolio-media")
                    .upload(filePath, file)

                if (storageError) throw storageError

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from("portfolio-media")
                    .getPublicUrl(filePath)

                // 3. Insert Metadata
                // We'll calculate minimal dimensions for now or leave null (client-side image read is heavy)
                const { error: dbError } = await supabase.from("media_items").insert({
                    storage_path: filePath,
                    public_url: publicUrl,
                    width: 0, // Placeholder, can fix later with an edge function or client side image onload
                    height: 0,
                    alt_text: file.name,
                    caption: "",
                    sort_order: 0, // Should ideally be max(sort_order) + 1
                })

                if (dbError) throw dbError

                successfulUploads++
                setProgress((successfulUploads / acceptedFiles.length) * 100)
            } catch (error) {
                console.error("Upload error:", error)
                toast.error(`Failed to upload ${file.name}`)
            }
        })

        await Promise.all(uploadPromises)

        setUploading(false)
        if (successfulUploads > 0) {
            toast.success(`Uploaded ${successfulUploads} images`)
            onUploadComplete()
        }
    }, [onUploadComplete])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
        },
    })

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-xl p-10 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-4",
                isDragActive
                    ? "border-primary bg-primary/10 scale-[1.01]"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                uploading && "opacity-50 pointer-events-none"
            )}
        >
            <input {...getInputProps()} />
            <div className="p-4 bg-background rounded-full shadow-sm ring-1 ring-border">
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
                <p className="font-medium">
                    {isDragActive ? "Drop images here" : "Click or drag images to upload"}
                </p>
                <p className="text-xs text-muted-foreground">
                    PNG, JPG, WEBP, GIF up to 5MB
                </p>
            </div>

            {uploading && (
                <div className="w-full max-w-xs space-y-2 mt-4">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Uploading...</p>
                </div>
            )}
        </div>
    )
}
