import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { memberApplicationSchema, type MemberApplicationFormValues } from '@/lib/validations/member';
import { useAuth } from '@/contexts/AuthContext';
import { memberAPI } from '@/api/endpoints';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle, ChevronRight, ChevronLeft, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic details' },
    { id: 2, title: 'Membership Fee', description: 'Payment' },
    { id: 3, title: 'Bank Details', description: 'Optional info' },
    { id: 4, title: 'Nominee', description: 'Optional info' },
    { id: 5, title: 'Review', description: 'Confirm & Submit' },
];

const BecomeMember = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const form = useForm<MemberApplicationFormValues>({
        resolver: zodResolver(memberApplicationSchema) as any,
        defaultValues: {
            membership_fee: 10,

            account_type: 'SAVINGS',
            dob: '',
            family_members: [],
            // Pre-fill user details if available
            user_details: user ? {
                full_name: (user as any).fullname || user.fullname || '',
                email: user.email || '',
                password: 'RememberMe123!',
            } : undefined
        },
        mode: 'onChange'
    });



    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async () => {
        const amount = form.getValues('membership_fee');
        if (amount < 10) {
            toast.error("Minimum membership fee is 10");
            return;
        }

        setIsPaymentProcessing(true);
        try {
            // 1. Create Order
            const { data: orderRes } = await memberAPI.createOrder(amount);
            const order = orderRes.data;

            // 2. Open Razorpay
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this env var is set!
                amount: order.amount,
                currency: order.currency,
                name: "NGO Trustee",
                description: "Membership Fee",
                order_id: order.id,
                handler: async (response: any) => {
                    // 3. Save Payment Info to Form
                    form.setValue('payment_info', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });
                    toast.success("Payment Successful!");
                    nextStep(); // Move to next step automatically
                },
                prefill: {
                    name: form.getValues('user_details.full_name') || (user as any)?.fullname || (user as any)?.full_name,
                    email: form.getValues('user_details.email') || user?.email,
                    contact: form.getValues('phone')
                },
                theme: {
                    color: "#0F172A"
                },
                modal: {
                    ondismiss: () => {
                        setIsPaymentProcessing(false);
                        toast.info("Payment cancelled");
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            toast.error("Failed to initiate payment");
            setIsPaymentProcessing(false);
        }
    };

    const onSubmit = async (data: MemberApplicationFormValues) => {
        setIsSubmitting(true);
        try {
            // Transform data to match Backend Schema
            const payload = {
                // top-level fields
                email: data.user_details?.email,
                password: data.user_details?.password,
                full_name: data.user_details?.full_name,
                dob: data.dob,
                phone: data.phone || undefined,
                address: data.address || undefined,
                occupation: data.occupation || undefined,
                adhar_number: data.adhar_number || undefined,

                // payment
                membership_fee: Number(data.membership_fee),
                payment_info: data.payment_info,

                // nested objects
                family_members: data.family_members, // Assuming structure matches or is empty

                // Construct bank_details only if provided
                bank_details: (data.bank_name && data.account_number) ? {
                    bank_name: data.bank_name,
                    account_number: data.account_number,
                    ifsc_code: data.ifsc_code,
                    branch_name: data.branch_name
                } : undefined,

                // Construct nominee only if name is provided
                nominee: data.nominee_name ? {
                    name: data.nominee_name,
                    relationship: data.nominee_relation,
                    phone: data.nominee_phone,
                    // Map nominee bank details if needed, schema has specific fields
                    // checking backend schema: expected 'account_number', 'bank_name' inside nominee
                    account_number: data.nominee_account_number,
                    bank_name: data.nominee_bank_name,
                    ifsc_code: data.nominee_ifsc_code,
                } : undefined
            };

            console.log("DEBUG: Sending Payload:", JSON.stringify(payload, null, 2));

            await memberAPI.apply(payload);
            toast.success("Application Submitted Successfully!");
            if (user) {
                navigate('/dashboard');
            } else {
                toast.info("Please login with your new account.");
                navigate('/login');
            }
        } catch (error: any) {
            console.error("Submission Error:", error);
            toast.error(error.response?.data?.message || "Failed to submit application");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = async () => {
        let fieldsToValidate: any[] = [];
        if (currentStep === 1) fieldsToValidate = ['user_details', 'dob'];
        // Step 2 is Payment - handled by handlePayment for progression, but we can check if paid
        if (currentStep === 2) {
            const payment = form.getValues('payment_info');
            if (!payment) {
                toast.error("Please complete the membership fee payment to proceed.");
                return;
            }
        }

        if (fieldsToValidate.length > 0) {
            const isValid = await form.trigger(fieldsToValidate);
            if (!isValid) return;
        }

        setCurrentStep(prev => Math.min(prev + 1, steps.length));
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="container max-w-4xl py-12 px-4 mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-display font-bold mb-2">Become a Member</h1>
                <p className="text-muted-foreground">Join our community. Simple 5-step process.</p>
            </div>

            {/* Stepper */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10 -translate-y-1/2" />
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2 z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= step.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted text-muted-foreground'}`}>
                            {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
                        </div>
                        <span className="text-xs font-medium hidden md:block">{step.title}</span>
                    </div>
                ))}
            </div>

            <Card className="border-muted/50 shadow-lg">
                <CardContent className="p-6">
                    <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                        console.error("Form Validation Errors:", errors);
                        toast.error("Please check the form for errors");
                    })}>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Step 1: Personal Info */}
                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {!user && (
                                                <>
                                                    <div className="space-y-2">
                                                        <Label>Full Name <span className="text-red-500">*</span></Label>
                                                        <Input {...form.register('user_details.full_name')} placeholder="John Doe" />
                                                        <p className="text-destructive text-xs">{form.formState.errors.user_details?.full_name?.message}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Email <span className="text-red-500">*</span></Label>
                                                        <Input {...form.register('user_details.email')} placeholder="john@example.com" />
                                                        <p className="text-destructive text-xs">{form.formState.errors.user_details?.email?.message}</p>
                                                    </div>
                                                    <div className="col-span-2 space-y-2">
                                                        <Label>Password <span className="text-red-500">*</span></Label>
                                                        <Input type="password" {...form.register('user_details.password')} placeholder="******" />
                                                        <p className="text-destructive text-xs">{form.formState.errors.user_details?.password?.message}</p>
                                                    </div>
                                                </>
                                            )}

                                            <div className="space-y-2">
                                                <Label>Date of Birth <span className="text-red-500">*</span></Label>
                                                <Input type="date" {...form.register('dob')} />
                                                <p className="text-destructive text-xs">{form.formState.errors.dob?.message}</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Adhar Card Number (Optional)</Label>
                                                <Input {...form.register('adhar_number')} placeholder="XXXX-XXXX-XXXX" />
                                                <p className="text-destructive text-xs">{form.formState.errors.adhar_number?.message}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Phone Number (Optional)</Label>
                                                <Input {...form.register('phone')} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Occupation (Optional)</Label>
                                                <Input {...form.register('occupation')} />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label>Address (Optional)</Label>
                                                <Input {...form.register('address')} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Membership Fee */}
                                {currentStep === 2 && (
                                    <div className="space-y-6 text-center py-8">
                                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                            <CreditCard className="w-8 h-8 text-primary" />
                                        </div>
                                        <h2 className="text-2xl font-bold">Membership Fee Payment</h2>
                                        <p className="text-muted-foreground max-w-md mx-auto">
                                            To complete your registration, a minimum membership fee of ₹100 is required. You can choose to contribute more if you wish.
                                        </p>

                                        <div className="max-w-xs mx-auto space-y-4">
                                            <div className="space-y-2">
                                                <Label>Amount (₹)</Label>
                                                <Input
                                                    type="number"
                                                    min={100}
                                                    {...form.register('membership_fee')}
                                                    className="text-center text-lg font-bold"
                                                />
                                                <p className="text-destructive text-xs">{form.formState.errors.membership_fee?.message}</p>
                                            </div>

                                            {form.watch('payment_info') ? (
                                                <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center justify-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Payment Completed!
                                                </div>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    size="lg"
                                                    className="w-full"
                                                    onClick={handlePayment}
                                                    disabled={isPaymentProcessing}
                                                >
                                                    {isPaymentProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                                    Pay Now
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Bank Details (Optional) */}
                                {currentStep === 3 && (
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm mb-4">
                                            Note: Bank details are optional. You can skip this step.
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Bank Name</Label>
                                                <Input {...form.register('bank_name')} placeholder="HDFC, SBI, etc." />
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
                                            </div>
                                            <div className="space-y-2">
                                                <Label>IFSC Code</Label>
                                                <Input {...form.register('ifsc_code')} placeholder="ABCD0123456" className="uppercase" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Branch Name</Label>
                                                <Input {...form.register('branch_name')} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Nominee (Optional) */}
                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm mb-4">
                                            Note: Nominee details are optional. You can skip this step.
                                        </div>
                                        <CardHeader className="px-0 pt-0">
                                            <CardTitle className="text-base">Nominee Personal Details</CardTitle>
                                        </CardHeader>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Nominee Name</Label>
                                                <Input {...form.register('nominee_name')} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Relationship</Label>
                                                <Input {...form.register('nominee_relation')} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Date of Birth</Label>
                                                <Input type="date" {...form.register('nominee_dob')} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Phone Number</Label>
                                                <Input {...form.register('nominee_phone')} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 5: Review */}
                                {currentStep === 5 && (
                                    <div className="space-y-4">
                                        <div className="bg-muted p-4 rounded-lg space-y-3">
                                            <h3 className="font-bold mb-2">Confirm Details</h3>
                                            <div className="grid grid-cols-2 text-sm gap-2">
                                                <span className="text-muted-foreground">Name:</span>
                                                <span>{form.getValues('user_details.full_name')}</span>

                                                <span className="text-muted-foreground">Email:</span>
                                                <span>{form.getValues('user_details.email')}</span>

                                                <span className="text-muted-foreground">Adhar No:</span>
                                                <span>{form.getValues('adhar_number')}</span>

                                                <span className="text-muted-foreground">Membership Fee:</span>
                                                <span className="text-green-600 font-bold">₹{form.getValues('membership_fee')}</span>

                                                <span className="text-muted-foreground">Payment Status:</span>
                                                <span className="text-green-600 font-bold">{form.getValues('payment_info') ? 'Paid' : 'Pending'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                                            <label htmlFor="terms" className="text-sm text-muted-foreground">I agree to the terms and conditions.</label>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-between mt-8 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1 || isSubmitting}>
                                <ChevronLeft className="w-4 h-4 mr-1" /> Back
                            </Button>

                            {currentStep < 5 ? (
                                <Button type="button" onClick={nextStep}>
                                    Next <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            ) : (
                                <Button type="submit" variant="default" disabled={isSubmitting}>
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

