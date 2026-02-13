import { useEffect, useState } from 'react';
import { adminService, Application } from '@/services/adminService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
        const data = await adminService.getApplications();
        setApplications(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch applications');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: Application['status']) => {
      try {
          await adminService.updateApplicationStatus(id, newStatus);
          toast.success(`Status updated to ${newStatus}`);
          fetchApplications();
      } catch (error: any) {
          toast.error('Failed to update status');
      }
  }

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'approved': return 'bg-green-100 text-green-700 hover:bg-green-100';
          case 'rejected': return 'bg-red-100 text-red-700 hover:bg-red-100';
          case 'submitted': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
          case 'reviewing': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
          default: return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'; // draft
      }
  }

  // Helper to safely access step data
  const getStepData = (app: Application) => {
      const data = app.step_data as any;
      return data || {};
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold font-display">Applications</h1>
            <p className="text-neutral-500 text-sm">Monitor real-time progress of applicants</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={fetchApplications}>Refresh</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant (Draft/Lead)</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => {
                const data = getStepData(app);
                const stepsCompleted = app.current_step;
                const totalSteps = 4; // Hardcoded generic step count for UI
                const progress = (stepsCompleted / totalSteps) * 100;
                
                return (
              <TableRow key={app.id}>
                <TableCell className="font-medium">
                    <div className="flex flex-col">
                        <span className="font-semibold">{data.name || app.applicant_name || 'In Progress Draft'}</span>
                        <span className="text-xs text-neutral-500">{data.email || app.applicant_email || `ID: ${app.id.slice(0,8)}...`}</span>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="space-y-1 w-[140px]">
                        <div className="flex justify-between text-xs text-neutral-600">
                            <span>Step {app.current_step}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-primary transition-all duration-500" 
                                style={{ width: `${progress}%` }} 
                            />
                        </div>
                    </div>
                </TableCell>
                <TableCell className="text-neutral-600 text-sm">
                    <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {new Date(app.updated_at).toLocaleString()}
                    </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(app.status)} variant="secondary">
                    {app.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedApp(app)}>View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                            <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                            </DialogHeader>
                            {selectedApp && (
                                <ScrollArea className="flex-1 pr-4">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle></CardHeader>
                                            <CardContent>
                                                <Badge className={getStatusColor(selectedApp.status)} variant="secondary">
                                                    {selectedApp.status.toUpperCase()}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Current Step</CardTitle></CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">{selectedApp.current_step}</div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg flex items-center gap-2"><User className="h-4 w-4" /> Personal Information</h3>
                                        <div className="bg-neutral-50 p-4 rounded-lg space-y-2 border">
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <span className="text-neutral-500">Name:</span>
                                                <span className="font-medium">{getStepData(selectedApp).name || '-'}</span>
                                                
                                                <span className="text-neutral-500">Email:</span>
                                                <span className="font-medium">{getStepData(selectedApp).email || '-'}</span>
                                                
                                                <span className="text-neutral-500">Phone:</span>
                                                <span className="font-medium">{getStepData(selectedApp).phone || '-'}</span>
                                                
                                                <span className="text-neutral-500">Course:</span>
                                                <span className="font-medium">{getStepData(selectedApp).course || '-'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg flex items-center gap-2"><FileText className="h-4 w-4" /> Raw Data</h3>
                                        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-xs font-mono">
                                            {JSON.stringify(selectedApp.step_data, null, 2)}
                                        </pre>
                                    </div>
                                    
                                     <div className="flex justify-end pt-4 border-t">
                                        <Select onValueChange={(val) => updateStatus(selectedApp.id, val as any)} defaultValue={selectedApp.status}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Change Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="submitted">Submitted</SelectItem>
                                                <SelectItem value="reviewing">Reviewing</SelectItem>
                                                <SelectItem value="approved">Approved</SelectItem>
                                                <SelectItem value="rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                     </div>
                                </div>
                                </ScrollArea>
                            )}
                        </DialogContent>
                    </Dialog>
                </TableCell>
              </TableRow>
            )})}
             {loading && (
                 <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-neutral-500">Loading applications...</TableCell>
                </TableRow>
            )}
             {!loading && applications.length === 0 && (
                <TableRow>
                     <TableCell colSpan={5} className="text-center py-8 text-neutral-500">No applications found. Users may be on the home page.</TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
