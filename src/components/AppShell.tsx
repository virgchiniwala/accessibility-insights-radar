import { AppHeader } from "@/components/AppHeader";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main>
        {children}
      </main>
    </div>
  );
}