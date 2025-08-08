import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import oobeeLogoUrl from "@/assets/oobee_logo.png";

export function AppHeader() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white border-b border-border px-6 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 rounded"
          >
            <img 
              src={oobeeLogoUrl} 
              alt="Oobee logo" 
              height="32"
              className="h-8 w-auto"
            />
          </Link>
          
          <nav className="flex items-center gap-6" aria-label="Primary">
            <Link 
              to="/reports" 
              className={`text-base font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 rounded px-2 py-1 ${
                isActive("/reports") ? "text-primary border-b-2 border-primary" : "text-foreground"
              }`}
            >
              Reports
            </Link>
            <Link 
              to="/history" 
              className={`text-base font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 rounded px-2 py-1 ${
                isActive("/history") ? "text-primary border-b-2 border-primary" : "text-foreground"
              }`}
            >
              History
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-base font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 rounded px-2 py-1 ${
                isActive("/dashboard") ? "text-primary border-b-2 border-primary" : "text-foreground"
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button asChild className="focus:ring-2 focus:ring-focus focus:ring-offset-2">
            <Link to="/scan">Run New Scan</Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-10 focus:ring-2 focus:ring-focus focus:ring-offset-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">John Doe</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Account Preferences
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}