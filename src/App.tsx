import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "@/context/PlayerContext";
import Header from "@/components/ui/Header";
import Index from "./pages/Index";
import PlayerRegister from "./pages/PlayerRegister";
import NotFound from "./pages/NotFound";
import PlayerList from "./pages/PlayerList";
import TeamList from "./pages/TeamList";
import TeamRegistration from "./pages/TeamRegister";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlayerProvider>
        <Toaster />
        <Sonner position="top-center" richColors />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<PlayerRegister />} />
              <Route path="/players" element={<PlayerList />} />
              <Route path="/teams" element={<TeamList />} />
              <Route path="/team-register" element={<TeamRegistration />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
