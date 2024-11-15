import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react"
// import { auth } from "../../../auth";
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import CurrentPathName from "@/hooks/currentPathName";

export const metadata: Metadata = {
    title: "Dashboard | AutoFill Me",
    description: "Generated by create next app",
};
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // const session = await auth();
    // change with !session to enable authentication
    // if (session) return <div className="flex flex-col min-h-screen text-5xl text-white justify-center items-center font-bold">Not authenticated!😡</div>
    return (
        <>
            <SessionProvider>
                <SidebarProvider >
                    <AppSidebar />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1 " />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="/dashboard">
                                                Dashboard
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                <CurrentPathName />
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0"> 
                            {children}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </SessionProvider>
     </>
    )
}