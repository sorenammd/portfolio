"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stars = Array.from({ length: 5 });

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

function StarIcon({ className = "h-4.5 w-4.5 text-accent" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 1.2l2.23 6.02h6.42l-5.14 3.95 1.92 6.24L10 13.72 4.57 17.41l1.92-6.24-5.14-3.95h6.42L10 1.2z" fill="currentColor" />
        </svg>
    );
}

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-background px-5 text-foreground md:min-h-0 md:px-8 md:pt-20 md:pb-16">
            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center pt-10 md:block md:h-auto md:min-h-185 ">
                <div className="relative z-30 w-fit md:absolute md:left-1/2 md:top-22.5 md:z-auto md:-translate-x-1/2">
                    <motion.div
                        {...fadeUp(0)}
                        className="relative z-40 inline-flex items-center rounded-full border border-border bg-surface/90 px-5 py-1.5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
                    >
                        <span className="text-sm font-semibold tracking-wide text-foreground-secondary">Hello!</span>
                        <svg
                            className="absolute -right-2 -top-3 text-accent"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M12 2l1.46 4.54L18 8l-4.54 1.46L12 14l-1.46-4.54L6 8l4.54-1.46L12 2z" />
                        </svg>
                    </motion.div>

                    <motion.h1
                        {...fadeUp(0.1)}
                        className="relative z-10 mt-5 w-max whitespace-nowrap text-center text-[9.5vw] font-black leading-[0.95] tracking-normal text-foreground md:text-[clamp(4.75rem,6.55vw,6rem)]"
                    >
                        I&apos;m <span className="text-accent">Mohammad,</span>
                    </motion.h1>
                </div>

                <motion.h2
                    {...fadeUp(0.2)}
                    className="relative z-40 mt-5 w-max whitespace-nowrap text-center text-[9.5vw] font-black leading-[0.95] tracking-normal text-foreground md:absolute md:left-1/2 md:top-65 md:mt-0 md:-translate-x-1/2 md:text-[clamp(4.9rem,6.8vw,6.35rem)]"
                >
                    Softw
                    <span className="outlined-text">are En</span>
                    gineer
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="relative  -mt-8 h-140 w-[min(86vw,390px)] md:absolute md:left-1/2 md:top-18 md:z-20 md:mt-0 md:h-[min(86vh,690px)] md:min-h-157.5 md:w-[clamp(410px,33vw,455px)] md:-translate-x-1/2"
                >
                    <Image
                        src="/me.png"
                        alt="Mohammad Mohammadi photo"
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 86vw, (max-width: 1280px) 33vw, 455px"
                        className="relative z-0 object-contain object-top"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none
                         absolute -bottom-25 left-1/2 z-10 h-30 w-screen 
                         -translate-x-1/2 rounded-t-4xl border
                          border-border/0 bg-background md:h-42 "
                    />

                    <motion.div {...fadeUp(0.5)} className="absolute bottom-4 left-1/2 z-20 translate-x-[-54%] md:bottom-7">
                        <svg
                            className="absolute -left-14 bottom-2 hidden text-muted/50 md:block"
                            width="42"
                            height="42"
                            viewBox="0 0 42 42"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M5.5 11C18 6.5 28 12 31 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M26.5 31.5L31 26l5.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <div className="flex items-center gap-3 rounded-full border border-surface/40 bg-surface/30 px-4 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.10)] backdrop-blur-md md:gap-4">
                            <button className="flex h-13 items-center gap-2.5 rounded-full bg-accent px-8 text-base font-bold text-white shadow-[0_16px_30px_rgba(37,99,235,0.28)] transition-colors duration-200 hover:bg-accent-hover">
                                Portfolio
                                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                    <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="h-13 rounded-full border border-border bg-surface/70 px-8 text-base font-bold text-foreground text-nowrap shadow-[0_6px_14px_rgba(15,23,42,0.10)] transition-colors duration-200 hover:border-border/60 hover:bg-surface">
                                Hire Me
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div {...fadeIn(0.45)} className="hidden md:absolute md:left-[5.9%] md:top-105 md:z-50 md:flex md:w-52.5 md:flex-col md:gap-8">
                    <div>
                        <span className="-mb-2 block font-serif text-[42px] leading-none text-foreground-secondary">&ldquo;</span>
                        <p className="text-sm font-semibold leading-[1.55] text-caption">
                            Mohammad consistently turned rough ideas into polished, production-ready experiences.
                        </p>
                    </div>
                    <div>
                        <p className="text-[34px] font-black leading-none text-foreground">20+</p>
                        <p className="mt-1 text-sm font-semibold text-caption">Projects Delivered</p>
                    </div>
                </motion.div>

                <motion.div {...fadeIn(0.45)} className="hidden md:absolute md:right-[5.1%] md:top-133 md:z-50 md:flex md:w-51.25 md:flex-col md:items-end md:text-right">
                    <div className="mb-1 flex gap-1">
                        {stars.map((_unused, index) => (
                            <StarIcon key={index} />
                        ))}
                    </div>
                    <p className="text-[36px] font-black leading-tight text-foreground">5 Years</p>
                    <p className="text-base font-medium text-caption">Experience</p>
                    <hr className="mt-4 w-full border-border" />
                </motion.div>



                <motion.div {...fadeIn(0.6)} className="grid z-10 w-full max-w-md grid-cols-2 gap-4 py-10 md:hidden">
                    <div className="rounded-2xl border border-border-soft p-4">
                        <p className="text-xl font-black text-foreground">20+</p>
                        <p className="text-xs font-semibold text-caption">Projects Delivered</p>
                    </div>
                    <div className="rounded-2xl border border-border-soft p-4 text-right">
                        <div className="mb-1 flex justify-end gap-0.5">
                            {stars.map((_unused, index) => (
                                <StarIcon key={index} className="h-3.5 w-3.5 text-accent" />
                            ))}
                        </div>
                        <p className="text-xl font-black text-foreground">5 Years</p>
                        <p className="text-xs font-semibold text-caption">Experience</p>
                    </div>
                    <div className="col-span-2 rounded-2xl border border-border-soft p-4">
                        <span className="-mb-1 block font-serif text-3xl leading-none text-foreground-secondary">&ldquo;</span>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-caption">
                            Mohammad consistently turned rough ideas into polished, production-ready experiences.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
