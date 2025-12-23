import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import AppSidebar from '../elements/sidebar/AppSidebar'
import AppHeader from '../elements/header/AppHeader'
import { headers } from 'next/headers'

type Props = {
    children: React.ReactNode
}

export default async function SIdebarAndHeaderLayout({ children }: Props) {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    const authPage = ["/signIn", "/signUp"]
    if (authPage.some((page) => pathname?.startsWith(page))) {
        return <>{children}</>
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="rounded-md bg-white w-full m-2 ml-0">
                <AppHeader />
                {children}
            </main>
        </SidebarProvider>
    )
}
