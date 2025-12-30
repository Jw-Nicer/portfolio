"use client"

import { personal } from "@/content/data"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MoveRight, Zap, TrendingUp, Clock } from "lucide-react"
import PageTransition from "@/components/layout/page-transition"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { MediaItem } from "@/types/database"

export default function Home() {
  const [gallery, setGallery] = useState<MediaItem[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("media_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .limit(6)
      .then(({ data }) => {
        if (data) setGallery(data)
      })
  }, [])

  return (
    <PageTransition>
      <div className="flex flex-col gap-40 pb-20">

        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col justify-center px-4 pt-32 pb-16">

          {/* Gradient Background Orb */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] -z-10" />

          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
                <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                  {personal.roleDetail}
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] max-w-5xl">
                  {personal.tagline.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      className={i === personal.tagline.split(" ").length - 2 ? "text-primary inline-block" : "inline-block"}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light"
                >
                  {personal.about.short}
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/projects">
                  <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                    Explore My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-medium hover:bg-muted/50 hover:border-foreground/20">
                    Get In Touch
                  </Button>
                </Link>
              </motion.div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex flex-wrap gap-8 pt-12 border-t border-border/50"
              >
                {personal.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Gallery */}
        <section className="container mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                <div className="h-px w-8 bg-primary" />
                Portfolio
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Selected Work</h2>
              <p className="text-muted-foreground text-lg">Real projects, real impact</p>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center text-sm font-semibold hover:text-primary transition-colors group">
              View All Projects <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {!gallery || gallery.length === 0 ? (
            <div className="py-32 border-2 border-dashed rounded-3xl bg-muted/20 text-center">
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                  <Zap className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium">No projects yet</p>
                <p className="text-sm text-muted-foreground">Upload your work via the Admin Panel</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-5 ring-1 ring-border/50 group-hover:ring-border transition-all">
                    <Image
                      src={item.public_url}
                      alt={item.alt_text || "Portfolio Item"}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">{item.caption || "Untitled Project"}</h3>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-2">
                        {item.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-12 sm:hidden text-center">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="w-full rounded-full">View All Projects</Button>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
