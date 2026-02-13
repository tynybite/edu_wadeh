import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdmissionCycle {
  id: string;
  program: string;
  start_date: string;
  end_date: string;
  is_open: boolean;
}

export default function AdmissionsManager() {
  const [cycles, setCycles] = useState<AdmissionCycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<AdmissionCycle>>({});

  useEffect(() => {
    fetchCycles();
  }, []);

  const fetchCycles = async () => {
    try {
      const { data, error } = await supabase
        .from('admission_cycles')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      setCycles(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch admission cycles');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const itemToSave = {
        program: currentItem.program,
        start_date: currentItem.start_date,
        end_date: currentItem.end_date,
        is_open: currentItem.is_open ?? true
      };

      const { error } = currentItem.id 
        ? await supabase.from('admission_cycles').update(itemToSave).eq('id', currentItem.id)
        : await supabase.from('admission_cycles').insert([itemToSave]);

      if (error) throw error;

      toast.success('Admission cycle saved');
      setIsDialogOpen(false);
      fetchCycles();
      setCurrentItem({});
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this admission cycle?')) return;
    try {
      const { error } = await supabase.from('admission_cycles').delete().eq('id', id);
      if (error) throw error;
      toast.success('Admission cycle deleted');
      fetchCycles();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-display">Admissions Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCurrentItem({})}>
              <Plus className="mr-2 h-4 w-4" /> Open Admissions
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentItem.id ? 'Edit Cycle' : 'New Admission Cycle'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select 
                value={currentItem.program} 
                onValueChange={(val) => setCurrentItem({ ...currentItem, program: val })}
              >
                <SelectTrigger>
                    <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="BEMS">BEMS</SelectItem>
                    <SelectItem value="MD">MD</SelectItem>
                    <SelectItem value="DEMS">DEMS</SelectItem>
                    <SelectItem value="All">All Programs</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                        type="date"
                        value={currentItem.start_date || ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, start_date: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                        type="date"
                        value={currentItem.end_date || ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, end_date: e.target.value })}
                    />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={currentItem.is_open ?? true}
                  onCheckedChange={(checked) => setCurrentItem({ ...currentItem, is_open: checked })}
                />
                <span className="text-sm text-neutral-600">Open for Applications</span>
              </div>
              <Button onClick={handleSave} className="w-full">Save Cycle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cycles.map((cycle) => (
              <TableRow key={cycle.id}>
                <TableCell className="font-medium">{cycle.program}</TableCell>
                <TableCell>{new Date(cycle.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(cycle.end_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${cycle.is_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {cycle.is_open ? 'Open' : 'Closed'}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                   <Button variant="ghost" size="icon" onClick={() => { setCurrentItem(cycle); setIsDialogOpen(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(cycle.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
             {loading && (
                 <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">Loading...</TableCell>
                </TableRow>
            )}
             {!loading && cycles.length === 0 && (
                <TableRow>
                     <TableCell colSpan={5} className="text-center py-4 text-neutral-500">No active cycles</TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
