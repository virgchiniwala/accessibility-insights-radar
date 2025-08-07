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
import EmpTracker from "./pages/EmpTracker";
import NewScanModal from "./pages/NewScanModal";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ScanLanding from "./pages/ScanLanding";
import NotFound from "./pages/NotFound";
import AIHelperModalNew from "./pages/AIHelperModalNew";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScanLanding />} />
          <Route path="/reports" element={<ReportsHome />} />
          <Route path="/report-details" element={<ReportDetail />} />
          <Route path="/issue-detail" element={
            <ErrorBoundary>
              <IssueDetailNew />
            </ErrorBoundary>
          } />
          <Route path="/ai-helper" element={<AIHelperModalNew />} />
          <Route path="/history" element={<ScanHistoryNew />} />
          <Route path="/dashboard" element={<EmpTracker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
