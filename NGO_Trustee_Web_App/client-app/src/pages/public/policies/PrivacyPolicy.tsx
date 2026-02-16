

import PolicyLayout from '@/components/layout/PolicyLayout';

const PrivacyPolicy = () => {
    return (
        <PolicyLayout title="Privacy Policy">
            <div className="space-y-8">
                <div className="border-b pb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">NHRD – National Humanity & Rural Development</h2>
                    <p className="text-sm text-muted-foreground">Effective Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        NHRD – National Humanity & Rural Development (“NHRD”, “we”, “our”, “us”) is committed to protecting the privacy of donors, volunteers, beneficiaries, and website visitors.
                    </p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">A. Personal Information</h3>
                            <p className="text-muted-foreground">We may collect:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                                <li>Full Name</li>
                                <li>Email Address</li>
                                <li>Phone Number</li>
                                <li>Residential Address</li>
                                <li>PAN (for 80G tax receipts)</li>
                                <li>Donation amount and transaction details</li>
                                <li>Any information submitted via contact or volunteer forms</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">B. Automatically Collected Information</h3>
                            <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                                <li>IP Address</li>
                                <li>Browser type</li>
                                <li>Device information</li>
                                <li>Cookies and usage data</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                    <p className="text-muted-foreground">We use collected information to:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Process donations</li>
                        <li>Generate 80G receipts</li>
                        <li>Respond to inquiries</li>
                        <li>Provide updates about our programs</li>
                        <li>Improve website functionality</li>
                        <li>Maintain internal records</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment Processing</h2>
                    <p className="text-muted-foreground">
                        All donations are processed securely through third-party payment gateways such as:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Razorpay</li>
                        <li>Stripe</li>
                        <li>Banking partners such as IDFC First Bank or Kotak Mahindra Bank</li>
                    </ul>
                    <p className="mt-4 font-medium text-foreground">NHRD does not store debit/credit card details or banking credentials on its servers.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Sharing</h2>
                    <p className="text-muted-foreground">We do not sell, trade, or rent personal information.</p>
                    <p className="mt-2 text-muted-foreground">We may share information only:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>With payment processors for transaction completion</li>
                        <li>With government authorities if legally required</li>
                        <li>With auditors for compliance purposes</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Security</h2>
                    <p className="text-muted-foreground">We implement reasonable security measures including:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>SSL encryption</li>
                        <li>Secure hosting servers</li>
                        <li>Restricted internal access</li>
                        <li>Regular monitoring</li>
                    </ul>
                    <p className="mt-4 italic text-muted-foreground">However, no method of transmission over the Internet is 100% secure.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Cookies Policy</h2>
                    <p className="text-muted-foreground">We may use cookies to:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Enhance user experience</li>
                        <li>Track website analytics</li>
                        <li>Improve services</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground">Users can disable cookies via browser settings.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Retention</h2>
                    <p className="text-muted-foreground">We retain donor and transaction data as required under society registrations act 1860.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Your Rights</h2>
                    <p className="text-muted-foreground">Under:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Information Technology Act 2000</li>
                        <li>Digital Personal Data Protection Act 2023</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">You have the right to:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Access your data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion (subject to legal requirements)</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                        To exercise these rights, contact us at: <a href="mailto:nhrdodisha@gmail.com" className="text-primary hover:underline">nhrdodisha@gmail.com</a>
                    </p>
                </section>

                <section className="bg-muted/30 p-6 rounded-lg border border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Information</h2>
                    <p className="font-semibold text-foreground">NHRD – National Humanity & Rural Development</p>
                    <p className="text-muted-foreground">Balipatna, Khordha District, Odisha</p>
                    <p className="text-muted-foreground">Email: <a href="mailto:nhrdodisha@gmail.com" className="text-primary hover:underline">nhrdodisha@gmail.com</a></p>
                    <p className="text-muted-foreground">Phone: <a href="tel:09439888888" className="text-primary hover:underline">09439-888888</a></p>
                </section>
            </div>
        </PolicyLayout>
    );
};

export default PrivacyPolicy;
