import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Program from "./pages/Program";
import BemsProgram from "./pages/programs/BemsProgram";
import MdProgram from "./pages/programs/MdProgram";
import DemsProgram from "./pages/programs/DemsProgram";
import CemsProgram from "./pages/programs/CemsProgram";
import PhdProgram from "./pages/programs/PhdProgram";
import Placements from "./pages/Placements";
import Stipend from "./pages/Stipend";
import News from "./pages/News";
import FAQs from "./pages/FAQs";
import Help from "./pages/Help";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NewsManager from "./pages/admin/NewsManager";
import PaymentsManager from "./pages/admin/PaymentsManager";
import AdmissionsManager from "./pages/admin/AdmissionsManager";
import NewsEditorPage from "./pages/admin/NewsEditorPage";
import ApplicationsManager from "./pages/admin/ApplicationsManager";
import NoticesManager from "./pages/admin/NoticesManager";
import AppSettings from "./pages/admin/AppSettings";

// Student Portal
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentNotices from "./pages/student/StudentNotices";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/program/:id" element={<Program />} />
          <Route path="/programs/bems" element={<BemsProgram />} />
          <Route path="/programs/md" element={<MdProgram />} />
          <Route path="/programs/phd" element={<PhdProgram />} />
          <Route path="/programs/dems" element={<DemsProgram />} />
          <Route path="/programs/cems" element={<CemsProgram />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/stipend" element={<Stipend />} />
          <Route path="/news" element={<News />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help" element={<Help />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/login" element={<Login />} />

          {/* Student Portal */}
          <Route path="/student" element={<ProtectedRoute redirectPath="/login"><StudentLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="notices" element={<StudentNotices />} />
              <Route path="results" element={<div className="p-8 text-center text-gray-500">Results Module Coming Soon</div>} />
              <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="news/create" element={<NewsEditorPage />} />
            <Route path="news/edit/:id" element={<NewsEditorPage />} />
            <Route path="applications" element={<ApplicationsManager />} />
            <Route path="notices" element={<NoticesManager />} />
            <Route path="payments" element={<PaymentsManager />} />
            <Route path="admissions" element={<AdmissionsManager />} />
            <Route path="settings" element={<AppSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
