import { Calendar, Home, Inbox, Search, Settings, ListOrdered, ShoppingBasket } from "lucide-react";
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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const items = [
    {title: "Dashboard", url: route("dashboard"), active: route().current("dashboard"), icon: Home, role: ["admin", "superadmin", "owner"]},
    {title: "Tiendas", url: route("tenantIndex"), active: route().current("tenants"), icon: Inbox, role: ["superadmin"]},
    {title: "Productos", url: route("products_index"), active: route().current("products"), icon: Inbox, role: ["admin", "owner"]},
    {title: "Órdenes", url: route("orders_index"), active: route().current("ordenes"), icon: ListOrdered, role: ["admin", "owner"]},
    {title: "Marketing", active: route().current("marketing"), icon: ShoppingBasket, role: ["admin", "owner"]},
    {title: "Cupones", url: route("coupons_index"), active: route().current("marketing"), icon: ShoppingBasket, role: ["admin", "owner"]},
];

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
                  item.url 
                    ?
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink href={item.url} active={item.active}>
                              <item.icon />
                              <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    :
                      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="text-gray-200">Marketing</AccordionTrigger>
                          <AccordionContent>
                            <NavLink href={route("coupons_index")} active={route().current("marketing")}>
                              <item.icon />
                              <span>Cupones</span>
                            </NavLink>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                  )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}