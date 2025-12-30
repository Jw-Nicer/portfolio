import { personal } from "@/content/data"
import Image from "next/image"
import PageTransition from "@/components/layout/page-transition"
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
    return (
        <PageTransition>
            <div className="relative overflow-hidden">
                {/* Hero Section with Creative Layout */}
                <div className="container mx-auto px-4 sm:px-8 pt-24 pb-32">

                    {/* Large "ABOUT" Background Text */}
                    <div className="absolute top-20 left-0 right-0 text-center pointer-events-none select-none">
                        <h2 className="text-[180px] font-black tracking-tighter text-foreground/[0.03] uppercase">
                            ABOUT
                        </h2>
                    </div>

                    <div className="relative grid lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">

                        {/* Left: Title & Photo - Overlapping Design */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Main Title */}
                            <div className="space-y-4">
                                <div className="inline-block">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-[3px] w-12 bg-primary rounded-full" />
                                        <span className="text-sm font-bold tracking-widest uppercase text-primary">
                                            Introduction
                                        </span>
                                    </div>
                                    <h1 className="text-6xl sm:text-7xl font-black tracking-tighter leading-none">
                                        Meet the
                                        <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary">
                                            Analyst
                                        </span>
                                    </h1>
                                </div>
                                <p className="text-xl text-muted-foreground font-medium">
                                    {personal.role} • {personal.roleDetail}
                                </p>
                            </div>

                            {/* Profile Photo - Floating Card Style */}
                            <div className="relative mt-12">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />
                                <div className="relative aspect-square w-full max-w-[400px] rounded-3xl overflow-hidden ring-1 ring-border/50 shadow-2xl">
                                    <Image
                                        src="/profile.png"
                                        alt={personal.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Overlay Badge */}
                                    <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-lg border border-border/50">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Available</p>
                                        <p className="text-sm font-bold mt-0.5">For Projects</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Bio Content */}
                        <div className="lg:col-span-7 space-y-10">
                            {/* Bio Text */}
                            <div className="space-y-6 text-lg leading-relaxed">
                                {personal.about.long.split('\n\n').map((paragraph, i) => (
                                    <p key={i} className="text-foreground/80">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Quick Connect */}
                            <div className="space-y-4 pt-8">
                                <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                                    <div className="h-px w-8 bg-border" />
                                    Quick Connect
                                </h3>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <a
                                        href={`mailto:${personal.email}`}
                                        className="group flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Mail className="text-primary" size={24} />
                                            <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</p>
                                            <p className="text-sm font-bold mt-1 truncate">Send Message</p>
                                        </div>
                                    </a>

                                    <a
                                        href={personal.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Linkedin className="text-primary" size={24} />
                                            <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">LinkedIn</p>
                                            <p className="text-sm font-bold mt-1">View Profile</p>
                                        </div>
                                    </a>

                                    <a
                                        href={personal.socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Github className="text-primary" size={24} />
                                            <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">GitHub</p>
                                            <p className="text-sm font-bold mt-1">See Code</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section - Full Width */}
                <div className="bg-gradient-to-b from-muted/30 to-background border-y border-border/50 py-16">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
                            {personal.stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="text-center space-y-3"
                                >
                                    <div className="text-6xl sm:text-7xl font-black tracking-tighter bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
