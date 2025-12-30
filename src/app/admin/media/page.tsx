import { MediaLibrary } from "@/components/admin/media-library"

export default function MediaPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Media Gallery</h1>
                <p className="text-muted-foreground">
                    Manage your portfolio images. Drag to reorder.
                </p>
            </div>
            <MediaLibrary />
        </div>
    )
}
