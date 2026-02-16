

import PolicyLayout from '@/components/layout/PolicyLayout';

const LinkingPolicy = () => {
    return (
        <PolicyLayout title="Linking Policy">
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Status of Linking Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        NHRD – National Humanity & Rural Development welcomes links to this website made in accordance with the terms of this linking policy.
                    </p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        By using this website, you agree to be bound by the terms and conditions of this linking policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Links to External Sites</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        This website may contain links to other websites owned and operated by third parties (e.g., Payment Gateways, Government of India portals). These links are provided for your convenience only.
                    </p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        NHRD has no control over the contents of functioning of the linked websites. We accept no responsibility for them or for any loss or damage that may arise from your use of them.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Linking to this Website</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        You may link to our home page or other public pages, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-4 text-muted-foreground">
                        <li>You must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists.</li>
                        <li>You must not establish a link from any website that is not owned by you.</li>
                        <li>This website must not be framed on any other site.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Removal of Links</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        You agree that, should we request the deletion of a link to our website that is within your control, you will delete the link promptly.
                    </p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        If you would like us to remove a link to your website that is included on this website, please contact us using the contact details below. Note that unless you have a legal right to demand removal, such removal will be at our discretion.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                    <p className="text-muted-foreground">
                        If you have any questions about this linking policy, please contact us:
                    </p>
                    <div className="mt-4 space-y-1">
                        <p className="text-muted-foreground">Email: <a href="mailto:nhrdodisha@gmail.com" className="text-primary hover:underline">nhrdodisha@gmail.com</a></p>
                    </div>
                </section>
            </div>
        </PolicyLayout>
    );
};

export default LinkingPolicy;
