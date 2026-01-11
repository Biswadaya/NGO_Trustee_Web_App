import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: string;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((_, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax overflow-hidden whitespace-nowrap flex flex-nowrap m-0 letter-spacing-[-2px] leading-[0.8]">
            <motion.div className="scroller font-bold uppercase text-[64px] flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block mr-10">{children} </span>
                <span className="block mr-10">{children} </span>
                <span className="block mr-10">{children} </span>
                <span className="block mr-10">{children} </span>
            </motion.div>
        </div>
    );
}

export default function Marquee() {
    return (
        <section className="py-10 bg-indigo-600 text-white/90 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            <ParallaxText baseVelocity={-5}>Transparency • Impact • Community • Trust • </ParallaxText>
            <ParallaxText baseVelocity={5}>Empowerment • Volunteer • Donate • Change • </ParallaxText>
        </section>
    );
}
