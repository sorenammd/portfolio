"use client";

import { motion } from "framer-motion";

const revealUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
});

const revealIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay, ease: "easeOut" as const },
});

const cards = [
    {
        index: "01",
        label: "Clarity before speed.",
        body: "Clear thinking before fast shipping — always. Ambiguity compounds into debt.",
    },
    {
        index: "02",
        label: "Own the outcome.",
        body: "From first design decision to last deploy. No handoff mentality.",
    },
    {
        index: "03",
        label: "Speed through taste.",
        body: "Moving fast compounds value only when direction is precise.",
    },
];

export default function AboutIdentity() {
    return (
        <section
            id="about"
            className="relative w-full bg-background px-5 pb-24 text-foreground md:px-8 md:pb-36"
        >
            <div className="relative mx-auto max-w-7xl">

                {/* ── Section label ─────────────────────────────────────────── */}
                <motion.div
                    {...revealIn(0)}
                    className="mb-14 flex items-center gap-5 md:mb-20"
                >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-caption">
                        Identity
                    </span>
                    <motion.span
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px flex-1 bg-border origin-left"
                        style={{ display: "block" }}
                    />
                </motion.div>

                {/* ── Two-column: Text left / Cards right ───────────────────── */}
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

                    {/* Left — Headline + Description */}
                    <motion.div {...revealUp(0.08)} className="flex flex-col gap-6">
                        <h2 className="text-[clamp(1.6rem,2.8vw,2.25rem)] font-bold leading-[1.15] tracking-tight text-foreground">
                            Where product thinking
                            <br />
                            <span className="text-accent">meets execution speed.</span>
                        </h2>

                        <p className="text-[clamp(1rem,1.4vw,1.0625rem)] font-semibold leading-[1.65] text-foreground">
                            I don&apos;t just write code. I think in systems,
                            move in products, and build for the long run.
                        </p>

                        <p className="text-[clamp(0.9375rem,1.2vw,1rem)] font-normal leading-[1.85] text-foreground-secondary">
                            Five years at the intersection of engineering precision and startup
                            urgency. Full-stack by necessity, product-focused by choice — with a
                            strong bias toward decisions that compound.
                        </p>
                    </motion.div>

                    {/* Right — Cards stacked vertically */}
                    <motion.div
                        {...revealUp(0.16)}
                        className="flex flex-col justify-between gap-3"
                    >
                        {cards.map((item) => (
                            <div
                                key={item.index}
                                className="rounded-2xl border border-border bg-surface/20 px-5 py-5 transition-colors duration-200 hover:bg-surface/40"
                            >
                                <span className="font-mono text-[11px] font-semibold text-caption/40">
                                    {item.index}
                                </span>
                                <p className="mt-1.5 text-sm font-semibold text-foreground">
                                    {item.label}
                                </p>
                                <p className="mt-1.5 text-sm leading-[1.7] text-foreground-secondary">
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
