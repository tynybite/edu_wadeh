import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, X, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  status: 'new' | 'contacted' | 'admitted' | 'rejected';
  created_at: string;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
      try {
          const { error } = await supabase
            .from('leads')
            .update({ status: newStatus })
            .eq('id', id);
          
          if (error) throw error;
          toast.success(`Status updated to ${newStatus}`);
          fetchLeads();
      } catch (error: any) {
          toast.error('Failed to update status');
      }
  }

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'admitted': return 'bg-green-100 text-green-700 hover:bg-green-100';
          case 'rejected': return 'bg-red-100 text-red-700 hover:bg-red-100';
          case 'contacted': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
          default: return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-display">Leads Management</h1>
        <div className="flex gap-2">
            <Button variant="outline" onClick={fetchLeads}>Refresh</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>
                    <div className="flex flex-col text-sm text-neutral-600 gap-1">
                        <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</div>
                        <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</div>
                    </div>
                </TableCell>
                <TableCell>{lead.program}</TableCell>
                <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)} variant="secondary">
                    {lead.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Select onValueChange={(val) => updateStatus(lead.id, val)} defaultValue={lead.status}>
                        <SelectTrigger className="w-[130px] ml-auto h-8 text-xs">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="admitted">Admitted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </TableCell>
              </TableRow>
            ))}
             {loading && (
                 <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">Loading...</TableCell>
                </TableRow>
            )}
             {!loading && leads.length === 0 && (
                <TableRow>
                     <TableCell colSpan={6} className="text-center py-4 text-neutral-500">No leads found</TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
