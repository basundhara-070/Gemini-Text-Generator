import { SidebarProvider, SidebarTrigger } from "./sidebar";
import { AppSidebar } from "./app-sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
