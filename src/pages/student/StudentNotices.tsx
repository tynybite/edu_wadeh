import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar } from 'lucide-react';

export default function StudentNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNotices(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-display">Notice Board</h1>
      </div>

      <div className="space-y-4">
        {loading ? (
            <div className="text-center py-8 text-gray-500">Loading notices...</div>
        ) : notices.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No active notices found.</p>
            </div>
        ) : (
            notices.map((notice) => (
                <Card key={notice.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg text-gray-900">{notice.title}</h3>
                            <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                                <Calendar className="h-3 w-3" />
                                {new Date(notice.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 whitespace-pre-wrap">{notice.content}</p>
                    </CardContent>
                </Card>
            ))
        )}
      </div>
    </div>
  );
}
