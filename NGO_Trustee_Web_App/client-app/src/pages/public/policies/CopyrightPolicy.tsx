

import PolicyLayout from '@/components/layout/PolicyLayout';

const CopyrightPolicy = () => {
    return (
        <PolicyLayout title="Copyright Policy">
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property Rights</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The content, layout, design, data, databases and graphics on this website are protected by Indian and other international intellectual property laws and are owned by NHRD – National Humanity & Rural Development or its licensors.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Use of Content</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Unless otherwise stated, you may access and download the materials located on this website only for personal, non-commercial use.
                    </p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        You may not reproduce, distribute, display, sell, lease, transmit, create derivative works from, translate, modify, reverse-engineer, disassemble, decompile or otherwise exploit this website or any portion of it unless expressly permitted by NHRD in writing.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Protected Elements</h2>
                    <p className="text-muted-foreground">All content including but not limited to:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                        <li>NHRD Name and Brand</li>
                        <li>NHRD Logo</li>
                        <li>Text content and articles</li>
                        <li>Photographs and Images</li>
                        <li>Website design and layout</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                        are the intellectual property of NHRD and may not be reproduced without permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Permission Requests</h2>
                    <p className="text-muted-foreground">
                        If you wish to use any material from this website for commercial purposes or in a way not permitted by these terms, please contact us for permission:
                    </p>
                    <div className="mt-4 space-y-1">
                        <p className="text-muted-foreground">Email: <a href="mailto:nhrdodisha@gmail.com" className="text-primary hover:underline">nhrdodisha@gmail.com</a></p>
                    </div>
                </section>
            </div>
        </PolicyLayout>
    );
};

export default CopyrightPolicy;
