import { personal } from "@/content/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, Github } from "lucide-react"
import PageTransition from "@/components/layout/page-transition"

export default function ContactPage() {
    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-8 pt-32 pb-20 max-w-4xl">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Get In Touch</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form Placeholder */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>I usually respond within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input id="name" placeholder="Your name" />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="john@example.com" />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <Textarea id="message" placeholder="How can I help you?" rows={4} />
                                </div>
                                <Button className="w-full">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Direct Contact Info */}
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <a
                                href={`mailto:${personal.email}`}
                                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                            >
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <p className="text-sm text-muted-foreground">{personal.email}</p>
                                </div>
                            </a>

                            <a
                                href={personal.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                            >
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold">LinkedIn</p>
                                    <p className="text-sm text-muted-foreground">Professional Profile</p>
                                </div>
                            </a>

                            <a
                                href={personal.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                            >
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Github size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold">GitHub</p>
                                    <p className="text-sm text-muted-foreground">Code Repositories</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
