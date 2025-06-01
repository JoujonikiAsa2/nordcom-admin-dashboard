"use client";

import * as React from "react";
import {
  LayoutGrid,
  Users,
  ShoppingCart,
  Package,
  FileCode,
  FileText,
  Receipt,
  User,
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
import NordcomLogo from "@/assets/svg/nordcomiconAdmin";
import { decodedUserInfoFromToken } from "@/services/user";

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
    title: "Profile",
    url: "/dashboard/admin/profile",
    icon: User,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [profile, setProfile] = React.useState<{
    name: string;
    email: string;
  } | null>(null);
  React.useEffect(() => {
    const getUserInfo = async () => {
      const user = await decodedUserInfoFromToken();
      console.log("current user", user);
      if (user) {
        setProfile(
          user as {
            name: string;
            email: string;
          }
        );
      }
    };
    getUserInfo();
  }, []);

  // console.log(profile);
  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-slate-800 border-r border-slate-700"
      {...props}
    >
      <SidebarHeader className="h-20 bg-slate-800 border-b border-slate-700">
        <SidebarMenu className="flex justify-center items-center h-full">
          <SidebarMenuItem>
            <NordcomLogo className="h-8 w-auto text-white" />
            <div className="flex items-center space-x-2"></div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-slate-800">
        <NavMain items={adminBar} />
      </SidebarContent>
      <SidebarFooter className="bg-slate-800 border-t border-slate-700">
        <NavUser
          user={{
            name: profile?.name as string,
            email: profile?.email as string,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
