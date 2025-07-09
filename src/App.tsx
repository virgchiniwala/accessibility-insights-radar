import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportHighlights from "./pages/ReportHighlights";
import ReportDetails from "./pages/ReportDetails";
import IssueDetailExport from "./pages/IssueDetailExport";
import ScanHistoryComparison from "./pages/ScanHistoryComparison";
import AgencyDashboardBeta from "./pages/AgencyDashboardBeta";
import ScanHome from "./pages/ScanHome";
import ScanHomeFocus from "./pages/ScanHomeFocus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScanHome />} />
          <Route path="/scan-focus" element={<ScanHomeFocus />} />
          <Route path="/reports" element={<ReportHighlights />} />
          <Route path="/report-details" element={<ReportDetails />} />
          <Route path="/issue-detail" element={<IssueDetailExport />} />
          <Route path="/history" element={<ScanHistoryComparison />} />
          <Route path="/dashboard" element={<AgencyDashboardBeta />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
