import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import oobeeLogoUrl from "@/assets/oobee-logo.png";

interface LayoutProps {
  children: React.ReactNode;
  showActions?: boolean;
  actionButtons?: React.ReactNode;
}

export function Layout({ children, showActions = true, actionButtons }: LayoutProps) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={oobeeLogoUrl} 
                alt="Oobee Logo" 
                className="h-8 w-auto"
              />
            </Link>
            
            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <Link 
                to="/" 
                className={`text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === "/" ? "text-primary" : "text-foreground"
                }`}
              >
                Reports
              </Link>
              <Link 
                to="/history" 
                className={`text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === "/history" ? "text-primary" : "text-foreground"
                }`}
              >
                History
              </Link>
              <Link 
                to="/dashboard" 
                className={`text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === "/dashboard" ? "text-primary" : "text-foreground"
                }`}
              >
                Dashboard
              </Link>
            </nav>
          </div>
          
          {showActions && (
            <div className="flex items-center gap-4">
              {actionButtons || (
                <>
                  <Button variant="outline">Copy link</Button>
                  <Button>Export to Jira</Button>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}