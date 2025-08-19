import {
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Fragment, useEffect, useState } from "react";

interface BreadcrumbItem {
  path: string;
  route: string;
}

export default function AppBreadcrumb (){
  const pathNamesMap: Record<string, BreadcrumbItem> = {
    'tenants': {path: 'Tiendas', route:'tenantIndex'},
    'productos': {path: 'Productos', route:'products_index'},
    'dashboard': {path: 'Inicio', route: 'dashboard'},
    'create': {path: 'Nuevo', route: 'products_create'},
    'profile': {path: 'Perfil', route: 'profile.edit'},
    'edit' : {path: 'Editar', route: 'products_edit'},
    'orders' : {path: 'Órdenes', route: 'orders_index'},
    'cupones' : {path: 'Cupones', route: 'coupons_index'}
  }

  const [breadrumbs, setBreadrumbs] = useState<string[]>([]);

  useEffect(() => {
    const currentLocation = window.location.pathname;
    const pathNames = currentLocation.split("/").filter((x) => x);
    setBreadrumbs(pathNames);
  }, []);
  
  return (
    <Breadcrumb className="pl-6 hidden md:flex">
      <BreadcrumbList>
        {breadrumbs.map((path, index) => {
          if (pathNamesMap[path]?.path) {
            const last = index === breadrumbs.length - 1;
            const toRoute = pathNamesMap[path]?.route || 'products_index';
            const displayName = pathNamesMap[path]?.path || '';
            
            return (
              <Fragment key={index}>
                <BreadcrumbSeparator />
                {last ? (
                  <BreadcrumbPage className="font-extrabold text-gray-300">{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={route(toRoute)}>{displayName}</BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                
              </Fragment>
            )
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}