"use client";

import * as React from "react";
import { FileCode, FileText, Home, Layers, UserCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { auth } from "@/auth";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const adminBar = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/dashboard/admin/products",
    icon: Layers,
  },
  {
    title: "Categories",
    url: "/dashboard/admin/categories",
    icon: FileCode,
  },
  {
    title: "Brands",
    url: "/dashboard/admin/brands",
    icon: FileText,
  },
  {
    title: "Users",
    url: "/dashboard/admin/users",
    icon: UserCircle,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useSelector((state: RootState) => {
    console.log("Redux state in sidebar:", state);
    return state.auth?.user;
  });

  console.log(data);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminBar} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: (data?.name as string) || "--",
            email: (data?.email as string) || "--",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
