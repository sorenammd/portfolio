"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import Image from "next/image";

const timelineEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const experiences = [
    {
        company: "Sensifai",
        role: "Software Engineer",
        employment: "Full-time",
        period: "Oct 2025 - Present",
        duration: "8 mos",
        location: "Belgium",
        mode: "Remote",
        logo: "/sensifai.png",
        accent: "from-accent/18 via-accent/8 to-transparent",
    },
    {
        company: "SensoMatt Lda.",
        role: "Software Engineer",
        employment: "Full-time",
        period: "Feb 2025 - Sep 2025",
        duration: "8 mos",
        location: "Portugal",
        mode: "Remote",
        logo: "/sensomatt.png",
        accent: "from-foreground/10 via-border-soft to-transparent",
    },
    {
        company: "Sensifai",
        role: "Frontend Engineer",
        employment: "Full-time",
        period: "Jan 2023 - Feb 2025",
        duration: "2 yrs 2 mos",
        location: "Belgium",
        mode: "Remote",
        logo: "/sensifai.png",
        accent: "from-accent/16 via-accent/6 to-transparent",
    },
] as const;



export default function Experience() {
    return (
        <section
            id="experience"
            className="relative w-full overflow-hidden px-5 pt-14 pb-2 md:px-8 md:pt-18 md:pb-2"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-32"
            />

            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-10 flex items-center gap-5 md:mb-14"
                >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-caption">
                        Experience
                    </span>
                    <motion.span
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 2.4, delay: 0.12, ease: timelineEase }}
                        className="h-px flex-1 bg-border origin-left"
                        style={{ display: "block" }}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, ease: timelineEase }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h2 className="text-[clamp(1.55rem,3vw,2.4rem)] font-black leading-[1.08] tracking-tight text-foreground">
                        Product engineering

                        <span className="block text-accent">
                            across real-world teams.
                        </span>
                    </h2>

                    <p className="mt-4 text-sm font-medium leading-[1.8] text-foreground-secondary md:text-[0.95rem]">
                        A focused timeline of roles contributing to scalable products,
                        modern interfaces, and production-ready systems.
                    </p>
                </motion.div>

                <div className="relative mt-10 mx-auto max-w-4xl pb-2">
                    <div
                        className="absolute bottom-4 left-5 top-2 w-px bg-border md:left-1/2 md:-translate-x-1/2"
                        aria-hidden="true"
                    />
                    <motion.div
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 1.3, ease: timelineEase }}
                        className="absolute bottom-4 left-5 top-2 w-px origin-top bg-gradient-to-b from-accent via-accent/55 to-transparent md:left-1/2 md:-translate-x-1/2"
                        aria-hidden="true"
                    />

                    <div className="space-y-4 md:space-y-5">
                        {experiences.map((item, index) => {
                            const isLeft = index % 2 !== 0;

                            return (
                                <motion.article
                                    key={`${item.company}-${item.role}-${item.period}`}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-90px" }}
                                    transition={{
                                        duration: 0.58,
                                        delay: index * 0.1,
                                        ease: timelineEase,
                                    }}
                                    className="group relative pl-14 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
                                >
                                    <div
                                        className={`md:row-start-1 ${isLeft ? "md:col-start-1 md:justify-self-end" : "md:col-start-2"
                                            }`}
                                    >
                                        <div className="relative overflow-hidden rounded-[1.25rem] border border-border/80 bg-transparent transition-colors duration-300 group-hover:border-accent/40 w-full max-w-[22rem] md:w-[22rem]">
                                            <div className="relative flex flex-col gap-3 px-4 py-5 md:px-5 md:py-5">
                                                <div className="flex items-start gap-3">
                                                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center  bg-background/90 text-sm font-black tracking-tight text-foreground">

                                                        <Image
                                                            src={item.logo}
                                                            alt={`${item.company} logo`}
                                                            width={40}
                                                            height={40}
                                                            className="h-11 w-11 object-scale-down"
                                                        />

                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-base font-semibold leading-tight tracking-tight text-foreground">
                                                            {item.role}
                                                        </p>
                                                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-foreground-secondary">
                                                            {item.company}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground-secondary">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <BriefcaseBusiness className="h-3.5 w-3.5 text-accent" />
                                                        {item.employment}
                                                    </span>
                                                    <span className="text-caption font-medium normal-case">{item.duration}</span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-medium text-caption">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                                        {item.period}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <MapPin className="h-3.5 w-3.5 text-accent" />
                                                        {item.location} · {item.mode}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute left-5 top-8 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                                        <span className="absolute h-4 w-4 rounded-full border border-accent/25 bg-background" />
                                        <span className="relative h-2 w-2 rounded-full bg-accent" />
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}