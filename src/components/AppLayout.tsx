import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import { Bell, Search, User } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search audits, departments..."
                className="pl-9 pr-4 py-2 text-sm rounded-lg border border-input bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 w-80"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Audit Director</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
