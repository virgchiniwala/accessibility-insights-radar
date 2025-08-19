import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import HomePOC from "./pages/HomePOC";
import ReportDetail from "./pages/ReportDetail";
import ReportsHome from "./pages/ReportsHome";
import IssueDetailNew from "./pages/IssueDetailNew";
import ScanHistoryNew from "./pages/ScanHistoryNew";
import EmpTracker from "./pages/EmpTracker";
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
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePOC />} />
            <Route path="/scan" element={<ScanLanding />} />
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
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
