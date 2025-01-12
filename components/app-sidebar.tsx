import { auth } from "@/auth";
import { logout } from "@/actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { Home, Clipboard } from "lucide-react";

export async function AppSidebar() {
  const session = await auth();
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Short urls",
      url: "/shortener",
      icon: Clipboard,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          PicoURL
        </h1>
        <p className="text-gray-600 dark:text-slate-400">Welcome to PicoURL</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {session?.user ? (
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button asChild>
            <Link href="/auth/signin">Login</Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
