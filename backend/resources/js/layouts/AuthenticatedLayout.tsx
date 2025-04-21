import { PropsWithChildren, ReactNode, useState } from 'react';
import { SidebarProvider, SidebarTrigger  } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppTopBar } from "@/components/AppTopBar";

export default function Authenticated({
    children,
    header,
    className = '',
}: PropsWithChildren<{ header?: ReactNode, className?: string }>) {
    return (
        <div className={className + "min-h-screen main-container"}>
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
