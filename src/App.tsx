
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Associations from "./pages/Associations";
import AssociationDetail from "./pages/AssociationDetail";
import CreateAssociation from "./pages/CreateAssociation";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";
import FormBuilder from "./pages/FormBuilder";
import FinancialDashboard from "./pages/FinancialDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import NotFound from "./pages/NotFound";
import AuthForm from "./components/auth/AuthForm";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// SuperAdmin route wrapper
const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isSuperAdmin, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isSuperAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<AuthForm />} />
              <Route path="/signup" element={<AuthForm />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Association routes */}
              <Route path="/associations" element={
                <ProtectedRoute>
                  <Associations />
                </ProtectedRoute>
              } />
              <Route path="/associations/:id" element={
                <ProtectedRoute>
                  <AssociationDetail />
                </ProtectedRoute>
              } />
              <Route path="/create-association" element={
                <ProtectedRoute>
                  <CreateAssociation />
                </ProtectedRoute>
              } />
              
              {/* Financial dashboard */}
              <Route path="/financial-dashboard/:type/:id" element={
                <ProtectedRoute>
                  <FinancialDashboard />
                </ProtectedRoute>
              } />
              
              {/* Event routes */}
              <Route path="/events" element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              } />
              <Route path="/events/:id" element={
                <ProtectedRoute>
                  <EventDetail />
                </ProtectedRoute>
              } />
              <Route path="/create-event" element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              } />
              
              {/* Project routes */}
              <Route path="/projects" element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="/projects/:id" element={
                <ProtectedRoute>
                  <ProjectDetail />
                </ProtectedRoute>
              } />
              <Route path="/create-project" element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              } />
              
              {/* Form builder */}
              <Route path="/form-builder" element={
                <ProtectedRoute>
                  <FormBuilder />
                </ProtectedRoute>
              } />
              
              {/* SuperAdmin routes */}
              <Route path="/admin" element={
                <SuperAdminRoute>
                  <SuperAdminDashboard />
                </SuperAdminRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
