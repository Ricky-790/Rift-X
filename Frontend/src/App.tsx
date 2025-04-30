
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentDetailsPage from "./pages/TournamentDetailsPage";
import CreateTournamentPage from "./pages/CreateTournamentPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import TeamManagementPage from "./pages/TeamManagementPage";
import WalletConnectPage from "./pages/WalletConnectPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
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
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
          <Route path="/tournaments/create" element={<CreateTournamentPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/teams" element={<TeamManagementPage />} />
          <Route path="/wallet" element={<WalletConnectPage />} />
          <Route path="/profile/setup" element={<ProfileSetupPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
