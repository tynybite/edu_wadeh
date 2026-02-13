import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [searchParams] = useSearchParams();
  const activationMode = searchParams.get('activation') === 'true';
  
  // Pre-fill from URL if confirming activation
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [enrollmentId, setEnrollmentId] = useState(searchParams.get('eid') || '');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mode is now strictly driven by URL for activation
  const isActivating = activationMode;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        if (isActivating) {
            // --- ACCOUNT ACTIVATION (Students Only) ---
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error("Failed to create account");

            // Link to Student Record
            const { error: linkError } = await supabase
                .from('students')
                .update({ user_id: authData.user.id })
                .eq('email', email)
                .eq('enrollment_number', enrollmentId);

            if (linkError) {
                console.error("Link Error", linkError);
                throw new Error("Activation failed. Verify your Email and Enrollment ID.");
            }

            toast.success("Account activated! logging you in...");
            navigate('/student/dashboard');

        } else {
            // --- UNIFIED LOGIN ---
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                // Check Role: Is this a Student?
                const { data: student, error: studentError } = await supabase
                    .from('students')
                    .select('id')
                    .eq('user_id', data.user.id)
                    .single();

                // If Student -> Go to Student Portal
                if (student && !studentError) {
                    toast.success('Welcome back, Student!');
                    navigate('/student/dashboard');
                    return;
                }

                // If Not Student -> Assume Admin (for MVP)
                toast.success('Welcome back, Admin!');
                navigate('/admin');
            }
        }
    } catch (error: any) {
      toast.error(error.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xl font-bold font-display">
            <GraduationCap className="h-8 w-8 text-emerald-400" />
            <span>EduWadeh</span>
          </div>
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold font-display leading-tight mb-4">
            {isActivating ? 'Activate Your Student Account' : 'Welcome to Wadeh Portal'}
          </h1>
          <p className="text-zinc-400 text-lg">
            {isActivating 
              ? 'Complete your registration to access the student portal.' 
              : 'One unified access point for Students, Faculty, and Administration.'}
          </p>
        </div>
        <div className="relative z-10 text-xs text-zinc-600">
          © {new Date().getFullYear()} Wadeh Medical College. All rights reserved.
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900 font-display">
                {isActivating ? 'Set Up Your Account' : 'Sign In'}
            </h2>
            <p className="text-gray-500 mt-2">
                {isActivating ? 'Verify identity and create password.' : 'Enter your credentials to access your account.'}
            </p>
          </div>

          {!isActivating && (
             <div className="p-4 bg-sky-50 border border-sky-100 rounded-lg text-sm text-sky-800 flex gap-2 items-start">
                <ShieldCheck className="h-5 w-5 shrink-0" />
                <p>New Student? Please check your email for the activation link.</p>
             </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="you@wadeh.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly={isActivating} // Read-only if Activating (security measure to match link)
                className={`h-12 border-gray-200 focus:bg-white transition-colors ${isActivating ? 'bg-gray-100' : 'bg-gray-50'}`}
              />
            </div>

            {isActivating && (
                <div className="space-y-2">
                    <Label>Enrollment ID</Label>
                    <Input
                        type="text"
                        placeholder="e.g. WMCH/2025/001"
                        value={enrollmentId}
                        onChange={(e) => setEnrollmentId(e.target.value)}
                        required
                        readOnly={!!searchParams.get('eid')} // Read-only if provided in URL
                        className="h-12 bg-gray-100 border-gray-200 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500">Verifying against admission records.</p>
                </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>{isActivating ? 'Create Password' : 'Password'}</Label>
                {!isActivating && <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700">Forgot password?</a>}
              </div>
              <Input
                type="password"
                placeholder={isActivating ? "Create a strong password" : "••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                autoFocus={isActivating}
              />
            </div>

            <Button 
                type="submit" 
                className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-base"
                disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {isActivating ? 'Activate & Login' : 'Sign In'} <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <div className="pt-6 text-center text-sm text-gray-500">
             Not part of Wadeh yet? <a href="/apply" className="font-medium text-emerald-600 hover:text-emerald-500">Apply for Admission</a>
          </div>
        </div>
      </div>
    </div>
  );
}
