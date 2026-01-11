import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { memberApplicationSchema, type MemberApplicationFormValues } from '@/lib/validations/member';
import { useAuth } from '@/contexts/AuthContext';
import { memberAPI } from '@/api/endpoints';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loader2, CheckCircle, ChevronRight, ChevronLeft, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const steps = [
    { id: 1, title: 'Account', description: 'Create your account' },
    { id: 2, title: 'Bank Details', description: 'Your financial info' },
    { id: 3, title: 'Family', description: 'Add family members' },
    { id: 4, title: 'Nominee', description: 'Succession details' },
    { id: 5, title: 'Review', description: 'Confirm & Submit' },
];

const BecomeMember = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Skip Step 1 if user is already logged in
    const startStep = user ? 2 : 1;
    if (currentStep < startStep) setCurrentStep(startStep);

    const form = useForm<MemberApplicationFormValues>({
        resolver: zodResolver(memberApplicationSchema),
        defaultValues: {
            account_type: 'SAVINGS',
            family_members: [],
            // Pre-fill if logged in?
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "family_members"
    });

    const onSubmit = async (data: MemberApplicationFormValues) => {
        setIsSubmitting(true);
        try {
            await memberAPI.apply(data);
            toast.success("Application Submitted Successfully!");
            if (user) {
                navigate('/user/membership');
            } else {
                // Redirect to login or auto-login
                toast.info("Please login with your new account to track status.");
                navigate('/login');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to submit application");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = async () => {
        // Validate current step fields before moving
        let fieldsToValidate: any[] = [];
        if (currentStep === 1) fieldsToValidate = ['user_details.full_name', 'user_details.email', 'user_details.password'];
        if (currentStep === 2) fieldsToValidate = ['bank_name', 'account_number', 'ifsc_code', 'account_type'];
        if (currentStep === 3) fieldsToValidate = ['family_members']; // Complex array validation handled by submit usually, but simple check ok
        if (currentStep === 4) fieldsToValidate = ['nominee_name', 'nominee_relation', 'nominee_dob'];

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
        }
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, startStep));

    return (
        <div className="container max-w-4xl py-12 px-4 mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-display font-bold mb-2">Become a Member</h1>
                <p className="text-muted-foreground">Join our community and make a difference.</p>
            </div>

            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10 -translate-y-1/2" />
                {steps.map((step) => (
                    <div key={step.id} className={`flex flex-col items-center gap-2 bg-background px-2 z-10 ${step.id < startStep ? 'hidden md:flex opacity-50' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= step.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted text-muted-foreground'}`}>
                            {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
                        </div>
                        <span className="text-xs font-medium hidden md:block">{step.title}</span>
                    </div>
                ))}
            </div>

            <Card className="border-muted/50 shadow-lg">
                <CardContent className="p-6">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Step 1: Account (Guest Only) */}
                                {currentStep === 1 && !user && (
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Full Name</Label>
                                                <Input {...form.register('user_details.full_name')} placeholder="John Doe" />
                                                <p className="text-destructive text-xs">{form.formState.errors.user_details?.full_name?.message}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Email</Label>
                                                <Input {...form.register('user_details.email')} placeholder="john@example.com" />
                                                <p className="text-destructive text-xs">{form.formState.errors.user_details?.email?.message}</p>
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label>Password</Label>
                                                <Input type="password" {...form.register('user_details.password')} placeholder="******" />
                                                <p className="text-destructive text-xs">{form.formState.errors.user_details?.password?.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Bank Details */}
                                {currentStep === 2 && (
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Bank Name</Label>
                                                <Input {...form.register('bank_name')} placeholder="HDFC, SBI, etc." />
                                                <p className="text-destructive text-xs">{form.formState.errors.bank_name?.message}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Account Type</Label>
                                                <Select onValueChange={v => form.setValue('account_type', v as any)} defaultValue="SAVINGS">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SAVINGS">Savings</SelectItem>
                                                        <SelectItem value="CURRENT">Current</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Account Number</Label>
                                                <Input {...form.register('account_number')} placeholder="0000000000" />
                                                <p className="text-destructive text-xs">{form.formState.errors.account_number?.message}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>IFSC Code</Label>
                                                <Input {...form.register('ifsc_code')} placeholder="ABCD0123456" className="uppercase" />
                                                <p className="text-destructive text-xs">{form.formState.errors.ifsc_code?.message}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Branch Name (Optional)</Label>
                                                <Input {...form.register('branch_name')} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Family Members */}
                                {currentStep === 3 && (
                                    <div className="space-y-4">
                                        <div className="flex justify-end">
                                            <Button type="button" variant="outline" size="sm" onClick={() => append({ full_name: '', relationship: '', is_dependent: false })}>
                                                <Plus className="w-4 h-4 mr-2" /> Add Member
                                            </Button>
                                        </div>
                                        <div className="space-y-4">
                                            {fields.map((field, index) => (
                                                <div key={field.id} className="p-4 border rounded-lg bg-muted/20 relative">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute top-2 right-2 text-destructive"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                    <div className="grid md:grid-cols-2 gap-4 pr-8">
                                                        <div className="space-y-1">
                                                            <Label>Name</Label>
                                                            <Input {...form.register(`family_members.${index}.full_name`)} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label>Relationship</Label>
                                                            <Input {...form.register(`family_members.${index}.relationship`)} placeholder="Spouse, Child..." />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label>Date of Birth</Label>
                                                            <Input type="date" {...form.register(`family_members.${index}.dob`)} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label>Occupation</Label>
                                                            <Input {...form.register(`family_members.${index}.occupation`)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {fields.length === 0 && (
                                                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                                    No family members added.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Nominee */}
                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <CardHeader className="px-0 pt-0">
                                            <CardTitle className="text-base">Nominee Personal Details</CardTitle>
                                            <CardDescription>Who should take command if something happens to you?</CardDescription>
                                        </CardHeader>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Nominee Name</Label>
                                                <Input {...form.register('nominee_name')} />
                                                <p className="text-destructive text-xs">{form.formState.errors.nominee_name?.message}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Relationship</Label>
                                                <Input {...form.register('nominee_relation')} />
                                                <p className="text-destructive text-xs">{form.formState.errors.nominee_relation?.message}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Date of Birth</Label>
                                                <Input type="date" {...form.register('nominee_dob')} />
                                                <p className="text-destructive text-xs">{form.formState.errors.nominee_dob?.message}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Phone Number</Label>
                                                <Input {...form.register('nominee_phone')} />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label>Address</Label>
                                                <Input {...form.register('nominee_address')} />
                                            </div>
                                        </div>

                                        <Separator />

                                        <CardHeader className="px-0 pt-0">
                                            <CardTitle className="text-base">Nominee Bank Details</CardTitle>
                                            <CardDescription>For seamless asset/command transfer (Optional but recommended).</CardDescription>
                                        </CardHeader>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Bank Name</Label>
                                                <Input {...form.register('nominee_bank_name')} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Account Number</Label>
                                                <Input {...form.register('nominee_account_number')} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>IFSC Code</Label>
                                                <Input {...form.register('nominee_ifsc_code')} className="uppercase" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 5: Review */}
                                {currentStep === 5 && (
                                    <div className="space-y-4">
                                        <div className="bg-muted p-4 rounded-lg">
                                            <h3 className="font-bold mb-2">Confirm Details</h3>
                                            <p className="text-sm">Please verify all information before submitting. Providing false information may lead to rejection.</p>
                                            {/* Can add a summary view here if needed */}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                                            <label htmlFor="terms" className="text-sm text-muted-foreground">I agree to the terms and conditions and declare that the above information is true.</label>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-between mt-8 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === startStep || isSubmitting}>
                                <ChevronLeft className="w-4 h-4 mr-1" /> Back
                            </Button>

                            {currentStep < 5 ? (
                                <Button type="button" onClick={nextStep}>
                                    Next <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            ) : (
                                <Button type="submit" variant="premium" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Submit Application
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default BecomeMember;
