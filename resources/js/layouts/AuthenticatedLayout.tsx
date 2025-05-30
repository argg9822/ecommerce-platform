import { PropsWithChildren, ReactNode, useState } from 'react';
import { SidebarProvider  } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopBar } from "@/components/app/app-topbar";

export default function Authenticated({
    children,
    header,
    className = '',
}: PropsWithChildren<{ header?: ReactNode, className?: string }>) {
    return (
        <div className={className + "min-h-screen main-container pb-10 pt-20"}>
            <SidebarProvider>
                <AppSidebar />
                <main className='w-full'>
                    <AppTopBar />

                    {header && (
                        <div className="px-4 sm:px-6">
                            {header}
                        </div>
                    )}

                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}
