"use client"

import * as React from "react"

import {
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {
  return (
    <SidebarMenu >
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <span className="text-lg">🚀</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                 AutoFill Me
                </span>
                <span className="truncate text-xs">KU HackFest 2024</span>
              </div>
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
