import { personal } from "@/content/data"

export function Footer() {
    return (
        <footer className="border-t bg-background/50 backdrop-blur-sm py-16">
            <div className="container mx-auto px-4 sm:px-8 flex flex-col items-center text-center gap-8">

                {/* Name graphic */}
                <div className="text-2xl font-black tracking-tighter opacity-20 hover:opacity-100 transition-opacity">
                    {personal.name.toUpperCase()}
                </div>

                <div className="flex gap-8 text-sm font-medium">
                    <a href="/projects" className="hover:text-primary transition-colors">Work</a>
                    <a href="/about" className="hover:text-primary transition-colors">About</a>
                    <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
                </div>

                <div className="flex gap-6 text-sm text-muted-foreground">
                    <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        LinkedIn
                    </a>
                    <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        GitHub
                    </a>
                    <a href={`mailto:${personal.email}`} className="hover:text-foreground transition-colors">
                        Email
                    </a>
                </div>

                <div className="text-xs text-muted-foreground/50 mt-8">
                    © {new Date().getFullYear()} {personal.name}. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
