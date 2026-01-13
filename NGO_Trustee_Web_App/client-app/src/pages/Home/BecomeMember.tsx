import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Users, CheckCircle } from 'lucide-react';

const BecomeMember = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Join Our Cause</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Become a Member Today
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
                        Join a community of dedicated individuals working towards a better future. Your membership empowers us to do more.
                    </p>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="pt-6">
                            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                                            <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Social Security</h3>
                                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                                        Get access to our social security network and support system for members and their families.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="pt-6">
                            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                                            <Heart className="h-6 w-6 text-white" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Family Support</h3>
                                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                                        Register your family members and nominees to ensure they receive benefits when needed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="pt-6">
                            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                                            <Users className="h-6 w-6 text-white" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Community Impact</h3>
                                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                                        Directly contribute to local projects and see the impact of your contribution in real-time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing / Plan Section */}
                <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden sm:mt-24">
                    <div className="px-6 py-12 sm:px-12 sm:py-16 lg:grid lg:grid-cols-2 lg:gap-x-8">
                        <div>
                            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">Membership Details</h3>
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                                A nominal fee grants you lifetime membership and access to all our volunteer programs and social benefits.
                            </p>
                            <ul role="list" className="mt-8 space-y-4">
                                {['Lifetime Membership', 'Priority Support', 'Access to Annual Meets', 'Voting Rights (after 1 year)'].map((feature) => (
                                    <li key={feature} className="flex items-center">
                                        <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                        <span className="ml-3 text-base text-gray-500 dark:text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-12 sm:mt-16 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:items-center">
                            <div className="text-center">
                                <p className="text-lg leading-6 font-medium text-gray-500 dark:text-gray-300">Pay Once, Own Forever</p>
                                <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-white">
                                    <span>₹1000</span>
                                </div>
                                <div className="mt-6">
                                    <div className="rounded-md shadow">
                                        <Link
                                            to="/register-member"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                        >
                                            Process Registration
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm">
                                    <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500">
                                        Questions? Contact us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeMember;
