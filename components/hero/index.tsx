"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen bg-white dark:bg-[#060b14] overflow-hidden flex flex-col items-center pt-22 md:pt-24 px-5 md:px-6 transition-colors duration-300">
            {/* First heading wrapped so badge aligns with start of "I'm" text */}
            <div className="relative pt-9 w-fit">
                {/* Hello badge — absolute above left edge of "I'm" */}
                <motion.div
                    {...fadeUp(0)}
                    className="absolute top-0 left-0 inline-flex items-center border border-slate-200 dark:border-slate-700/60 rounded-full px-5 py-1.5 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm"
                >
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium tracking-wide">Hello!</span>
                    <svg
                        className="absolute -top-3 -right-2 text-blue-500 dark:text-blue-400"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
                    </svg>
                </motion.div>
                <motion.h1
                    {...fadeUp(0.1)}
                    style={{ textWrap: 'nowrap' }}
                    className="relative z-0 text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center leading-tight text-slate-900 dark:text-white"
                >
                    I&apos;m <span className="text-blue-600 dark:text-blue-400">Mohammad,</span>
                </motion.h1>
            </div>
            <motion.h1
                {...fadeUp(0.2)}
                style={{ textWrap: 'nowrap' }}
                className="relative z-20 text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center leading-tight text-slate-900 dark:text-white mb-0"
            >
                Softw<span style={{ WebkitTextStroke: "2px white", color: "transparent" }}>are En</span>gineer
            </motion.h1>

            {/* Desktop: three-column row */}
            <div className="relative w-full max-w-6xl flex items-end justify-between -mt-8 sm:mt-2 md:mt-10 lg:-mt-60">

                {/* Left stats — desktop only */}
                <motion.div {...fadeIn(0.45)} className="hidden lg:flex flex-col gap-8 pb-20 w-52 shrink-0">
                    <div>
                        <span className="text-5xl font-serif text-slate-600 dark:text-slate-400 leading-none">&ldquo;</span>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-1">
                            Mohammad&apos;s exceptional development skills ensured our product&apos;s success. Highly recommended!
                        </p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-slate-900 dark:text-white">50+</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Projects Delivered</p>
                    </div>
                </motion.div>

                {/* Center: photo + buttons */}
                <div className="relative flex flex-col items-center flex-1 mx-0 lg:mx-4 w-full lg:w-auto">
                    {/* Glow */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-56 h-56 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

                    {/* Photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        className="relative z-10 w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 mt-4 overflow-hidden lg:-mt-16"
                        style={{ height: "clamp(340px, 55vw, 650px)" }}
                    >
                        <Image
                            src="/me.png"
                            alt="Mohammad Mohammadi photo"
                            fill
                            priority
                            loading="eager"
                            sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
                            className="object-cover object-top"
                        />
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div {...fadeUp(0.5)} className="flex items-center gap-3 md:gap-4 mt-4 lg:-mt-6 relative z-10">
                        {/* Arrow — desktop only */}
                        <svg
                            className="hidden lg:block absolute -left-12 bottom-2 text-slate-500 dark:text-slate-500"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                        >
                            <path d="M5 10 Q20 5 30 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            <path d="M26 30 L30 25 L34 29" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 text-white rounded-full px-6 md:px-7 py-2.5 md:py-3 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 dark:shadow-blue-500/30">
                            Portfolio
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                            </svg>
                        </button>
                        <button className="border border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 text-slate-900 dark:text-white rounded-full px-6 md:px-7 py-2.5 md:py-3 font-semibold text-sm bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-sm backdrop-blur-sm">
                            Hire Me
                        </button>
                    </motion.div>

                    {/* Mobile stats — visible below lg */}
                    <motion.div {...fadeIn(0.6)} className="lg:hidden w-full grid grid-cols-2 gap-4 mt-10 mb-10 px-1">
                        <div className="flex flex-col gap-1 border border-slate-100 dark:border-slate-800 rounded-2xl p-4">
                            <p className="text-2xl font-black text-slate-900 dark:text-white">50+</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs">Projects Delivered</p>
                        </div>
                        <div className="flex flex-col gap-1 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 items-end text-right">
                            <div className="flex gap-0.5 mb-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#2563eb">
                                        <path d="M10 1l2.4 6.6H19l-5.4 4 2 6.5L10 14.3 4.4 18.1l2-6.5L1 7.6h6.6z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">5 Years</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs">Experience</p>
                        </div>
                        <div className="col-span-2 border border-slate-100 dark:border-slate-800 rounded-2xl p-4">
                            <span className="text-3xl font-serif text-slate-500 dark:text-slate-400 leading-none">&ldquo;</span>
                            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                                Mohammad&apos;s exceptional development skills ensured our product&apos;s success. Highly recommended!
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right stats — desktop only */}
                <motion.div {...fadeIn(0.45)} className="hidden lg:flex flex-col gap-1 pb-20 w-52 shrink-0 items-end text-right">
                    <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#2563eb">
                                <path d="M10 1l2.4 6.6H19l-5.4 4 2 6.5L10 14.3 4.4 18.1l2-6.5L1 7.6h6.6z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-4xl font-black text-slate-900 dark:text-white leading-tight">5 Years</p>
                    <p className="text-slate-500 dark:text-slate-400">Experience</p>
                    <hr className="w-full mt-3 border-slate-200 dark:border-slate-700/60" />
                </motion.div>
            </div>
        </section>
    );
}
