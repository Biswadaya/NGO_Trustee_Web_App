import womenEmpowerment from "../assets/women empowerment.jpeg"
import livelihood from "../assets/livelihood.jpeg"
import children from "../assets/children.jpeg"
import agriculture from "../assets/harvest.jpeg"
export interface Story {
    id: string;
    title: string;
    name: string;
    location: string;
    program: 'Education' | 'Women Empowerment' | 'Health' | 'Livelihood' | 'Agriculture';
    quote: string;
    image: string;
    content: string; // HTML or Markdown content
    date: string;
}

export const stories: Story[] = [
    {
        id: '1',
        title: 'From Daily Wager to Dairy Entrepreneur',
        name: 'Sunita Devi',
        location: 'Balipatna Village',
        program: 'Women Empowerment',
        quote: 'Through the SHG program, I started a small dairy business. Now I earn ₹8,000 monthly and my children are in school.',
        image: womenEmpowerment,
        date: 'March 15, 2024',
        content: `
            <p>Sunita Devi, a 34-year-old mother of two from Balipatna village, struggled to make ends meet as a daily wage laborer. With an uncertain income and a family to support, she often faced days without enough food.</p>
            <p>In 2018, NHRD organized a mobilization drive in her village, encouraging women to form Self-Help Groups (SHGs). Hesitant at first, Sunita joined the "Maa Tarini SHG" with 11 other women. Through the SHG, she received training in financial literacy and the importance of savings.</p>
            <h3>The Turning Point</h3>
            <p>After six months of regular savings, NHRD facilitated a bank linkage for her group. Sunita took a small loan of ₹20,000 to buy a cow. With the guidance of NHRD's livelihood experts, she learned about proper cattle care and dairy management.</p>
            <p>Today, Sunita owns three cows and sells over 20 liters of milk daily to the local cooperative. Her monthly income has stabilized at around ₹8,000, allowing her to send both her children to the NHRD-supported school.</p>
            <blockquote>"I never thought I could be a business owner. NHRD didn't just give me money; they gave me the confidence to stand on my own feet."</blockquote>
        `
    },
    {
        id: '2',
        title: 'Building Dreams, Brick by Brick',
        name: 'Rajan Kumar',
        location: 'Nimapara',
        program: 'Livelihood',
        quote: 'The masonry training gave me skills to build houses. I went from daily wages to running my own construction team.',
        image: livelihood,
        date: 'February 10, 2024',
        content: `
            <p>Rajan Kumar dropped out of school at 14 to support his family. For years, he worked as an unskilled helper at construction sites, earning meager wages and facing frequent exploitation.</p>
            <p>Recognizing the demand for skilled labor in the region, NHRD launched a Masonry Training Program. Rajan enrolled in the 45-day intensive course, where he learned technical skills, measurement, and safety standards.</p>
            <h3>A New Foundation</h3>
            <p>Armed with certification and a tool kit provided by NHRD, Rajan started taking up small independent contracts. His quality of work quickly earned him a reputation in Nimapara.</p>
            <p>Now, at 28, Rajan employs four other youth from his village. He recently built a pucca house for his own parents, a dream he had cherished since childhood.</p>
        `
    },
    {
        id: '3',
        title: 'The First Graduate',
        name: 'Priya Mohanty',
        location: 'Bhubaneswar',
        program: 'Education',
        quote: 'Free education at LSE changed my life. I was the first in my family to graduate. Now I teach other children.',
        image: children,
        date: 'January 22, 2024',
        content: `
            <p>Priya was born into a family of landless farmers. Education was a luxury they could not afford. However, when NHRD established the London School of Education (LSE) for underprivileged children, Priya's parents enrolled her in the first batch.</p>
            <p>The school provided her with everything—uniforms, books, meals, and most importantly, a nurturing environment. Priya excelled in her studies, showing a keen interest in science.</p>
            <h3>Giving Back</h3>
            <p>Supported by NHRD through college, Priya recently graduated with a B.Sc. in Physics. She is the first person in her entire extended family to hold a university degree.</p>
            <p>Instead of taking a corporate job, Priya chose to return to LSE as a teacher. "I want to be the light for other children, just as NHRD was for me," she says.</p>
        `
    },
    {
        id: '4',
        title: 'Harvesting Hope: Organic Farming Success',
        name: 'Bimal Das',
        location: 'Puri District',
        program: 'Agriculture',
        quote: 'Organic farming reduced my costs and increased my yield. The soil is healthier, and so is my family.',
        image: agriculture,
        date: 'December 05, 2023',
        content: `
            <p>Decades of chemical farming had degraded the soil in Bimal Das's 2-acre plot. Yields were dropping, and debts were mounting due to the high cost of fertilizers.</p>
            <p>NHRD's agricultural intervention program introduced Bimal to organic farming techniques. He learned composting, natural pest management, and crop rotation.</p>
            <h3>Sustainable Growth</h3>
            <p>The transition was challenging, but within two years, Bimal saw a remarkable turnaround. His input costs dropped by 60%, and the quality of his organic paddy fetched a premium price in the market.</p>
            <p>Bimal is now a lead farmer in his community, training others in sustainable practices. "We are not just growing crops; we are healing the earth," he proclaims proudly.</p>
        `
    }
];
