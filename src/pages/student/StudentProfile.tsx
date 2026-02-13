import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Hash, Calendar, BookOpen } from 'lucide-react';

export default function StudentProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('students')
        .select(`
            *,
            batch:batches(name, program)
        `)
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (!profile) return <div className="p-8 text-center text-red-500">Student profile not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-display">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Identity Card */}
        <Card className="md:col-span-1 border-none shadow-sm bg-gradient-to-b from-emerald-50 to-white">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-3xl font-bold text-emerald-700 mb-4 border-4 border-white shadow-sm">
                {profile.full_name?.charAt(0) || 'S'}
            </div>
            <h2 className="text-xl font-bold">{profile.full_name}</h2>
            <p className="text-emerald-600 font-medium text-sm mt-1">{profile.enrollment_number}</p>
            
            <div className="mt-6 w-full space-y-3">
                <div className="bg-white p-3 rounded-lg border border-emerald-100 flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-emerald-500" />
                    <div className="text-left">
                        <p className="text-xs text-gray-500">Program</p>
                        <p className="text-sm font-semibold">{profile.batch?.program}</p>
                    </div>
                </div>
                 <div className="bg-white p-3 rounded-lg border border-emerald-100 flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-emerald-500" />
                    <div className="text-left">
                        <p className="text-xs text-gray-500">Batch</p>
                        <p className="text-sm font-semibold">{profile.batch?.name}</p>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="md:col-span-2 border-none shadow-sm">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                            <User className="h-3 w-3" /> Full Name
                        </label>
                        <p className="font-medium text-gray-900 border-b border-gray-100 pb-2">{profile.full_name}</p>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                            <Mail className="h-3 w-3" /> Email Address
                        </label>
                        <p className="font-medium text-gray-900 border-b border-gray-100 pb-2">{profile.email}</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                            <Phone className="h-3 w-3" /> Phone Number
                        </label>
                        <p className="font-medium text-gray-900 border-b border-gray-100 pb-2">{profile.phone || '-'}</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
                            <Hash className="h-3 w-3" /> Enrollment ID
                        </label>
                        <p className="font-medium text-gray-900 border-b border-gray-100 pb-2">{profile.enrollment_number}</p>
                    </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold mb-3">Academic Status</h4>
                    <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-3 gap-4 text-center">
                         <div>
                            <span className="block text-2xl font-bold text-gray-900">{profile.current_semester}</span>
                            <span className="text-xs text-gray-500">Current Semester</span>
                         </div>
                         <div>
                            <span className="block text-2xl font-bold text-gray-900">Active</span>
                            <span className="text-xs text-gray-500">Status</span>
                         </div>
                         <div>
                            <span className="block text-2xl font-bold text-gray-900">4.0</span>
                            <span className="text-xs text-gray-500">CGPA</span>
                         </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
