import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { MenuTrigger } from "../sidebar/SidebarMenuLink";

const signInFields = [
  {
    name: "email",
    type: "email",
    label: "Alamat Email",
    placeholder: "johndoe@example.com",
  },
  {
    name: "password",
    type: "password",
    label: "Kata Sandi",
    placeholder: "john123",
  },
];

export default function SignInForm() {
  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const signInCredentials = Object.fromEntries(formData)
    const request = await fetch("/api/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ ...signInCredentials }),
      headers: {
        "Content-Type": "Application/json"
      }
    })

    const response = await request.json()
    if (!response.data) {
      return toast.warning(response.message)
    }

    toast.success(response.message)
    return window.location.reload()
  }

  return (
    <Dialog>
      <SidebarMenuItem>
        <DialogTrigger asChild>
          <SidebarMenuButton className="h-10">
            <MenuTrigger icon={LogIn} text="Masuk" />
          </SidebarMenuButton>
        </DialogTrigger>
      </SidebarMenuItem>

      <DialogContent className="flex flex-col gap-7">
        <DialogHeader className="h-max w-full flex flex-col gap-7 items-center">
          <Image src="/logo-with-text.svg" alt="Masakin Logo with Text" height={900} width={1600} className="w-1/2" />
          <div className="flex flex-col gap-1 items-center">
            <DialogTitle>Masuk ke Akun Anda</DialogTitle>
            <DialogDescription>Masukkan Kredensial Anda dengan Benar</DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={(e) => handleSignIn(e)} autoComplete="off" className="space-y-4">
          {signInFields.map((field, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete="off"
                required
              />
            </div>
          ))}
          <Button
            type="submit"
            className="w-full"
          >
            Masuk
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}