import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Image as ImageIcon, Briefcase, LogOut } from "lucide-react"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-white dark:bg-slate-900 flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold tracking-tight">Johnwil.Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/media">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <ImageIcon size={18} />
                            Media Gallery
                        </Button>
                    </Link>
                    <Link href="/admin/projects">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Briefcase size={18} />
                            Projects
                        </Button>
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <form action="/auth/signout" method="post">
                        <Button variant="outline" className="w-full gap-2">
                            <LogOut size={18} />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                {children}
            </main>
        </div>
    )
}
