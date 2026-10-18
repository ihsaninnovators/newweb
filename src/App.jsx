import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import PublicLayout from '@/components/PublicLayout';
// Public pages
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Stats from '@/pages/Stats';
import Contact from '@/pages/Contact';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHome from '@/pages/admin/AdminHome';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminTeam from '@/pages/admin/AdminTeam';
import AdminStats from '@/pages/admin/AdminStats';
import AdminSponsors from '@/pages/admin/AdminSponsors';
import AdminGallery from '@/pages/admin/AdminGallery';
import AdminTimeline from '@/pages/admin/AdminTimeline';
import AdminSubmissions from '@/pages/admin/AdminSubmissions';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/team" element={<AdminTeam />} />
        <Route path="/admin/stats" element={<AdminStats />} />
        <Route path="/admin/sponsors" element={<AdminSponsors />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/timeline" element={<AdminTimeline />} />
        <Route path="/admin/submissions" element={<AdminSubmissions />} />
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
  )
}

export default App