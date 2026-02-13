import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Bell, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function NoticesManager() {
  const [notices, setNotices] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    content: '',
    audience_type: 'all',
    target_batch_id: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [noticesRes, batchesRes] = await Promise.all([
        supabase.from('notices').select('*, batch:batches(name)').order('created_at', { ascending: false }),
        supabase.from('batches').select('id, name, program').order('created_at', { ascending: false })
      ]);

      if (noticesRes.error) throw noticesRes.error;
      if (batchesRes.error) throw batchesRes.error;

      setNotices(noticesRes.data || []);
      setBatches(batchesRes.data || []);
    } catch (error: any) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      if (!newItem.title || !newItem.content) {
        toast.error("Title and content are required");
        return;
      }

      const { error } = await supabase.from('notices').insert([{
        title: newItem.title,
        content: newItem.content,
        audience_type: newItem.audience_type,
        target_batch_id: newItem.audience_type === 'batch' ? newItem.target_batch_id : null,
        is_active: true
      }]);

      if (error) throw error;

      toast.success('Notice published');
      setIsDialogOpen(false);
      setNewItem({ title: '', content: '', audience_type: 'all', target_batch_id: '' });
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice?')) return;
    try {
      const { error } = await supabase.from('notices').delete().eq('id', id);
      if (error) throw error;
      toast.success('Notice deleted');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold font-display">Notices Board</h1>
            <p className="text-neutral-500 text-sm">Announcements for students</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Post Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. Exam Schedule Released"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={newItem.content}
                  onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                  placeholder="Write your announcement here..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Audience</label>
                    <Select 
                        value={newItem.audience_type} 
                        onValueChange={(val) => setNewItem({ ...newItem, audience_type: val })}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Students</SelectItem>
                            <SelectItem value="batch">Specific Batch</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>

                  {newItem.audience_type === 'batch' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Select Batch</label>
                        <Select 
                            value={newItem.target_batch_id} 
                            onValueChange={(val) => setNewItem({ ...newItem, target_batch_id: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select batch" />
                            </SelectTrigger>
                            <SelectContent>
                                {batches.map(b => (
                                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                      </div>
                  )}
              </div>

              <Button onClick={handleCreate} className="w-full">Publish Notice</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-emerald-500" />
                        {notice.title}
                    </div>
                </TableCell>
                <TableCell>
                    {notice.audience_type === 'all' ? (
                        <Badge variant="secondary">All Students</Badge>
                    ) : (
                        <Badge variant="outline" className="gap-1">
                            <Users className="h-3 w-3" />
                            {notice.batch?.name || 'Unknown Batch'}
                        </Badge>
                    )}
                </TableCell>
                <TableCell className="text-neutral-500">
                    {new Date(notice.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(notice.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {notices.length === 0 && !loading && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-neutral-500">No notices posted yet.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
