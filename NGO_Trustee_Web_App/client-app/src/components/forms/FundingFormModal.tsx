import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { publicAPI } from '@/api/endpoints';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface FundingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'CSR' | 'GRANT';
}

const FundingFormModal = ({ isOpen, onClose, type }: FundingFormModalProps) => {
    const [fundingLoading, setFundingLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        setFundingLoading(true);
        try {
            await publicAPI.submitFunding({ ...data, type });
            toast.success(`${type} proposal submitted successfully!`);
            reset();
            onClose();
        } catch (error) {
            toast.error('Failed to submit proposal. Please try again.');
        } finally {
            setFundingLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{type === 'CSR' ? 'CSR Partnership Proposal' : 'Grant Application'}</DialogTitle>
                    <DialogDescription>
                        Please provide details about the funding structure.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Beneficiary Name</Label>
                            <Input {...register('beneficiary_name', { required: true })} placeholder="Target Group/Person" />
                            {errors.beneficiary_name && <span className="text-xs text-destructive">Required</span>}
                        </div>
                        <div className="space-y-2">
                            <Label>Propject Name</Label>
                            <Input {...register('project_name', { required: true })} placeholder="e.g. Rural Education" />
                            {errors.project_name && <span className="text-xs text-destructive">Required</span>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Beneficiary Address</Label>
                        <Input {...register('beneficiary_address', { required: true })} placeholder="Location details" />
                        {errors.beneficiary_address && <span className="text-xs text-destructive">Required</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Sanction Amount (₹)</Label>
                            <Input type="number" {...register('sanction_amount', { required: true })} placeholder="0.00" />
                            {errors.sanction_amount && <span className="text-xs text-destructive">Required</span>}
                        </div>
                        <div className="space-y-2">
                            <Label>Sanction Authority</Label>
                            <Input {...register('sanction_authority', { required: true })} placeholder="Name of Official" />
                            {errors.sanction_authority && <span className="text-xs text-destructive">Required</span>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description / Notes</Label>
                        <Textarea {...register('description')} placeholder="Any additional details..." />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={fundingLoading}>
                            {fundingLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Submit Proposal
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FundingFormModal;
