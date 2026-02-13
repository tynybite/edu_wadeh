import { useEffect, useState } from 'react';
import { adminService, Coupon, AppSetting } from '@/services/adminService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Tag, Settings as SettingsIcon, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AppSettings() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fee State
  const [applicationFee, setApplicationFee] = useState<number>(500);

  // New Coupon State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
      code: '',
      discount_type: 'fixed',
      discount_value: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const [couponsData, settingsData] = await Promise.all([
            adminService.getCoupons(),
            adminService.getSettings()
        ]);
        setCoupons(couponsData || []);
        setSettings(settingsData || []);
        
        // Find fee
        const feeSetting = settingsData?.find(s => s.key === 'application_fee');
        if (feeSetting) {
            setApplicationFee(Number(feeSetting.value));
        }
    } catch (error: any) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const saveFee = async () => {
      try {
          await adminService.updateSetting('application_fee', applicationFee);
          toast.success('Application fee updated');
      } catch (error) {
          toast.error('Failed to update fee');
      }
  };

  const createCoupon = async () => {
      try {
          await adminService.createCoupon({
              code: newCoupon.code.toUpperCase(),
              discount_type: newCoupon.discount_type as 'fixed' | 'percentage',
              discount_value: Number(newCoupon.discount_value),
              active: true
          });
          toast.success('Coupon created');
          setIsDialogOpen(false);
          fetchData();
          setNewCoupon({ code: '', discount_type: 'fixed', discount_value: 0 });
      } catch (error: any) {
          toast.error(error.message || 'Failed to create coupon');
      }
  };

  const toggleCoupon = async (code: string, currentStatus: boolean) => {
      try {
          await adminService.toggleCoupon(code, !currentStatus);
          toast.success(`Coupon ${!currentStatus ? 'activated' : 'deactivated'}`);
          fetchData();
      } catch (error) {
          toast.error('Failed to update coupon');
      }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold font-display">Settings</h1>
            <p className="text-neutral-500 text-sm">Manage application fees and discounts</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* FEE SETTINGS */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SettingsIcon className="h-5 w-5" /> General Settings</CardTitle>
                <CardDescription>Configure global application parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Application Fee (₹)</Label>
                    <div className="flex gap-2">
                        <Input 
                            type="number" 
                            value={applicationFee} 
                            onChange={(e) => setApplicationFee(Number(e.target.value))}
                        />
                        <Button onClick={saveFee}><Save className="h-4 w-4 mr-2" /> Save</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Updated dynamic fee for new applicants.</p>
                </div>
            </CardContent>
        </Card>

        {/* COUPONS */}
        <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5" /> Coupons</CardTitle>
                    <CardDescription>Manage discount codes for applicants</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="h-4 w-4 mr-2" /> Create Coupon</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Coupon</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Coupon Code</Label>
                                <Input 
                                    placeholder="SUMMER2026" 
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Select 
                                        value={newCoupon.discount_type} 
                                        onValueChange={(val) => setNewCoupon({...newCoupon, discount_type: val})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                                            <SelectItem value="percentage">Percentage (%)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Value</Label>
                                    <Input 
                                        type="number" 
                                        value={newCoupon.discount_value}
                                        onChange={(e) => setNewCoupon({...newCoupon, discount_value: Number(e.target.value)})}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={createCoupon}>Create Coupon</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Used Count</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coupons.map((coupon) => (
                            <TableRow key={coupon.code}>
                                <TableCell className="font-mono font-bold">{coupon.code}</TableCell>
                                <TableCell>
                                    {coupon.discount_type === 'fixed' ? `₹${coupon.discount_value}` : `${coupon.discount_value}%`}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={coupon.active ? 'default' : 'secondary'}>
                                        {coupon.active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{coupon.used_count}</TableCell>
                                <TableCell className="text-right">
                                    <Switch 
                                        checked={coupon.active}
                                        onCheckedChange={() => toggleCoupon(coupon.code, coupon.active)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                         {coupons.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">No coupons created yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
