import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/components/ApplicationLogo';
import NavLink from "@/components/NavLink";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    {title: "Dashboard", url: route("dashboard"), active: route().current("dashboard"), icon: Home, role: ["admin", "superadmin", "owner"]},
    {title: "Tiendas", url: route("tenantIndex"), active: route().current("tenants"), icon: Inbox, role: ["superadmin"]},
    {title: "Productos", url: route("products_index"), active: route().current("products"), icon: Inbox, role: ["admin", "owner"]},
]
 
export function AppSidebar() {
  const user = usePage().props.auth.user;
  
  return (
    <Sidebar variant="inset" className="app-sidebar p-0">
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <Link href="/">
            <ApplicationLogo />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span>Administrar</span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                item.role?.includes(user.role) && (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        href={item.url}
                        active={item.active}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}