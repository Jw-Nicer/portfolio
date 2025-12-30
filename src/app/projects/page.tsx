import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import PageTransition from "@/components/layout/page-transition"

export default async function ProjectsPage() {
    const supabase = await createClient()
    const { data: gallery } = await supabase
        .from("media_items")
        .select("*")
        .order("sort_order", { ascending: true })

    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-8 pt-32 pb-20">
                <h1 className="text-3xl font-bold tracking-tight mb-4">All Projects</h1>
                <p className="text-muted-foreground mb-12 max-w-xl">
                    A collection of data visualization, automation scripts, and case studies.
                </p>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {gallery?.map((item) => (
                        <div key={item.id} className="break-inside-avoid relative rounded-xl overflow-hidden bg-muted shadow-sm hover:shadow-md transition-shadow group">
                            <Image
                                src={item.public_url}
                                alt={item.alt_text || "Project"}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="font-medium text-sm">{item.caption || "Untitled Work"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    )
}
