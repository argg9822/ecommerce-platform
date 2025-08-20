import { Calendar, Home, Inbox, Search, Settings, ListOrdered, ShoppingBasket, PlusCircle } from "lucide-react";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ItemText } from "@radix-ui/react-select";
import { Button } from "../ui/button";

const items = [
  {
    title: "Dashboard",
    url: route("dashboard"),
    active: route().current("dashboard"),
    icon: Home,
    role: ["admin", "superadmin", "owner"]
  },
  {
    title: "Tiendas",
    url: route("tenantIndex"),
    active: route().current("tenants"),
    icon: Inbox,
    role: ["superadmin"]
  },
  {
    title: "Productos",
    url: route("products_index"),
    active: route().current("products"),
    icon: Inbox,
    role: ["admin", "owner"],
    createRoute: route('products_create')
  },
  {
    title: "Órdenes",
    url: route("orders_index"),
    active: route().current("ordenes"),
    icon: ListOrdered,
    role: ["admin", "owner"]
  },
  {
    title: "Marketing",
    active: route().current("marketing"),
    icon: ShoppingBasket,
    role: ["admin", "owner"],
    subMenu: [
      {
        title: "Cupones",
        url: route("coupons_index"),
        active: route().current("marketing"),
        icon: ShoppingBasket,
        role: ["admin", "owner"]
      },
    ]
  },
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
          <SidebarGroupLabel className="text-sm text-gray-100">
            <span>Administrar</span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                item.role?.includes(user.role) && (
                  !item.subMenu
                    ?
                    <SidebarMenuItem key={`menu-item-${item.title}`}>
                      <SidebarMenuButton asChild>
                        <div className="relative">
                          <NavLink href={item.url} active={item.active} className="w-full">
                            <item.icon />
                            <span>{item.title}</span>
                          </NavLink>
                          
                          {item.createRoute && (
                            <Link 
                              href={route('products_create')} 
                              className="absolute right-2 top-1/2 transform -translate-y-1/2" 
                              title="Crear producto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <PlusCircle className="text-blue-300" size={15} />
                            </Link>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    :
                    <Accordion key={`accordion-${item.title}-${index}`} type="single" collapsible className="w-full" defaultValue="item-1">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-gray-100  pb-0">
                          <SidebarGroupLabel className="text-sm text-gray-100">
                            {item.title}
                          </SidebarGroupLabel>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.subMenu.map((option) => (
                            <SidebarMenuItem key={option.title}>
                              <SidebarMenuButton asChild>
                                <NavLink href={option.url} active={option.active}>
                                  <option.icon />
                                  <span>{option.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
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