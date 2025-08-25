import { Home, Inbox, Search, Settings, ListOrdered, ShoppingBasket, PlusCircle } from "lucide-react";
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

type MenuItem = {
  title: string;
  url?: string;
  active?: boolean;
  icon: React.ElementType;
  role?: string[];
  createRoute?: string;
  subMenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: route("dashboard"),
    active: route().current("dashboard"),
    icon: Home,
    role: ["admin", "superadmin", "owner"]
  },
  {
    title: "Administrar",
    icon: ShoppingBasket,
    subMenu: [
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
      }
    ]
  },
  {
    title: "Marketing",
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
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                !item.subMenu
                  ?
                  <SidebarMenuItem key={`menu-item-${item.title}`}>
                    {item.role?.includes(user.role) && (
                      
                        <SidebarMenuButton className="flex justify-between">
                          <NavLink href={item.url ?? "#"} active={item.active ?? false} className="w-full text-sm">
                            <item.icon size={16} />
                            <span>{item.title}</span>
                          </NavLink>

                          {item.createRoute && (
                            <Link
                              href={route('products_create')}
                              title="Crear producto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <PlusCircle className="text-blue-300" size={15} />
                            </Link>
                          )}
                        </SidebarMenuButton>
                    )}
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
                          option.role?.includes(user.role) && (
                            <SidebarMenuItem key={option.title}>
                              <SidebarMenuButton>
                                <NavLink href={option.url ?? "#"} active={option.active ?? false} className="flex justify-between w-full">
                                  <div className="flex items-center gap-2 text-sm">
                                    <option.icon size={16} />
                                    <span>{option.title}</span>
                                  </div>

                                  {option.createRoute && (
                                    <Link
                                      href={route('products_create')}
                                      title="Crear producto"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <PlusCircle className="text-blue-300" size={15} />
                                    </Link>
                                  )}
                                </NavLink>


                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}