import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  QrCode,
  Camera,
  Wallet,
  Users,
  Trophy,
  Settings,
  Recycle,
  Leaf,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "manufacturer", "recycler"],
  },
  {
    title: "QR Manager",
    url: "/qr-manager",
    icon: QrCode,
    roles: ["admin", "manufacturer"],
  },
  {
    title: "Scanner",
    url: "/scanner",
    icon: Camera,
    roles: ["rag-picker"],
  },
  {
    title: "Wallet",
    url: "/wallet",
    icon: Wallet,
    roles: ["rag-picker", "recycler", "citizen"],
  },
  {
    title: "Verification",
    url: "/verification",
    icon: Recycle,
    roles: ["recycler"],
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Trophy,
    roles: ["all"],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: Users,
    roles: ["all"],
  },
];

export function AppSidebar({ role }: { role?: string }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  // Mock user role - in real app, this would come from auth context
  const userRole = "admin"; // Change this to test different roles

  const isActive = (path: string) => currentPath === path;

  const filteredItems = navigationItems.filter(
    (item) => item.roles.includes("all") || item.roles.includes(userRole)
  );

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-foreground">
                PlasticTrace
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">v1.0</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-2 sm:px-3 py-2 rounded-lg transition-colors min-h-[44px] ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && (
                        <span className="text-sm sm:text-base">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
