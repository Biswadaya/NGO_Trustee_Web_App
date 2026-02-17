import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stories } from '@/data/stories';

const Stories = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 pt-32 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                    >
                        {t('stories.pageTitle', 'Stories of Transformation')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        {t('stories.pageSubtitle', 'Read about the real impact of our programs on individuals and communities across Odisha.')}
                    </motion.p>
                </div>
            </section>

            {/* Stories Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map((story, index) => (
                            <motion.article
                                key={story.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Image */}
                                <Link to={`/stories/${story.id}`} className="aspect-video overflow-hidden block">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            <Tag className="w-3 h-3" />
                                            {story.program}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                                            <Calendar className="w-3 h-3" />
                                            {story.date}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
                                        <Link to={`/stories/${story.id}`}>
                                            {t(`stories.list.${story.id}.title`, story.title)}
                                        </Link>
                                    </h2>

                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow italic">
                                        "{t(`stories.list.${story.id}.quote`, story.quote)}"
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-2 text-sm text-foreground/80">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span>{story.name}</span>
                                        </div>
                                        <Link to={`/stories/${story.id}`}>
                                            <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto hover:bg-transparent hover:text-primary">
                                                Read Story
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Stories;
