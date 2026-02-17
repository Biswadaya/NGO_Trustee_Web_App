

import PolicyLayout from '@/components/layout/PolicyLayout';

const TermsOfUse = () => {
    return (
        <PolicyLayout title="Terms & Conditions">
            <div className="space-y-8">
                <div className="border-b pb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">NHRD – National Humanity & Rural Development</h2>
                </div>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing or using this website, you agree to comply with these Terms & Conditions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. About NHRD</h2>
                    <p className="text-muted-foreground text-foreground">
                        NHRD is a registered non-profit organization working in Odisha to support:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Education</li>
                        <li>Women Empowerment</li>
                        <li>Child Development</li>
                        <li>Health & Rural Sanitation</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Donations Policy</h2>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>All donations are voluntary.</li>
                        <li>Donations are used to support NHRD’s mission and programs.</li>
                        <li>Donors will receive applicable 80G tax exemption receipts (if registered).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Refund & Cancellation Policy</h2>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Donations once processed are generally non-refundable.</li>
                        <li>Refunds may be considered in cases of duplicate transactions or technical errors.</li>
                        <li>Refund requests must be made within 7 days of transaction date.</li>
                        <li>Approved refunds will be processed within 5-7 days through the original payment method.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Use of Website</h2>
                    <p className="text-muted-foreground">Users agree not to:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Attempt unauthorized access</li>
                        <li>Upload malicious software</li>
                        <li>Misuse content</li>
                        <li>Engage in fraudulent donation activity</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
                    <p className="text-muted-foreground">All content including:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>NHRD name</li>
                        <li>Logo</li>
                        <li>Text</li>
                        <li>Photographs</li>
                        <li>Website design</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                        are the intellectual property of NHRD and may not be reproduced without permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                    <p className="text-muted-foreground">NHRD shall not be liable for:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>Website downtime</li>
                        <li>Technical errors</li>
                        <li>Third-party payment gateway failures</li>
                        <li>Indirect or consequential damages</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
                    <p className="text-muted-foreground">These Terms are governed by the laws of India.</p>
                    <p className="mt-2 text-muted-foreground">Any disputes shall fall under the jurisdiction of courts in Odisha.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Modifications</h2>
                    <p className="text-muted-foreground">NHRD reserves the right to update these Terms at any time without prior notice.</p>
                </section>
            </div>
        </PolicyLayout>
    );
};

export default TermsOfUse;
