import { motion, AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JourneyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const JourneyModal = ({ isOpen, onClose }: JourneyModalProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative p-6 md:p-8">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <div className="mb-8 text-center pt-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Complete Journey</h2>
                            <p className="text-lg text-muted-foreground">A detailed history of NHRD's impact and milestones in rural Odisha.</p>
                        </div>

                        {/* Content */}
                        <div className="space-y-8 pr-2">

                            {/* 2000 */}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-lg">2000</span>
                                    Inception
                                </h3>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-muted-foreground leading-relaxed">NHRD is a rural development organization working with the poor and marginalized communities of Odisha since 2000. Our mission is to make sustainable improvements in their quality of life by building their capabilities, strengthening community institutions, and mobilizing resources.</p>
                                    <div className="mt-4 bg-muted p-4 rounded-lg italic border-l-4 border-primary text-muted-foreground">
                                        "National Humanity and Rural Development (NHRD) is a leading non-profit organization dedicated to supporting Child Education, Empowering Women, and combating inequality in Odisha."
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-border/50" />

                            {/* 2002 */}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-lg">2002</span>
                                    Building Foundations
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-muted-foreground">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span>To form, promote & nurture SHGs involving poor homogeneous women for their economic development.</span>
                                    </li>
                                    <li className="flex gap-3 text-muted-foreground">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span>To impart viable Micro credit trainings with SHGs women members to build capacity in thrift & credit systems.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-t border-border/50" />

                            {/* 2008 */}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-lg">2008</span>
                                    Education & Health Expansion
                                </h3>
                                <div className="space-y-6">
                                    <p className="text-muted-foreground leading-relaxed">National Humanity & Rural Development (NHRD) has set up an English medium school namely <strong>London School of Education (LSE)</strong> since 2008 & provide educational facilities at free of cost. Besides this, the organization is also bearing cost of conveyance for coming & going of students along with free uniform & learning materials including free health checkup facilities.</p>

                                    <div className="bg-primary/5 p-6 rounded-xl space-y-4">
                                        <h4 className="font-bold text-lg text-primary">Water & Sanitation Impact</h4>
                                        <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 682 people provided with clean drinking water</li>
                                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 6 water purification systems installed</li>
                                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 4,261 families provided with 118,352 litres of clean drinking water</li>
                                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 50 water sources cleaned & chlorinated</li>
                                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 6 drinking water ring wells rehabilitated</li>
                                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 3,160 Hygiene Kits & 13,868 ORS sachets distributed</li>
                                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 22 gender-segregated toilets built</li>
                                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 100 Solar Lamps distributed</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-lg mb-3">Livelihoods & Training</h4>
                                        <ul className="space-y-3 text-muted-foreground">
                                            <li className="flex gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                                                50 farmer producer groups formed (525 women members) provided with bio manure, pesticides, and tools.
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                                                Poultry distributed to 6 groups (60 landless farmers).
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                                                16 irrigation units distributed to 85 women farmers, enhancing production and profit.
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                                                8 spices processing units and 1 dal processing unit installed, generating ₹41,232 income.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="bg-secondary/10 p-4 rounded-xl text-center">
                                            <h5 className="font-bold text-secondary mb-1">Sanitation & Health</h5>
                                            <p className="text-3xl font-bold">472</p>
                                            <p className="text-sm text-muted-foreground">Villages declared open infection free</p>
                                        </div>
                                        <div className="bg-accent/10 p-4 rounded-xl text-center">
                                            <h5 className="font-bold text-accent mb-1">Masons Trained</h5>
                                            <p className="text-3xl font-bold">1,660</p>
                                            <p className="text-sm text-muted-foreground">Persons trained (632 women)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-border/50" />

                            {/* Micro Credit */}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-lg">Ongoing</span>
                                    Micro Credit Linkage
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground leading-relaxed">National Humanity & Rural Development (NHRD) extends micro-credit and social welfare activities across 5 coastal districts of Odisha, covering 16 Blocks, 248 Gram Panchayats & 500 villages, involving 32,000 women members in 2,782 SHGs.</p>
                                    <div className="bg-card border border-border p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Total Credit Linked</p>
                                            <p className="text-3xl font-bold text-primary">₹80,000,000</p>
                                        </div>
                                        <div className="text-right md:text-left">
                                            <p className="text-sm text-muted-foreground">Facilitated for 555 SHGs</p>
                                            <p className="text-xs text-muted-foreground">Supported by Indian Bank & NHRDI Cooperative</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-border/50" />

                            {/* 2019 */}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-lg">2019</span>
                                    Cyclone FANI Response
                                </h3>
                                <div className="bg-destructive/5 p-6 rounded-xl space-y-4">
                                    <p className="text-muted-foreground">Cyclone FANI (May 3, 2019) caused havoc in Puri & Khordha. NHRD, in collaboration with ADRA & HBCW Australia, responded immediately.</p>
                                    <ul className="space-y-2">
                                        <li className="flex gap-2 items-start text-muted-foreground">
                                            <CheckCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                                            <span>Rice, mosquito nets, and utensils provided to 4,500 families.</span>
                                        </li>
                                        <li className="flex gap-2 items-start text-muted-foreground">
                                            <CheckCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                                            <span>₹10,000 direct transfer to families who lost homes.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default JourneyModal;
