import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportSummaryLite from "./pages/ReportSummaryLite";
import ReportSummaryFull from "./pages/ReportSummaryFull";
import IssueDetail from "./pages/IssueDetail";
import ScanHistory from "./pages/ScanHistory";
import AgencyDashboard from "./pages/AgencyDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReportSummaryLite />} />
          <Route path="/report-full" element={<ReportSummaryFull />} />
          <Route path="/issue-detail" element={<IssueDetail />} />
          <Route path="/history" element={<ScanHistory />} />
          <Route path="/dashboard" element={<AgencyDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
