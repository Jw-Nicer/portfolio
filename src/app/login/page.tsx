import { login } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string }>
}) {
    const { message } = await searchParams

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Admin Access</CardTitle>
                    <CardDescription>Enter your email to receive a magic link.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            required
                            autoComplete="email"
                        />
                        <Button formAction={login} className="w-full">
                            Send Magic Link
                        </Button>
                        {message && (
                            <p className={`text-sm text-center mt-2 ${message.includes('Check') ? 'text-green-600 font-medium' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
