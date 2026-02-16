
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PolicyLayoutProps {
    title: string;
    children: React.ReactNode;
}

const PolicyLayout = ({ title, children }: PolicyLayoutProps) => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <div className="bg-primary/5 border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-6">
                            {title}
                        </h1>

                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Link to="/" className="hover:text-primary transition-colors">
                                Home
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-foreground font-medium">{title}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="prose prose-lg max-w-none text-muted-foreground"
                >
                    {/* Styles for direct children content to match strict policy styling */}
                    <div className="space-y-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-muted-foreground">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PolicyLayout;
