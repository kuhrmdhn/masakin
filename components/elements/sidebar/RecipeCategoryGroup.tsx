import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Coffee, Hamburger, IceCreamBowl } from 'lucide-react'
import { SidebarMenuLink } from './SidebarMenuLink'

export default function RecipeCategoryGroup() {
    const menus = [
        {
            icon: Hamburger,
            name: "Makanan"
        },
        {
            icon: Coffee,
            name: "Minuman"
        },
        {
            icon: IceCreamBowl,
            name: "Makanan Penutup"
        }
    ]
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Kategori</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col gap-2">
                {
                    menus.map((menu, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton className="h-10">
                                <SidebarMenuLink href="" icon={menu.icon} text={menu.name} />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                }
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
