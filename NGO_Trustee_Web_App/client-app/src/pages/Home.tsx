import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Heart, Users, Shield } from 'lucide-react';
import Marquee from '@/components/ui/marquee';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function Home() {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center justify-center bg-slate-50">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                <motion.div
                    className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56 text-center"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeIn} className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-white/50 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer">
                            Announcing our new volunteer program. <Link to="/register" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></Link>
                        </div>
                    </motion.div>

                    <motion.h1 variants={fadeIn} className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl font-display bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        Empower Your Cause with our NGO Platform
                    </motion.h1>

                    <motion.p variants={fadeIn} className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                        Join our community of volunteers and donors. Transparency, efficiency, and impact - all in one place. We bridge the gap between resources and results.
                    </motion.p>

                    <motion.div variants={fadeIn} className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/register"
                            className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-600/50 hover:-translate-y-1 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
                        >
                            Become a Volunteer <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors">
                            Learn more <span aria-hidden="true">→</span>
                        </Link>
                    </motion.div>

                    {/* Glassy Stats Cards */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
                    >
                        {[
                            { label: 'Active Volunteers', value: '5,000+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { label: 'Lives Impacted', value: '1M+', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
                            { label: 'Funds Raised', value: '$10M+', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                                className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 p-8 shadow-sm transition-all duration-300"
                            >
                                <div className={`absolute top-0 right-0 p-4 opacity-10`}>
                                    <stat.icon className="w-24 h-24" />
                                </div>
                                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center mb-4`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <dt className="truncate text-sm font-medium text-gray-500">{stat.label}</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scrolling Marquee */}
            <Marquee />

            {/* Features Section */}
            <div className="py-24 sm:py-32 bg-white relative">
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-600/5 to-transparent pointer-events-none"></div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to manage your NGO
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Our platform provides a comprehensive suite of tools to manage volunteers, donations, and campaigns with ease.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {[
                                {
                                    name: 'Volunteer Management',
                                    description: 'Track hours, assign tasks, and manage specific volunteer profiles efficiently.',
                                    icon: Users,
                                },
                                {
                                    name: 'Donation Tracking',
                                    description: 'Secure, transparent donation processing with automated receipt and certificate generation.',
                                    icon: Heart,
                                },
                                {
                                    name: 'Event Coordination',
                                    description: 'Plan campaigns, schedule events, and manage RSVPs all in one central dashboard.',
                                    icon: CheckCircle2,
                                },
                                {
                                    name: 'Transparency Reports',
                                    description: 'Auto-generated financial and impact reports to build trust with your stakeholders.',
                                    icon: Shield,
                                },
                            ].map((feature, idx) => (
                                <motion.div
                                    key={feature.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative pl-16 p-6 rounded-2xl hover:bg-slate-50 transition-colors"
                                >
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-600/20 group-hover:shadow-indigo-600/40 transition-shadow">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
