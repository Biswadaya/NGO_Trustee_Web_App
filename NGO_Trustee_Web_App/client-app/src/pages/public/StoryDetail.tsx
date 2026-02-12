import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stories } from '@/data/stories';

const StoryDetail = () => {
    const { id } = useParams<{ id: string }>();
    const story = stories.find(s => s.id === id);

    if (!story) {
        return <Navigate to="/stories" replace />;
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Header/Hero */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
                    <div className="max-w-3xl mx-auto">
                        <Link to="/stories" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Stories
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                    {story.program}
                                </span>
                                <span className="flex items-center gap-1 text-white/90 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    {story.location}
                                </span>
                                <span className="flex items-center gap-1 text-white/90 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {story.date}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {story.title}
                            </h1>

                            <p className="text-xl text-white/90 font-medium">
                                {story.name}'s Story
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: story.content }}
                />

                <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share Story
                    </Button>
                    <Link to="/stories">
                        <Button variant="ghost" className="gap-2">
                            More Stories
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default StoryDetail;
