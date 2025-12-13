import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Program from "./pages/Program";
import Placements from "./pages/Placements";
import Stipend from "./pages/Stipend";
import Blogs from "./pages/Blogs";
import FAQs from "./pages/FAQs";
import Help from "./pages/Help";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/program/:id" element={<Program />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/stipend" element={<Stipend />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
