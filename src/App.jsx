import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";

// Auth pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

// App layout
import AppLayout from "@/components/layout/AppLayout";

// Pages
import Dashboard from "@/pages/Dashboard";
import StaffDashboard from "@/pages/StaffDashboard";
import Fleet from "@/pages/Fleet";
import Jobs from "@/pages/Jobs";
import MapView from "@/pages/MapView";
import ClientPortal from "@/pages/ClientPortal";
import Finance from "@/pages/Finance";
import Reports from "@/pages/Reports";
import Booking from "@/pages/Booking";
import Documents from "@/pages/Documents";
import ExecutiveDashboard from "@/pages/ExecutiveDashboard";
import DMTWorkflow from "@/pages/DMTWorkflow";
import MGTWorkflow from "@/pages/MGTWorkflow";
import DSSWorkflow from "@/pages/DSSWorkflow";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="animate-float">
            <img
              src="https://media.base44.com/images/public/6a434fcdf106195f32f0ac41/15890aad2_image.png"
              alt="Robur Resources"
              className="h-64 w-64 object-contain animate-pulse-soft"
              style={{
                maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 60%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 60%, transparent 100%)",
              }}
            />
          </div>
          <div className="w-8 h-8 border-2 border-robur-light border-t-robur-charcoal rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    } else if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ExecutiveDashboard />} />
          <Route path="/operations" element={<StaffDashboard />} />
          <Route path="/driver" element={<Dashboard />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/clients" element={<ClientPortal />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/dmt" element={<DMTWorkflow />} />
          <Route path="/mgt" element={<MGTWorkflow />} />
          <Route path="/dss" element={<DSSWorkflow />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;