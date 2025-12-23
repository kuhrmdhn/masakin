"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function SignUpPage() {
    async function signIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        const username = formData.get("username")
        const password = formData.get("password")

        const request = await fetch("/api/auth/signUp", {
            method: "POST",
            body: JSON.stringify({ email, password, username }),
            headers: { "Content-Type": "application/json" }
        })

        const response = await request.json()

        if (!request.ok) {
            toast.error(response.message || "Registrasi gagal")
            return
        }

        return toast.success(response.message || "Registrasi berhasil")
    }

    return (
        <form onSubmit={signIn}>
            <Label>
                <Input name="email" placeholder='Alamat email Anda, contoh: johndoe@example.com' />
            </Label>
            <Label>
                <Input type="text" name="username" placeholder='Nama pengguna Anda' />
            </Label>
            <Label>
                <Input type="password" name="password" placeholder='Kata sandi akun Anda' />
            </Label>
            <Button type="submit">
                Registrasi
            </Button>
        </form>
    )
}
