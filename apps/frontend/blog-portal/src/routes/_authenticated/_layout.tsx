import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { ProfileAvatar } from "@/components/ProfileAvatar";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <SidebarProvider>
      <div className="flex gap-4 h-[100dvh] w-full items-center">
        <AppSidebar />
        <SidebarTrigger className="absolute top-0 left-0 z-10 m-4" />
        <ProfileAvatar className="absolute top-0 right-0 z-10 m-4" />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
