import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { User, CreditCard, Users, Landmark, Eye, EyeOff } from 'lucide-react';
import { useMember } from '../../hooks/useMember';
import { toast } from 'sonner';

type FormValues = {
    // Step 1: Personal
    full_name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    occupation: string;

    // Step 2: Family
    family_members: {
        name: string;
        relationship: string;
        age: number;
    }[];

    // Step 3: Nominee
    nominee_name: string;
    nominee_relationship: string;
    nominee_phone: string;
    nominee_account_number: string;
    nominee_bank_name: string;
    nominee_ifsc_code: string;
    nominee_branch_name: string;

    // Step 4: Member Bank
    bank_account_number: string;
    bank_name: string;
    bank_ifsc_code: string;
    bank_branch_name: string;
};

const steps = [
    { id: 1, name: 'Personal Details', icon: User },
    { id: 2, name: 'Family Details', icon: Users },
    { id: 3, name: 'Nominee & Bank', icon: Landmark },
    { id: 4, name: 'Review & Pay', icon: CreditCard },
];

const MemberRegistration = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { registerMember, loading } = useMember();

    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
        defaultValues: {
            family_members: [],
            bank_name: '', // Ensure controlled inputs
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "family_members"
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            // Transform flat form data to nested API structure
            const payload = {
                full_name: data.full_name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                address: data.address,
                occupation: data.occupation,
                membership_fee: 1000, // Fixed
                family_members: data.family_members,
                nominee: {
                    name: data.nominee_name,
                    relationship: data.nominee_relationship,
                    phone: data.nominee_phone,
                    account_number: data.nominee_account_number,
                    bank_name: data.nominee_bank_name,
                    ifsc_code: data.nominee_ifsc_code,
                    branch_name: data.nominee_branch_name,
                },
                bank_details: {
                    account_number: data.bank_account_number,
                    bank_name: data.bank_name,
                    ifsc_code: data.bank_ifsc_code,
                    branch_name: data.bank_branch_name,
                }
            };

            await registerMember(payload);
            // Wait a bit for toast, then move to success/login
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            if (error?.response?.status === 400 && error?.response?.data?.message?.includes('exists')) {
                toast.error("Account already exists. Redirecting to login...", { duration: 3000 });
                setTimeout(() => navigate('/login'), 2000);
            }
        }
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Member Registration
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
                            {steps.map((step) => {
                                const Icon = step.icon;
                                const isActive = step.id <= currentStep;
                                return (
                                    <div key={step.id} className="flex flex-col items-center bg-white px-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                        </div>
                                        <span className={`text-xs mt-1 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{step.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Step 1: Personal Details */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input {...register('full_name', { required: true })} className="input-field mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                                        {errors.full_name && <span className="text-red-500 text-xs">Required</span>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" {...register('email', { required: true })} className="input-field mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                                        {errors.email && <span className="text-red-500 text-xs">Required</span>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        <div className="relative mt-1">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                {...register('password', { required: true, minLength: 8 })}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                                            </button>
                                        </div>
                                        {errors.password && <span className="text-red-500 text-xs">Min 8 chars required</span>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input {...register('phone', { required: true })} className="input-field mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <textarea {...register('address')} rows={3} className="input-field mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Occupation</label>
                                        <input {...register('occupation')} className="input-field mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Family Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">Family Members</h3>
                                    <button type="button" onClick={() => append({ name: '', relationship: '', age: 0 })} className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                                        + Add Member
                                    </button>
                                </div>
                                {fields.map((field, index) => (
                                    <div key={field.id} className="bg-gray-50 p-4 rounded-lg relative">
                                        <button type="button" onClick={() => remove(index)} className="absolute top-2 right-2 text-red-500 text-xs">Remove</button>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Name</label>
                                                <input {...register(`family_members.${index}.name` as const)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Relation</label>
                                                <input {...register(`family_members.${index}.relationship` as const)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Age</label>
                                                <input type="number" {...register(`family_members.${index}.age` as const)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {fields.length === 0 && <p className="text-sm text-gray-500 italic">No family members added.</p>}
                            </div>
                        )}

                        {/* Step 3: Nominee & Bank Details */}
                        {currentStep === 3 && (
                            <div className="space-y-8 animate-fadeIn">

                                {/* Nominee Section */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center"><Users className="w-5 h-5 mr-2" />Nominee Details</h3>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nominee Name</label>
                                            <input {...register('nominee_name', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Relationship</label>
                                            <input {...register('nominee_relationship')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nominee Phone</label>
                                            <input {...register('nominee_phone')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                        </div>
                                    </div>

                                    {/* Nominee Bank */}
                                    <div className="mt-4 bg-blue-50 p-4 rounded-md">
                                        <h4 className="text-sm font-medium text-blue-800 mb-3">Nominee Bank Details (Optional but Recommended)</h4>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <input placeholder="Account Number" {...register('nominee_account_number')} className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                            <input placeholder="Bank Name" {...register('nominee_bank_name')} className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                            <input placeholder="IFSC Code" {...register('nominee_ifsc_code')} className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                            <input placeholder="Branch Name" {...register('nominee_branch_name')} className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Member Bank Section */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center"><Landmark className="w-5 h-5 mr-2" />Your Bank Details</h3>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Account Number</label>
                                            <input {...register('bank_account_number', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                                            <input {...register('bank_name', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                                            <input {...register('bank_ifsc_code', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
                                            <input {...register('bank_branch_name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Payment & Review */}
                        {currentStep === 4 && (
                            <div className="text-center py-8 animate-fadeIn">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                                    <CreditCard className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Membership Fee Payment</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    To finalize your registration, a one-time membership fee is required.
                                </p>
                                <div className="mt-6 text-3xl font-extrabold text-gray-900">₹1000</div>

                                <div className="mt-8 bg-yellow-50 p-4 text-left text-sm text-yellow-700 rounded-md">
                                    <p className="font-bold mb-1">Summary</p>
                                    <p>Name: {watch('full_name')}</p>
                                    <p>Email: {watch('email')}</p>
                                    <p>Family Members: {fields.length}</p>
                                    <p>Nominee: {watch('nominee_name')}</p>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex justify-between">
                            {currentStep > 1 && (
                                <button type="button" onClick={prevStep} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Back
                                </button>
                            )}
                            {currentStep < 4 ? (
                                <button type="button" onClick={nextStep} className="ml-auto bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Next
                                </button>
                            ) : (
                                <button type="submit" disabled={loading} className="ml-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                                    {loading ? 'Processing...' : 'Pay & Register'}
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default MemberRegistration;
