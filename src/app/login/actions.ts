'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Validate email
    const email = formData.get('email') as string
    const adminEmail = "johnwilnicer@gmail.com" // Hardcoded security check

    if (!email || email !== adminEmail) {
        // Return error or just redirect to avoid leaking info
        // For this personal app, we can be explicit
        return redirect('/login?message=Unauthorized email')
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: false, // Only allow if user exists (or enable true if you haven't signed up yet)
            // Actually for the FIRST time, we need true, then we can lock it down. 
            // Let's set it to TRUE for now to allow the first signup.
            // shouldCreateUser: true,
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`, // Supabase constructs this
        }
    })

    // We need to use the ORIGIN for the redirect to work properly with localhost
    // But Supabase "Redirect URLs" need to be configured. 
    // Let's try standard approach.

    if (error) {
        redirect('/login?message=Could not authenticate user')
    }

    revalidatePath('/', 'layout')
    redirect('/login?message=Check email for Magic Link')
}
