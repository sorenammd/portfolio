"use client";

import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";
import { AnimatePresence, motion, useScroll, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const slideEase = [0.22, 1, 0.36, 1] as [number, number, number, number];
const scrollStepCooldownMs = 780;
const wheelDeltaThreshold = 8;
const touchDeltaThreshold = 34;
const dragSwitchThreshold = 52;
const mobileStepStartViewportRatio = 0.2;

type StepOptions = {
    requireInView?: boolean;
};

type PointerGestureState = {
    pointerId: number;
    startX: number;
    startY: number;
    ignore: boolean;
};

type ShowcaseSlide =
    | {
        type: "project";
        project: Project;
    }
    | {
        type: "cta";
    };

const featuredProjects = projects.slice(0, 3);
const remainingProjects = projects.slice(featuredProjects.length);
const showcaseSlides: ReadonlyArray<ShowcaseSlide> = [
    ...featuredProjects.map((project) => ({ type: "project" as const, project })),
    { type: "cta" as const },
];
const marqueeRows = Array.from({ length: 3 }, (_unused, rowIndex) => (
    remainingProjects.filter((_project, index) => index % 3 === rowIndex)
));

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

const contentRevealVariants: Variants = {
    hidden: { opacity: 0, y: 36 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay,
            ease: slideEase,
        },
    }),
};

const thumbnailRevealVariants: Variants = {
    hidden: { opacity: 0, y: 48, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.85,
            delay: 0.18,
            ease: slideEase,
        },
    },
};

function getProjectTitleSize(name: string) {
    const longestPart = Math.max(...name.split(/[\s-]+/).map((part) => part.length));

    if (name.length >= 34) {
        return "text-[clamp(1.25rem,5.5vw,2.2rem)] md:text-[clamp(2.45rem,3.6vw,3.75rem)]";
    }

    if (name.length >= 18 || longestPart >= 13) {
        return "text-[clamp(1.55rem,6.7vw,2.75rem)] md:text-[clamp(3.05rem,4.35vw,4.55rem)]";
    }

    return "text-[clamp(1.9rem,8.2vw,3.45rem)] md:text-[clamp(3.9rem,5.7vw,5.85rem)]";
}

function clampProjectIndex(index: number) {
    return Math.min(showcaseSlides.length - 1, Math.max(0, index));
}

export default function ProjectsShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef(0);
    const isSteppingRef = useRef(false);
    const stepTimeoutRef = useRef<number | null>(null);
    const touchStartXRef = useRef<number | null>(null);
    const touchStartYRef = useRef<number | null>(null);
    const pointerGestureRef = useRef<PointerGestureState | null>(null);
    const canStepRef = useRef<(scrollDirection: number, options?: StepOptions) => boolean>(() => false);
    const stepProjectRef = useRef<(scrollDirection: number, options?: StepOptions) => void>(() => undefined);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const progressScale = showcaseSlides.length <= 1 ? 1 : activeIndex / (showcaseSlides.length - 1);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    const clearStepCooldown = useCallback(() => {
        if (stepTimeoutRef.current !== null) {
            window.clearTimeout(stepTimeoutRef.current);
            stepTimeoutRef.current = null;
        }
    }, []);

    const getSectionScrollBounds = useCallback(() => {
        const section = sectionRef.current;
        if (!section) return null;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const maxScrollY = sectionTop + section.offsetHeight - window.innerHeight;

        return {
            sectionTop,
            maxScrollY: Math.max(sectionTop, maxScrollY),
        };
    }, []);

    const isInsideSteppedScrollArea = useCallback(() => {
        const scrollBounds = getSectionScrollBounds();
        if (!scrollBounds) return false;

        const currentScrollY = window.scrollY;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const startScrollY = isMobile
            ? scrollBounds.sectionTop - window.innerHeight * mobileStepStartViewportRatio
            : scrollBounds.sectionTop;

        return currentScrollY >= startScrollY - 2 && currentScrollY <= scrollBounds.maxScrollY + 2;
    }, [getSectionScrollBounds]);

    const canStep = useCallback((scrollDirection: number, options?: StepOptions) => {
        const requireInView = options?.requireInView ?? true;
        if (requireInView && !isInsideSteppedScrollArea()) return false;

        const currentIndex = activeIndexRef.current;
        return scrollDirection > 0
            ? currentIndex < showcaseSlides.length - 1
            : currentIndex > 0;
    }, [isInsideSteppedScrollArea]);

    const getSnapTarget = useCallback((index: number) => {
        const scrollBounds = getSectionScrollBounds();
        if (!scrollBounds) return null;

        const stepSize = showcaseSlides.length <= 1 ? 0 : (scrollBounds.maxScrollY - scrollBounds.sectionTop) / (showcaseSlides.length - 1);

        return scrollBounds.sectionTop + stepSize * index;
    }, [getSectionScrollBounds]);

    const stepProject = useCallback((scrollDirection: number, options?: StepOptions) => {
        if (isSteppingRef.current || !canStep(scrollDirection, options)) return;

        const nextIndex = clampProjectIndex(activeIndexRef.current + scrollDirection);
        if (nextIndex === activeIndexRef.current) return;

        const snapTarget = getSnapTarget(nextIndex);
        if (snapTarget === null) return;

        setDirection(scrollDirection);
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
        isSteppingRef.current = true;

        clearStepCooldown();
        window.scrollTo({ top: snapTarget, behavior: "smooth" });
        stepTimeoutRef.current = window.setTimeout(() => {
            isSteppingRef.current = false;
            stepTimeoutRef.current = null;
        }, scrollStepCooldownMs);
    }, [canStep, clearStepCooldown, getSnapTarget]);

    useEffect(() => {
        canStepRef.current = canStep;
        stepProjectRef.current = stepProject;
    }, [canStep, stepProject]);

    const resetPointerGesture = () => {
        pointerGestureRef.current = null;
    };

    const handleSlidePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        const target = event.target instanceof HTMLElement ? event.target : null;
        const ignore = Boolean(
            target?.closest("a, button, input, textarea, select, summary, [role='button'], [data-drag-switch='ignore']"),
        );

        pointerGestureRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            ignore,
        };

        if (!ignore) {
            event.currentTarget.setPointerCapture(event.pointerId);
        }
    };

    const handleSlidePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
        const gesture = pointerGestureRef.current;
        if (!gesture || gesture.pointerId !== event.pointerId) return;

        if (!gesture.ignore && event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        resetPointerGesture();
        if (gesture.ignore) return;

        const deltaX = event.clientX - gesture.startX;
        const deltaY = event.clientY - gesture.startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        const useVerticalAxis = absY >= absX;
        const primaryDelta = useVerticalAxis ? deltaY : deltaX;

        if (Math.abs(primaryDelta) < dragSwitchThreshold) return;

        const scrollDirection = primaryDelta < 0 ? 1 : -1;
        stepProjectRef.current(scrollDirection, { requireInView: false });
    };

    useEffect(() => {
        return scrollYProgress.on("change", (scrollProgress) => {
            if (isSteppingRef.current) return;

            const next = Math.min(
                showcaseSlides.length - 1,
                Math.max(0, Math.round(scrollProgress * (showcaseSlides.length - 1))),
            );
            setActiveIndex((prev) => {
                if (prev === next) return prev;
                setDirection(next > prev ? 1 : -1);
                activeIndexRef.current = next;
                return next;
            });
        });
    }, [scrollYProgress]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) < wheelDeltaThreshold || Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
                return;
            }

            const scrollDirection = event.deltaY > 0 ? 1 : -1;
            if (!canStepRef.current(scrollDirection)) return;

            event.preventDefault();
            stepProjectRef.current(scrollDirection);
        };

        const handleTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0];
            if (!touch) return;

            touchStartXRef.current = touch.clientX;
            touchStartYRef.current = touch.clientY;
        };

        const handleTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0];
            if (!touch || touchStartXRef.current === null || touchStartYRef.current === null) return;

            const deltaX = touchStartXRef.current - touch.clientX;
            const deltaY = touchStartYRef.current - touch.clientY;
            if (Math.abs(deltaY) < wheelDeltaThreshold || Math.abs(deltaY) < Math.abs(deltaX)) return;

            const scrollDirection = deltaY > 0 ? 1 : -1;
            if (canStepRef.current(scrollDirection)) {
                event.preventDefault();
            }
        };

        const handleTouchEnd = (event: TouchEvent) => {
            const touch = event.changedTouches[0];
            if (!touch || touchStartXRef.current === null || touchStartYRef.current === null) return;

            const deltaX = touchStartXRef.current - touch.clientX;
            const deltaY = touchStartYRef.current - touch.clientY;

            touchStartXRef.current = null;
            touchStartYRef.current = null;

            if (Math.abs(deltaY) < touchDeltaThreshold || Math.abs(deltaY) < Math.abs(deltaX)) return;

            const scrollDirection = deltaY > 0 ? 1 : -1;
            if (canStepRef.current(scrollDirection)) {
                stepProjectRef.current(scrollDirection);
            }
        };

        const resetTouchStart = () => {
            touchStartXRef.current = null;
            touchStartYRef.current = null;
        };

        section.addEventListener("wheel", handleWheel, { passive: false });
        section.addEventListener("touchstart", handleTouchStart, { passive: true });
        section.addEventListener("touchmove", handleTouchMove, { passive: false });
        section.addEventListener("touchend", handleTouchEnd, { passive: true });
        section.addEventListener("touchcancel", resetTouchStart, { passive: true });

        return () => {
            clearStepCooldown();
            section.removeEventListener("wheel", handleWheel);
            section.removeEventListener("touchstart", handleTouchStart);
            section.removeEventListener("touchmove", handleTouchMove);
            section.removeEventListener("touchend", handleTouchEnd);
            section.removeEventListener("touchcancel", resetTouchStart);
        };
    }, [clearStepCooldown]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            style={{ height: `${showcaseSlides.length * 100}vh` }}
            className="relative bg-background"
        >
            <div className="sticky top-0 flex h-screen items-start overflow-hidden px-5 pb-0 pt-0 md:items-center md:px-8 md:pb-0 md:pt-0">
                <div className="relative mx-auto w-full max-w-7xl">
                    <div className="flex h-[82vh] min-h-135 w-full flex-col md:h-[78vh] md:min-h-150">

                        {/* ── Section label ───────────────────────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="mb-10 flex items-center gap-5 md:mb-14"
                        >
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-caption">
                                Projects
                            </span>
                            <motion.span
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{
                                    duration: 2.4,
                                    delay: 0.12,
                                    ease: slideEase,
                                }}
                                className="h-px flex-1 bg-border origin-left"
                                style={{ display: "block" }}
                            />
                        </motion.div>

                        {/* ── Project slide ───────────────────────────────────────── */}
                        <div className="relative min-h-0 flex-1">
                            <AnimatePresence custom={direction}>
                                {showcaseSlides[activeIndex]?.type === "project" ? (
                                    <motion.div
                                        key={activeIndex}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0 flex select-none items-center justify-center md:cursor-grab md:active:cursor-grabbing"
                                        style={{ touchAction: "none" }}
                                        onPointerDown={handleSlidePointerDown}
                                        onPointerUp={handleSlidePointerEnd}
                                        onPointerCancel={resetPointerGesture}
                                        transition={{
                                            duration: 0.7,
                                            ease: slideEase,
                                        }}
                                    >
                                        <ProjectSlide project={showcaseSlides[activeIndex].project} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={activeIndex}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0 flex select-none items-center justify-center md:cursor-grab md:active:cursor-grabbing"
                                        style={{ touchAction: "none" }}
                                        onPointerDown={handleSlidePointerDown}
                                        onPointerUp={handleSlidePointerEnd}
                                        onPointerCancel={resetPointerGesture}
                                        transition={{
                                            duration: 0.7,
                                            ease: slideEase,
                                        }}
                                    >
                                        <ExploreMoreSlide />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── Scroll progress ──────────────────────────────────────── */}
                        <div className="mt-4 flex items-center gap-4">
                            <div className="relative h-px flex-1 overflow-hidden bg-border-soft">
                                <motion.div
                                    className="absolute inset-0 bg-accent origin-left"
                                    animate={{ scaleX: progressScale }}
                                    transition={{ duration: 0.45, ease: slideEase }}
                                />
                            </div>
                            <span className="text-[10px] font-medium text-caption shrink-0">
                                Scroll
                            </span>
                        </div>
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
                <motion.div
                    custom={0.04}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className="mb-4 flex flex-wrap items-center gap-3 md:mb-5"
                >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-caption">
                        {project.category}
                    </span>
                </motion.div>

                <motion.h3
                    custom={0.1}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className={`max-w-4xl ${titleSize} whitespace-normal break-words font-black leading-[0.92] tracking-normal text-foreground`}
                >
                    <span className="inline text-accent md:block">{leadTitle}</span>
                    {restTitle && (
                        <>
                            <span className="md:hidden"> </span>
                            <span className="outlined-text inline md:block md:text-balance">{restTitle}</span>
                        </>
                    )}
                </motion.h3>

                <motion.p
                    custom={0.16}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className="mt-5 max-w-2xl text-[clamp(1rem,1.55vw,1.2rem)] font-semibold leading-[1.6] text-foreground md:mt-6"
                >
                    {project.role}
                </motion.p>

                <motion.p
                    custom={0.22}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className="mt-3 max-w-2xl text-[clamp(0.94rem,1.25vw,1.04rem)] leading-[1.82] text-foreground-secondary md:mt-4"
                >
                    {project.shortVersion}
                </motion.p>

                <motion.div
                    custom={0.28}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className="mt-6 flex max-w-2xl flex-wrap items-center gap-x-3 gap-y-2 md:mt-8"
                >
                    {project.techStack.slice(0, 6).map((tech, index) => (
                        <span
                            key={tech}
                            className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-caption md:text-[11px]"
                        >
                            {index > 0 && <span className="h-px w-4 bg-border" aria-hidden="true" />}
                            {tech}
                        </span>
                    ))}
                </motion.div>

                {project.domains.length > 0 && (
                    <motion.div
                        custom={0.34}
                        initial="hidden"
                        animate="visible"
                        variants={contentRevealVariants}
                        className="mt-8 w-full"
                    >
                        <a
                            href={project.domains[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full justify-center h-13 items-center gap-2.5 rounded-full bg-accent px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-accent-hover md:w-auto"
                            aria-label={`Visit ${project.name}`}
                        >
                            Visit Project
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </motion.div>
                )}
            </div>

            <div className="relative order-1 h-[30vh] min-h-58 w-full md:order-2 md:h-full md:min-h-0">
                <div className="absolute inset-x-6 bottom-4 h-px bg-border-soft md:inset-x-10" aria-hidden="true" />
                <div className="absolute right-4 top-8 hidden h-28 w-px bg-border-soft md:block" aria-hidden="true" />
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={thumbnailRevealVariants}
                    className="relative h-full w-full"
                >
                    <Image
                        src={project.thumbnail}
                        alt={`${project.name} preview`}
                        fill
                        className="object-contain object-center drop-shadow-[0_28px_44px_rgba(15,23,42,0.22)]"
                        sizes="(max-width: 768px) 92vw, 44vw"
                    />
                </motion.div>
            </div>
        </article>
    );
}

function ExploreMoreSlide() {
    return (
        <article className="relative grid h-full w-full max-w-7xl overflow-hidden grid-rows-[minmax(0,1fr)_auto] items-center gap-4 py-2 md:grid-cols-[minmax(0,1.02fr)_minmax(300px,0.88fr)] md:grid-rows-1 md:gap-12 md:py-4">
            <div className="relative order-2 z-10 min-w-0 flex min-h-0 flex-col items-start justify-center md:order-1">

                <motion.h3
                    custom={0.1}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className="max-w-full mt-6 w-full whitespace-normal break-words text-[clamp(1.9rem,8.2vw,3.45rem)] font-black leading-[1.2] tracking-normal text-foreground md:mt-0 md:text-[clamp(3.9rem,5.7vw,5.85rem)]"
                >
                    <span className="inline text-accent mr-2  md:block">Explore</span>
                    <span className="outlined-text inline md:block md:text-balance">More Projects</span>
                </motion.h3>

                <motion.p
                    custom={0.16}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className="mt-5 w-full
                     max-w-full font-semibold
                     leading-[1.6] text-foreground md:mt-6 
                     whitespace-normal break-words"
                >
                    A broader selection of product, platform, and immersive work across AI,
                    Web3, infrastructure, and commerce.
                </motion.p>

                <motion.p
                    custom={0.22}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className="mt-3 w-full max-w-full
                    text-foreground-secondary 
                    md:mt-4 whitespace-normal break-words"
                >
                    Open the full archive to browse every case study, stack, and project
                    category in one place.
                </motion.p>

                <motion.div
                    custom={0.28}
                    initial="hidden"
                    animate="visible"
                    variants={contentRevealVariants}
                    className="mt-6 md:mt-8 w-full"
                >
                    <Link
                        href="/projects"
                        className="inline-flex w-full justify-center h-13 items-center gap-2.5 rounded-full bg-accent px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-accent-hover md:w-auto"
                    >
                        Explore More Projects
                        <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </motion.div>
            </div>

            <div className="relative order-1 min-w-0 h-[30vh] min-h-78 w-full md:order-2 md:h-[50vh] md:min-h-0">
                <div className="absolute inset-x-6 bottom-4 h-px bg-border-soft md:inset-x-10" aria-hidden="true" />
                <div className="absolute right-4 top-8 hidden h-28 w-px bg-border-soft md:block" aria-hidden="true" />
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={thumbnailRevealVariants}
                    className="relative flex h-full w-full items-center justify-center "
                >
                    <div className="relative flex h-full w-full  max-w-[34rem] items-center overflow-hidden px-4 py-5 md:px-5 md:py-6">
                        <div className="grid w-full gap-3 md:gap-4">
                            {marqueeRows.map((rowProjects, rowIndex) => {
                                const repeatedProjects = [...rowProjects, ...rowProjects];
                                const travelDistance = rowIndex % 2 === 0 ? "-50%" : "0%";
                                const startDistance = rowIndex % 2 === 0 ? "0%" : "-50%";

                                return (
                                    <div key={`marquee-row-${rowIndex}`}>
                                        <motion.div
                                            animate={{ x: [startDistance, travelDistance] }}
                                            transition={{
                                                duration: 18 + rowIndex * 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "linear",
                                            }}
                                            className="flex w-max gap-3 pr-3"
                                        >
                                            {repeatedProjects.map((project, projectIndex) => (
                                                <article
                                                    key={`${project.name}-${rowIndex}-${projectIndex}`}
                                                    className="flex h-48 w-88 shrink-0 flex-col overflow-hidden rounded-[0.5rem] border border-border bg-surface/30 p-5"
                                                >
                                                    <h2 className="line-clamp-2 break-words whitespace-normal text-lg font-black leading-tight text-foreground">
                                                        {project.name}
                                                    </h2>

                                                    <p className="mt-2 line-clamp-1 break-words whitespace-normal text-xs font-semibold text-foreground">
                                                        {project.role}
                                                    </p>

                                                    <p className="mt-3 line-clamp-3 break-words whitespace-normal text-xs leading-[1.8] text-foreground-secondary">
                                                        {project.shortVersion}
                                                    </p>

                                                    {project.domains[0] ? (
                                                        <a
                                                            href={project.domains[0]}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
                                                        >
                                                            Visit project
                                                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                                                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </a>
                                                    ) : null}
                                                </article>
                                            ))}
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </article>
    );
}
