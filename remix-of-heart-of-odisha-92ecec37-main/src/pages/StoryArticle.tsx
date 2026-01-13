import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import womenImage from '@/assets/women-shg-meeting.jpg';
import childrenImage from '@/assets/children-classroom.jpg';

const storiesData = [
  {
    id: '1',
    name: 'Sunita Devi',
    location: 'Balipatna Village',
    quote: 'Through the SHG program, I started a small dairy business. Now I earn ₹8,000 monthly and my children are in school.',
    program: 'Women Empowerment',
    image: womenImage,
    author: 'NHRD Communications Team',
    publishDate: '2024-11-15',
    readTime: '5 min read',
    fullStory: `Sunita Devi's story is one of remarkable transformation. Just five years ago, she was struggling to make ends meet in Balipatna Village, a small rural community in Odisha's Khordha district. With no formal education and limited opportunities, she depended entirely on her husband's irregular daily wage earnings.

Everything changed when NHRD's community organizers visited her village and introduced the concept of Self-Help Groups (SHGs). Initially skeptical, Sunita attended a few meetings out of curiosity. The warmth of the group and the promise of financial independence slowly won her over.

"I was afraid at first," Sunita recalls. "I had never handled money beyond household expenses. The thought of starting a business seemed impossible."

The SHG provided her with financial literacy training, teaching her how to save, budget, and manage credit. After six months of regular savings, Sunita's group was linked to a bank for microfinance. With a loan of ₹25,000, she purchased two cows and started a small dairy business.

The early days were challenging. Sunita woke at 4 AM daily to milk the cows, deliver fresh milk to local households, and manage her home. But her determination never wavered. Within a year, her dairy business was generating a steady income of ₹8,000 per month – more than her husband had ever earned.

Today, Sunita has expanded her dairy to four cows and employs two other women from her village. Her three children are all enrolled in school, with the eldest daughter recently completing her 12th standard – a first for their family.

"NHRD didn't just give me money," Sunita says with pride. "They gave me confidence. They showed me that I could be more than what my circumstances dictated."

Sunita now serves as a mentor for new SHG members, sharing her journey and inspiring other women to take the leap of faith that transformed her life.`,
  },
  {
    id: '2',
    name: 'Rajan Kumar',
    location: 'Nimapara',
    quote: 'The masonry training gave me skills to build houses. I went from daily wages to running my own construction team.',
    program: 'Livelihood',
    image: childrenImage,
    author: 'NHRD Field Team',
    publishDate: '2024-10-22',
    readTime: '4 min read',
    fullStory: `Rajan Kumar's hands tell the story of his transformation – calloused from years of hard work, but now skilled in the art of construction that has lifted his entire family from poverty.

Before joining NHRD's masonry training program, Rajan was a daily wage laborer in Nimapara, earning barely ₹200 per day when work was available. The uncertainty of income meant his family often went without adequate food, and his children's education was always at risk.

"I used to stand at the town square every morning, hoping someone would hire me for the day," Rajan remembers. "Some days there was work, many days there wasn't."

In 2019, NHRD launched a masonry training program in partnership with the state government's skill development initiative. Rajan, encouraged by his wife, enrolled in the three-month residential program despite his initial reservations about leaving his family.

The training was comprehensive – from reading construction blueprints to understanding cement mixing ratios, from laying foundations to finishing walls. Rajan was a quick learner, and his dedication caught the attention of his trainers.

Upon completing the program, Rajan received a certification and a basic tool kit. He started taking small construction jobs, building toilets under the Swachh Bharat Mission. His quality work and reliability quickly earned him a reputation in the area.

Within two years, Rajan had assembled a team of five trained masons, all graduates of the same NHRD program. Together, they now take on larger construction projects – houses, community buildings, and school renovations.

"Last year, we built 47 houses," Rajan says proudly. "I now earn ₹25,000 to ₹30,000 per month, and my team members earn ₹15,000 to ₹20,000 each."

Rajan's children are now in a private English-medium school – something he never dreamed possible. His wife has started a small provision store with their savings, adding another income stream to the family.`,
  },
  {
    id: '3',
    name: 'Priya Mohanty',
    location: 'Bhubaneswar',
    quote: 'Free education at LSE changed my life. I was the first in my family to graduate. Now I teach other children.',
    program: 'Education',
    image: womenImage,
    author: 'NHRD Education Team',
    publishDate: '2024-09-08',
    readTime: '6 min read',
    fullStory: `Priya Mohanty stands before a classroom of 30 eager children, teaching them English grammar with patience and enthusiasm. Just a decade ago, she was one of those children, sitting in the same school, dreaming of a future she couldn't yet imagine.

Born into a family of agricultural laborers on the outskirts of Bhubaneswar, Priya's chances of receiving quality education were slim. The nearest government school was 5 kilometers away, and her parents couldn't afford the transportation or the hidden costs of "free" education.

"My parents wanted me to help in the fields," Priya recalls. "Education was seen as a luxury for girls in our community."

When NHRD's London School of Education (LSE) opened in 2008 near her village, it was truly free – no fees, free uniforms, free meals, free transportation, and regular health checkups. Her mother, seeing an opportunity, enrolled 8-year-old Priya despite objections from relatives.

The school became Priya's second home. The teachers recognized her intelligence and encouraged her to excel. The mid-day meals ensured she could focus on studies instead of an empty stomach. The free transportation meant she never missed a day of school.

Priya topped her class consistently. When she passed her 10th standard with distinction, NHRD provided a scholarship for her higher secondary education. She continued to excel, eventually earning a degree in Education from a local college.

"Every step of the way, NHRD was there," Priya says. "When I needed books, when I needed guidance for college applications, when I needed encouragement to keep going."

Today, Priya teaches at the same school that educated her. She earns a respectable salary, supports her parents financially, and has become a role model in her community.

"When girls from the village see me, they see what's possible," she says. "I'm not special – I was just given an opportunity. And now I want to give that same opportunity to every child who walks through our doors."

Priya's younger sister is currently studying nursing, and her brother is in engineering college – a testament to how one opportunity can transform an entire family's trajectory.`,
  },
];

const StoryArticle = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  
  const story = storiesData.find(s => s.id === id) || storiesData[0];

  const shareUrl = window.location.href;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={story.image} 
            alt={story.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/stories" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.backToHome', 'Back to Stories')}
            </Link>
            
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-4">
              {story.program}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {story.name}: "{story.quote}"
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{story.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(story.publishDate).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{story.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Author Card */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl mb-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {story.author.split(' ').map(w => w[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-foreground">{story.author}</p>
                <p className="text-sm text-muted-foreground">
                  {t('stories.publishedOn', 'Published on')} {new Date(story.publishDate).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Article Body */}
            <article className="prose prose-lg max-w-none">
              {story.fullStory.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/90 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Share Section */}
            <div className="border-t border-border pt-8 mt-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  {t('stories.shareStory', 'Share this story')}
                </p>
                <div className="flex items-center gap-3">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(story.quote)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-accent/10 rounded-2xl p-6 md:p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t('stories.inspiredTitle', 'Inspired by this story?')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('stories.inspiredSubtitle', 'Your support can help create more success stories like this')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/donate">
                  <Button variant="cta" size="lg" className="gap-2">
                    <Heart className="w-4 h-4" />
                    {t('cta.donateNow')}
                  </Button>
                </Link>
                <Link to="/stories">
                  <Button variant="outline" size="lg">
                    {t('stories.readMore', 'Read More Stories')}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {t('stories.relatedStories', 'More Stories of Transformation')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {storiesData.filter(s => s.id !== id).slice(0, 3).map((relatedStory) => (
              <Link 
                key={relatedStory.id}
                to={`/stories/${relatedStory.id}`}
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={relatedStory.image} 
                    alt={relatedStory.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {relatedStory.program}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {relatedStory.name}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    "{relatedStory.quote}"
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StoryArticle;
