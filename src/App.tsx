import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CrewPage from "./pages/CrewPage";
import CrewMemberPage from "./pages/CrewMemberPage";
import ShipStatusPage from "./pages/ShipStatusPage";
import CommunicationsPage from "./pages/CommunicationsPage";
import DiagnosticsPage from "./pages/DiagnosticsPage";
import GalaxyMapPage from "./pages/GalaxyMapPage";
import CargoPage from "./pages/CargoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crew" element={<CrewPage />} />
          <Route path="/crew/:id" element={<CrewMemberPage />} />
          <Route path="/status" element={<ShipStatusPage />} />
          <Route path="/communications" element={<CommunicationsPage />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/galaxy-map" element={<GalaxyMapPage />} />
          <Route path="/cargo" element={<CargoPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
