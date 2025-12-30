"use client"

import Link from "next/link"
import { personal } from "@/content/data"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function Header() {
    const pathname = usePathname()

    const navs = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Work" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ]

    // Data points animation - representing analytics
    const dataPoints = Array.from({ length: 5 }, (_, i) => i)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto px-6 sm:px-8 flex items-center justify-between h-16">

                {/* Animated Brand with Data Visualization */}
                <Link href="/" className="flex items-center gap-3 group relative">
                    {/* Mini Data Bars Animation */}
                    <div className="flex items-end gap-[2px] h-5 opacity-60 group-hover:opacity-100 transition-opacity">
                        {dataPoints.map((i) => (
                            <motion.div
                                key={i}
                                className="w-[3px] bg-gradient-to-t from-primary to-primary/50 rounded-full"
                                animate={{
                                    height: ["40%", "100%", "60%", "80%", "40%"],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Brand Name with Gradient */}
                    <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent relative">
                        {personal.firstName.toUpperCase()}
                        {/* Scanning line effect */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                            animate={{
                                width: ["0%", "100%", "0%"],
                                left: ["0%", "0%", "100%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatDelay: 1,
                            }}
                        />
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-8">
                    {navs.map(nav => (
                        <Link
                            key={nav.href}
                            href={nav.href}
                            className="relative group"
                        >
                            <span className={cn(
                                "text-sm font-medium transition-colors",
                                pathname === nav.href
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}>
                                {nav.label}
                            </span>
                            {/* Active underline */}
                            <span className={cn(
                                "absolute -bottom-[21px] left-0 right-0 h-[2px] bg-foreground transition-all duration-300",
                                pathname === nav.href ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                            )} />
                        </Link>
                    ))}
                </nav>

                {/* Admin Access */}
                <Link
                    href="/login"
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Admin
                </Link>

            </div>
        </header>
    )
}
