export type MediaItem = {
    id: string
    created_at: string
    storage_path: string
    public_url: string
    width: number | null
    height: number | null
    alt_text: string | null
    caption: string | null
    tags: string[] | null
    sort_order: number
}

export type Project = {
    id: string
    created_at: string
    slug: string
    title: string
    description: string | null
    content: string | null
    thumbnail_id: string | null
    published: boolean
    sort_order: number
}
