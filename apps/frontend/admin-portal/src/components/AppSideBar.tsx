import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "@tanstack/react-router";
import { apiClient } from "@/utils";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/context/auth";

enum SidebarItemType {
  NAV = "nav",
  FUNC = "func",
}

type SidebarItem = {
  type: SidebarItemType;
  title: string;
  url?: string;
  handler?: (...args: any[]) => void | Promise<void>;
  icon: React.ReactNode | null;
};

const NavItems = ({ sidebarItems }: { sidebarItems: Array<SidebarItem> }) => {
  return sidebarItems
    .filter((item) => item.type === SidebarItemType.NAV)
    .map((item, index) => (
      <SidebarMenuItem key={index}>
        <SidebarMenuButton asChild>
          <Link to={item.url}>
            {item.icon}
            <span className="text-lg font-semibold text-gray-500">
              {item.title}
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
};

const ActionItems = ({
  sidebarItems,
}: {
  sidebarItems: Array<SidebarItem>;
}) => {
  return sidebarItems
    .filter((item) => item.type === SidebarItemType.FUNC)
    .map((item, index) => (
      <SidebarMenuItem key={index}>
        <SidebarMenuButton asChild>
          <Link className="dark text-left justify-start" onClick={item.handler}>
            {item.icon}
            <span className="text-lg font-semibold text-gray-500">
              {item.title}
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
};

export function AppSidebar() {
  const { setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const sidebarItems: Array<SidebarItem> = useMemo(
    () => [
      {
        title: "Posts",
        url: "/posts",
        icon: null,
        type: SidebarItemType.NAV,
      },
      {
        title: "Logout",
        handler: async () => {
          try {
            const { data } = await apiClient.post("/users/logout");
            if (!data) throw new Error("No data returned");
            setUser(null);
          } catch (error) {
            console.error("Failed to logout", error);
          }
        },
        icon: null,
        type: SidebarItemType.FUNC,
      },
    ],
    [],
  );

  useEffect(() => {
    if (isAuthenticated) return;
    navigate({
      to: "/",
    });
  }, [isAuthenticated, navigate]);

  return (
    <Sidebar className="dark">
      <SidebarHeader />
      <SidebarContent className="relative m-4 top-4 left-0 list-none">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xl font-bold">
            Navigation
          </SidebarGroupLabel>
          <NavItems sidebarItems={sidebarItems} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xl font-bold">
            Actions
          </SidebarGroupLabel>
          <ActionItems sidebarItems={sidebarItems} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
