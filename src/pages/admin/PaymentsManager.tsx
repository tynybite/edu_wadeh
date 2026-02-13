import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  transaction_id: string;
  created_at: string;
  leads: {
      name: string;
      email: string;
  }
}

export default function PaymentsManager() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
            *,
            leads (name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-display">Payments History</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-mono text-xs">{payment.transaction_id || 'N/A'}</TableCell>
                <TableCell>
                    <div className="text-sm font-medium">{payment.leads?.name || 'Unknown'}</div>
                    <div className="text-xs text-neutral-500">{payment.leads?.email}</div>
                </TableCell>
                <TableCell>₹{payment.amount}</TableCell>
                <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge 
                    variant={payment.status === 'success' ? 'default' : payment.status === 'failed' ? 'destructive' : 'outline'}
                    className={payment.status === 'success' ? 'bg-green-600' : ''}
                  >
                    {payment.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
             {loading && (
                 <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">Loading...</TableCell>
                </TableRow>
            )}
            {!loading && payments.length === 0 && (
                <TableRow>
                     <TableCell colSpan={5} className="text-center py-4 text-neutral-500">No payments found</TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
