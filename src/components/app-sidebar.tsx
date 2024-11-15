"use client"

import * as React from "react"
import {
  BookOpen,
  FileUser,
  Settings,
  House,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Janak Dhami",
    email: "info@example.com",
    avatar: "/avatars/test.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Forms",
      url: "/dashboard/forms",
      icon: FileUser,
    },
    {
      title: "Data & Documents",
      url: "/dashboard/documents",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon"  {...props}>
      <SidebarHeader>
        <TeamSwitcher/>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
