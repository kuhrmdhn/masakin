"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function SignInPage() {
    async function signIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")
        const request = await fetch("/api/auth/signIn", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        })

        const response = await request.json()

        if (!request.ok) {
            toast.error(response.message || "Login gagal")
            return
        }

        return toast.success(response.message || "Login berhasil")
    }

    return (
        <form onSubmit={signIn}>
            <Label>
                <Input name="email" placeholder='Alamat email Anda, contoh: johndoe@example.com' />
            </Label>
            <Label>
                <Input type="password" name="password" placeholder='Kata sandi akun Anda' />
            </Label>
            <Button type="submit">
                Masuk
            </Button>
        </form>
    )
}
