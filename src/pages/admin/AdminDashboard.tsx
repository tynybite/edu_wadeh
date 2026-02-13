import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
      totalLeads: 0,
      recentLeads: 0,
      totalRevenue: 0,
      activeNews: 0
  });

  useEffect(() => {
    async function getStats() {
        const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
        const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true }).eq('is_active', true);
        
        // Mock revenue for now as calculating sum requires different query or edge function usually
        // But we can do simple fetch for now if small data
        const { data: payments } = await supabase.from('payments').select('amount').eq('status', 'success');
        const revenue = payments?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0;

        setStats({
            totalLeads: leadsCount || 0,
            recentLeads: 0, // Placeholder
            totalRevenue: revenue,
            activeNews: newsCount || 0
        });
    }
    getStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-display text-neutral-800">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-neutral-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-neutral-500">+10% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active News</CardTitle>
            <AlertCircle className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeNews}</div>
            <p className="text-xs text-neutral-500">Updates live on site</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
