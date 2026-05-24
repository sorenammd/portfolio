"use client";

import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";
import { AnimatePresence, motion, useScroll, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slideEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const variants: Variants = {
    enter: (dir: number) => ({
        x: dir < 0 ? "-100%" : 0,
        y: dir < 0 ? 0 : "100vh",
        opacity: 0,
    }),
    center: { x: 0, y: 0, opacity: 1 },
    exit: (dir: number) => ({
        x: dir < 0 ? 0 : "-100vw",
        y: dir < 0 ? "110vh" : 0,
        opacity: 0,
        transition: {
            x: { duration: 0.7, ease: slideEase },
            y: { duration: 0.7, ease: slideEase },
            opacity: { delay: 0.7, duration: 0.18, ease: "linear" },
        },
    }),
};

function getProjectTitleSize(name: string) {
    const longestPart = Math.max(...name.split(/[\s-]+/).map((part) => part.length));

    if (name.length >= 34) {
        return "text-[clamp(1.55rem,6.4vw,3rem)] md:text-[clamp(2.45rem,3.6vw,3.75rem)]";
    }

    if (name.length >= 18 || longestPart >= 13) {
        return "text-[clamp(1.9rem,8vw,3.75rem)] md:text-[clamp(3.05rem,4.35vw,4.55rem)]";
    }

    return "text-[clamp(2.35rem,10.5vw,4.8rem)] md:text-[clamp(3.9rem,5.7vw,5.85rem)]";
}

export default function ProjectsShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            const next = Math.min(
                projects.length - 1,
                Math.max(0, Math.round(v * (projects.length - 1))),
            );
            setActiveIndex((prev) => {
                if (prev === next) return prev;
                setDirection(next > prev ? 1 : -1);
                return next;
            });
        });
    }, [scrollYProgress]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            style={{ height: `${projects.length * 100}vh` }}
            className="relative bg-background"
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden py-10 md:py-12">
                <div className="mx-auto flex h-[82vh] min-h-135 w-full max-w-7xl flex-col px-5 md:h-[78vh] md:min-h-150 md:px-8">

                    {/* ── Section label ───────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-5 flex items-center gap-5 md:mb-6"
                    >
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-caption">
                            Projects
                        </span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 2.5,
                                delay: 0.2,
                                ease: slideEase,
                            }}
                            className="h-px flex-1 bg-border origin-left block"
                        />
                        <span className="text-[10px] font-semibold text-caption tabular-nums">
                            {String(projects.length).padStart(2, "0")}
                        </span>
                    </motion.div>

                    {/* ── Project slide ───────────────────────────────────────── */}
                    <div className="relative flex-1 min-h-0">
                        <AnimatePresence custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 flex items-center justify-center"
                                transition={{
                                    duration: 0.7,
                                    ease: slideEase,
                                }}
                            >
                                <ProjectSlide project={projects[activeIndex]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Scroll progress ──────────────────────────────────────── */}
                    <div className="mt-4 flex items-center gap-4">
                        <div className="relative h-px flex-1 bg-border-soft overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-accent origin-left"
                                style={{ scaleX: scrollYProgress }}
                            />
                        </div>
                        <span className="text-[10px] font-medium text-caption shrink-0">
                            Scroll to explore
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}

function ProjectSlide({ project }: { project: Project }) {
    const [leadTitle, ...restTitleParts] = project.name.split(" ");
    const restTitle = restTitleParts.join(" ");
    const titleSize = getProjectTitleSize(project.name);

    return (
        <article
            className="relative  grid h-full w-full max-w-7xl grid-rows-[minmax(0,1fr)_auto] items-center gap-4 py-2 md:grid-cols-[minmax(0,1.02fr)_minmax(300px,0.88fr)] md:grid-rows-1 md:gap-12 md:py-4"
        >
            <div className="relative order-2 z-10 flex min-h-0 flex-col items-start md:order-1">
                <div className="mb-4 flex flex-wrap items-center gap-3 md:mb-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-caption">
                        {project.category}
                    </span>
                    {project.domains.length > 0 && (
                        <a
                            href={project.domains[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-8 items-center gap-2 rounded-full bg-accent px-4 text-xs font-bold text-white shadow-[0_14px_26px_rgba(37,99,235,0.22)] transition-colors duration-200 hover:bg-accent-hover"
                            aria-label={`Open ${project.name}`}
                        >
                            Visit
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}
                </div>

                <h3 className={`max-w-4xl ${titleSize} font-black leading-[0.92] tracking-normal text-foreground`}>
                    <span className="block text-accent">{leadTitle}</span>
                    {restTitle && (
                        <span className="outlined-text block [text-wrap:balance]">
                            {restTitle}
                        </span>
                    )}
                </h3>

                <p className="mt-5 max-w-2xl text-[clamp(1rem,1.55vw,1.2rem)] font-semibold leading-[1.6] text-foreground md:mt-6">
                    {project.role}
                </p>

                <p className="mt-3 max-w-2xl text-[clamp(0.94rem,1.25vw,1.04rem)] leading-[1.82] text-foreground-secondary md:mt-4">
                    {project.shortVersion}
                </p>

                <div className="mt-6 flex max-w-2xl flex-wrap items-center gap-x-3 gap-y-2 md:mt-8">
                    {project.techStack.slice(0, 6).map((tech, index) => (
                        <span
                            key={tech}
                            className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-caption md:text-[11px]"
                        >
                            {index > 0 && <span className="h-px w-4 bg-border" aria-hidden="true" />}
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative order-1 h-[30vh] min-h-58 w-full md:order-2 md:h-full md:min-h-0">
                <div className="absolute inset-x-6 bottom-4 h-px bg-border-soft md:inset-x-10" aria-hidden="true" />
                <div className="absolute right-4 top-8 hidden h-28 w-px bg-border-soft md:block" aria-hidden="true" />
                <Image
                    src={project.thumbnail}
                    alt={`${project.name} preview`}
                    fill
                    className="object-contain object-center drop-shadow-[0_28px_44px_rgba(15,23,42,0.22)]"
                    sizes="(max-width: 768px) 92vw, 44vw"
                />
            </div>
        </article>
    );
}
