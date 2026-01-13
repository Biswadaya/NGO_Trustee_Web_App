import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, FileSpreadsheet } from 'lucide-react';
import { adminAPI } from '@/api/endpoints';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface ReportGenerationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReportGenerationModal: React.FC<ReportGenerationModalProps> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [resource, setResource] = useState('members');
    const [status, setStatus] = useState('ALL');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await adminAPI.generateReport({
                resource,
                status,
                startDate,
                endDate
            });

            const data = res.data.data;

            if (!data || data.length === 0) {
                toast.info("No data available for the selected filters.");
                return;
            }

            // Generate Excel
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

            // Generate filename based on filters
            const filename = `${resource}_report_${new Date().toISOString().split('T')[0]}.xlsx`;

            XLSX.writeFile(workbook, filename);
            toast.success("Report downloaded successfully");
            onClose();

        } catch (error) {
            console.error("Report Generation Error:", error);
            toast.error("Failed to generate report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Generate Report</DialogTitle>
                    <DialogDescription>
                        Select filtering options to download data.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="resource" className="text-right">Resource</Label>
                        <Select value={resource} onValueChange={setResource}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select resource" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="members">Members</SelectItem>
                                <SelectItem value="volunteers">Volunteers</SelectItem>
                                <SelectItem value="donations">Donations</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All</SelectItem>
                                {resource === 'volunteers' ? (
                                    <>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                                    </>
                                ) : resource === 'donations' ? (
                                    <>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                    </>
                                ) : (
                                    <>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">Start Date</Label>
                        <Input
                            id="startDate"
                            type="date"
                            className="col-span-3"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">End Date</Label>
                        <Input
                            id="endDate"
                            type="date"
                            className="col-span-3"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleGenerate} disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileSpreadsheet className="w-4 h-4 mr-2" />}
                        Download Excel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReportGenerationModal;
