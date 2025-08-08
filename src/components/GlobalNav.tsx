import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function GlobalNav() {
  return (
    <nav className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-heading font-semibold text-foreground">
              Oobee
            </Link>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" asChild>
                <Link to="/reports">Reports</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/history">History</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}