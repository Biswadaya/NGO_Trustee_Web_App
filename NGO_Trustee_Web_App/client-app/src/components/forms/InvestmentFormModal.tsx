import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { publicAPI } from '@/api/endpoints';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface InvestmentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InvestmentFormModal = ({ isOpen, onClose }: InvestmentFormModalProps) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            await publicAPI.submitInvestment(data);
            toast.success('Investment proposal submitted successfully!');
            reset();
            onClose();
        } catch (error) {
            toast.error('Failed to submit proposal. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Investment Opportunity</DialogTitle>
                    <DialogDescription>
                        Propose an investment plan for the NGO.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Investment Amount (₹)</Label>
                            <Input type="number" step="0.01" {...register('amount', { required: true })} placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <Label>Investment Limit (₹)</Label>
                            <Input type="number" step="0.01" {...register('investment_limit', { required: true })} placeholder="Max Limit" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Period (e.g. 5 Years)</Label>
                            <Input {...register('period', { required: true })} placeholder="Duration" />
                        </div>
                        <div className="space-y-2">
                            <Label>Rate of Interest (%)</Label>
                            <Input type="number" step="0.01" {...register('rate_of_interest', { required: true })} placeholder="ROI %" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Investment Date</Label>
                        <Input type="date" {...register('investment_date', { required: true })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Authority Name</Label>
                        <Input {...register('authority_name', { required: true })} placeholder="Name of Offical" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Organization</Label>
                            <Input {...register('organization_name', { required: true })} placeholder="Org Name" />
                        </div>
                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input {...register('authority_address', { required: true })} placeholder="Location" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Submit Proposal
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InvestmentFormModal;
