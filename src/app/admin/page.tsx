export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="font-semibold leading-none tracking-tight">Media Items</h3>
                        <p className="text-sm text-muted-foreground">Total images uploaded</p>
                    </div>
                    <div className="p-6 pt-0 pl-0 mt-4">
                        <div className="text-2xl font-bold">--</div>
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="font-semibold leading-none tracking-tight">Projects</h3>
                        <p className="text-sm text-muted-foreground">Published case studies</p>
                    </div>
                    <div className="p-6 pt-0 pl-0 mt-4">
                        <div className="text-2xl font-bold">--</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
