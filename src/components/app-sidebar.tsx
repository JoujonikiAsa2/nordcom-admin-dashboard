"use client";

import * as React from "react";
import {
  LayoutGrid,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  Settings,
  FileCode,
  FileText,
  Receipt,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import NordcomLogo from "@/assets/svg/nordcomiconAdmin";

const adminBar = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Orders",
    url: "/dashboard/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Payment",
    url: "/dashboard/admin/payment",
    icon: Receipt,
  },
  {
    title: "Products",
    url: "/dashboard/admin/products",
    icon: Package,
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
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useSelector((state: RootState) => {
    console.log("Redux state in sidebar:", state);
    return state.auth?.user;
  });

  console.log(data);
  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-slate-800 border-r border-slate-700"
      {...props}
    >
      <SidebarHeader className="h-20 bg-slate-800 border-b border-slate-700">
        <SidebarMenu className="flex justify-center items-center h-full">
          <SidebarMenuItem>
            <div className="flex items-center space-x-2">
              <NordcomLogo className="h-8 w-auto text-white" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-slate-800">
        <NavMain items={adminBar} />
      </SidebarContent>
      <SidebarFooter className="bg-slate-800 border-t border-slate-700">
        <NavUser
          user={{
            name: (data?.name as string) || "Admin",
            email: (data?.email as string) || "admin@nordcom.com",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
