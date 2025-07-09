import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink, Mail, Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface SplitButtonProps {
  onExport?: (type: string) => void;
}

export function SplitButton({ onExport }: SplitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (type: string) => {
    if (onExport) {
      onExport(type);
    }
    
    if (type === 'jira') {
      toast.success("Ticket GOV-123 created 👍", {
        duration: 4000,
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="flex">
      <Button 
        onClick={() => handleExport('jira')}
        className="rounded-r-none border-r border-primary-active/20"
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Export
      </Button>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="default"
            size="icon"
            className="rounded-l-none w-10 border-l-0"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleExport('jira')}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Export to Jira
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('email')}>
            <Mail className="h-4 w-4 mr-2" />
            Email Vendor
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('json')}>
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}