import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { stories } from '@/data/stories';

const recentStories = stories.slice(0, 3);

const StoriesSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {t('stories.title', 'Voices of Change')}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('stories.subtitle', 'Real stories of transformation from the communities we serve')}
                    </p>
                </motion.div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {recentStories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="story-card overflow-hidden group"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={story.image}
                                    alt={story.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="badge-accent text-xs">
                                        {story.program}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Quote */}
                                <div className="relative mb-4">
                                    <Quote className="absolute -top-2 -left-1 w-8 h-8 text-primary/20" />
                                    <p className="text-foreground/80 text-sm leading-relaxed pl-6 italic">
                                        "{story.quote}"
                                    </p>
                                </div>

                                {/* Author */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-foreground">{story.name}</p>
                                        <p className="text-sm text-muted-foreground">{story.location}</p>
                                    </div>
                                    <Link
                                        to={`/stories/${story.id}`}
                                        className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        {t('stories.readMore', 'Read Story')}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link to="/stories">
                        <Button variant="outline" size="lg" className="gap-2">
                            {t('common.viewAll', 'View All Stories')}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default StoriesSection;
