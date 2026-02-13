import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, CalendarDays, BookOpen, Clock } from 'lucide-react';

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState('Student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
         // Try to fetch student details
         const { data } = await supabase.from('students').select('full_name').eq('user_id', user.id).single();
         if (data?.full_name) {
             setStudentName(data.full_name);
         }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-display">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {studentName}!</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Attendance', value: '85%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Assignments', value: '12 Pending', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Next Class', value: 'Anatomy 101', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Semester', value: '1st Year', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Notices */}
          <Card className="lg:col-span-2 border-none shadow-sm">
              <CardHeader>
                  <CardTitle className="text-lg">Recent Notices</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                          <div key={i} className="flex gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                              <div className="flex-shrink-0">
                                  <div className="h-10 w-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                      {new Date().getDate()}
                                  </div>
                              </div>
                              <div>
                                  <h4 className="font-semibold text-gray-900">Semester Exam Schedule Released</h4>
                                  <p className="text-sm text-gray-600 line-clamp-1">The examination schedule for the upcoming semester has been finalized and published.</p>
                                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                                      <CalendarDays className="h-3 w-3" />
                                      <span>Today at 10:00 AM</span>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>

          {/* Schedule */}
           <Card className="border-none shadow-sm">
              <CardHeader>
                  <CardTitle className="text-lg">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4 relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-100" />
                        
                      {[
                        { time: '09:00 AM', subject: 'Anatomy', room: 'Hall A' },
                        { time: '11:00 AM', subject: 'Physiology', room: 'Lab 2' },
                        { time: '02:00 PM', subject: 'Biochemistry', room: 'Hall B' },
                      ].map((cls, i) => (
                          <div key={i} className="relative flex gap-4 pl-2">
                              {/* Dot */}
                             <div className="absolute left-[20px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 z-10 box-content" />
                             
                             <div className="ml-8">
                                 <span className="text-xs font-medium text-gray-500 block mb-0.5">{cls.time}</span>
                                 <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 w-full">
                                    <h5 className="font-semibold text-sm">{cls.subject}</h5>
                                    <p className="text-xs text-gray-500">{cls.room}</p>
                                 </div>
                             </div>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
