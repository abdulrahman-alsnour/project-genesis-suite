import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import AuditPlans from "./pages/AuditPlans";
import AnnualPlan from "./pages/AnnualPlan";
import LorTracker from "./pages/LorTracker";
import AuditProgram from "./pages/AuditProgram";
import Observations from "./pages/Observations";
import Reports from "./pages/Reports";
import MLP from "./pages/MLP";
import Committee from "./pages/Committee";
import AuditUniverse from "./pages/AuditUniverse";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/audit-plans" element={<AuditPlans />} />
            <Route path="/annual-plan" element={<AnnualPlan />} />
            <Route path="/lor-tracker" element={<LorTracker />} />
            <Route path="/audit-program" element={<AuditProgram />} />
            <Route path="/observations" element={<Observations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/mlp" element={<MLP />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/audit-universe" element={<AuditUniverse />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
