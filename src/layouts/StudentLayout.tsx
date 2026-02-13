import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
    { icon: Bell, label: 'Notices', path: '/student/notices' },
    { icon: FileText, label: 'Results', path: '/student/results' },
    { icon: User, label: 'Profile', path: '/student/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
             <GraduationCap className="h-6 w-6 text-emerald-600" />
             <span>Student Portal</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="ml-auto lg:hidden text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("h-5 w-5", location.pathname === item.path ? "text-emerald-600" : "text-gray-400")} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
             <div className="flex items-center gap-2">
                 <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                     ST
                 </div>
                 <span className="text-sm font-medium text-gray-700 hidden sm:block">Student</span>
             </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <Outlet />
        </main>
      </div>
    </div>
  );
}
