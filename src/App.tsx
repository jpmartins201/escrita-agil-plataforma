
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import Institutional from "./pages/Institutional";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Contact from "./pages/Contact";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";
import Welcome from "./pages/Welcome";
import FAQ from "./pages/FAQ";
import Purchase from "./pages/Purchase";
import NotFound from "./pages/NotFound";
const ZodiacoProfissional = lazy(() => import('./pages/ZodiacoProfissional'));
const ZodiacoResultado = lazy(() => import('./pages/ZodiacoResultado'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/institucional" element={<Institutional />} />
                <Route path="/cursos" element={<Courses />} />
                <Route path="/curso/:courseSlug" element={<CourseDetails />} />
                <Route path="/comprar/:courseSlug" element={<Purchase />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/zodiaco-profissional" element={
                  <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center pt-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Carregando...</p>
                    </div>
                  </div>}>
                    <ZodiacoProfissional />
                  </Suspense>
                } />
                <Route path="/zodiaco-resultado" element={
                  <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center pt-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Carregando...</p>
                    </div>
                  </div>}>
                    <ZodiacoResultado />
                  </Suspense>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

