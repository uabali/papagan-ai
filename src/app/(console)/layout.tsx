import { ConsoleSidebar } from "@/components/console/sidebar";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <ConsoleSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
