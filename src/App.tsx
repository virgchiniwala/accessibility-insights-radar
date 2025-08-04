import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportHighlights from "./pages/ReportHighlights";
import ReportDetails from "./pages/ReportDetails";
import ReportDetail from "./pages/ReportDetail";
import ReportsHome from "./pages/ReportsHome";
import IssueDetailExport from "./pages/IssueDetailExport";
import IssueDetailNew from "./pages/IssueDetailNew";
import ScanHistoryComparison from "./pages/ScanHistoryComparison";
import ScanHistoryNew from "./pages/ScanHistoryNew";
import AgencyDashboardBeta from "./pages/AgencyDashboardBeta";
import DashboardNew from "./pages/DashboardNew";
import ScanHome from "./pages/ScanHome";
import ScanHomeFocus from "./pages/ScanHomeFocus";
import NotFound from "./pages/NotFound";
import ReportDetailsWithHelper from "./pages/ReportDetailsWithHelper";
import ReportDetailsWithModal from "./pages/ReportDetailsWithModal";
import AIHelperModalNew from "./pages/AIHelperModalNew";

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
          <Route path="/reports" element={<ReportsHome />} />
          <Route path="/report-highlights" element={<ReportHighlights />} />
          <Route path="/report-details" element={<ReportDetail />} />
          <Route path="/issue-detail" element={<IssueDetailNew />} />
          <Route path="/history" element={<ScanHistoryNew />} />
          <Route path="/dashboard" element={<DashboardNew />} />
          <Route path="/report-helper" element={<AIHelperModalNew />} />
          <Route path="/report-modal" element={<ReportDetailsWithModal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
