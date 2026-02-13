import { useEffect, useState } from 'react';
import { adminService, Application, Batch } from '@/services/adminService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, CheckCircle2, User, Phone, Mail, GraduationCap } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

export default function ApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  
  // Enrollment State
  const [enrollmentBatch, setEnrollmentBatch] = useState<string>("");
  const [enrollmentId, setEnrollmentId] = useState<string>("");
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const [appsData, batchesData] = await Promise.all([
            adminService.getApplications(),
            adminService.getBatches()
        ]);
        setApplications(appsData || []);
        setBatches(batchesData || []);
    } catch (error: any) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: Application['status']) => {
      try {
          await adminService.updateApplicationStatus(id, newStatus);
          toast.success(`Status updated to ${newStatus}`);
          fetchData(); // Refresh to ensure UI sync
      } catch (error: any) {
          toast.error('Failed to update status');
      }
  }

  const handleCreateBatch = async () => {
      try {
          const newBatch = await adminService.createBatch({
              name: `Batch ${new Date().getFullYear()}`,
              program: 'BEMS',
              start_date: new Date().toISOString(),
              end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
          });
          setBatches([newBatch, ...batches]);
          setEnrollmentBatch(newBatch.id);
          toast.success("Created default batch");
      } catch (error) {
          toast.error("Failed to create batch");
      }
  }

  const handleEnroll = async () => {
      if (!selectedApp || !enrollmentBatch) {
          toast.error("Please select a batch");
          return;
      }
      setIsEnrolling(true);
      try {
          // Generate ID if empty
          const finalEnrollmentId = enrollmentId || `WMCH/${new Date().getFullYear()}/${Math.floor(Math.random() * 10000)}`;
          
          await adminService.enrollStudent({
              application_id: selectedApp.id,
              batch_id: enrollmentBatch,
              enrollment_number: finalEnrollmentId,
              full_name: (selectedApp.step_data as any)?.name || selectedApp.applicant_name,
              email: (selectedApp.step_data as any)?.email || selectedApp.applicant_email,
              phone: (selectedApp.step_data as any)?.phone || selectedApp.applicant_phone
          });
          

          // 2. Invoke Edge Function to send Email
          const { error: inviteError } = await supabase.functions.invoke('invite-student', {
            body: {
                email: (selectedApp.step_data as any)?.email || selectedApp.applicant_email,
                fullName: (selectedApp.step_data as any)?.name || selectedApp.applicant_name,
                enrollmentId: finalEnrollmentId,
            }
          });

          if (inviteError) {
              console.error("Invitation Error:", inviteError);
              toast.warning("Student enrolled, but email invitation failed. Check logs.");
          } else {
              toast.success("Student enrolled & Invitation Email sent!");
          }
          
          // Optionally auto-close or refresh
          setSelectedApp(null);
      } catch (error: any) {
          console.error(error);
          toast.error(error.message || "Enrollment failed");
      } finally {
          setIsEnrolling(false);
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
            <Button variant="outline" onClick={fetchData}>Refresh</Button>
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
                            <Button variant="ghost" size="sm" onClick={() => { setSelectedApp(app); setEnrollmentBatch(""); }}>View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
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

                                    {/* Enrollment Section (Only if Approved) */}
                                    {selectedApp.status === 'approved' && (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-4">
                                            <div className="flex items-center gap-2 text-green-800 font-semibold">
                                                <GraduationCap className="h-5 w-5" />
                                                <h3>Student Enrollment</h3>
                                            </div>
                                            <p className="text-sm text-green-700">This applicant is approved. Enroll them to create a student account.</p>
                                            
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Assign Batch</label>
                                                    {batches.length > 0 ? (
                                                        <Select value={enrollmentBatch} onValueChange={setEnrollmentBatch}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a batch" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {batches.map(b => (
                                                                    <SelectItem key={b.id} value={b.id}>{b.name} ({b.program})</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    ) : (
                                                        <Button variant="outline" size="sm" onClick={handleCreateBatch} className="w-full">
                                                            Create Default Batch (2025)
                                                        </Button>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Enrollment ID (Optional - Auto-generated if empty)</label>
                                                    <Input 
                                                        placeholder="e.g. WMCH/2025/001" 
                                                        value={enrollmentId}
                                                        onChange={(e) => setEnrollmentId(e.target.value)}
                                                    />
                                                </div>
                                                <Button onClick={handleEnroll} disabled={isEnrolling} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                                    {isEnrolling ? 'Enrolling...' : 'Confirm Enrollment'}
                                                </Button>
                                            </div>
                                        </div>
                                    )}

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
