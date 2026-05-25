"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const revealUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.75, delay, ease },
});

const revealIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay, ease: "easeOut" as const },
});

const links = [
    {
        label: "Telegram",
        handle: "@mohammadi_hq",
        href: "https://t.me/mohammadi_hq",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0Zm4.97 7.43-1.88 9.08c-.14.65-.52.8-1.04.5l-2.9-2.19-1.39 1.37c-.15.16-.28.29-.58.29l.2-2.99 5.32-4.93c.23-.21-.05-.33-.36-.12L7.6 13.35l-2.85-.9c-.62-.2-.63-.63.13-.94l11.14-4.39c.51-.19.96.13.79.93Z" />
            </svg>
        ),
        color: "text-[#229ED9]",
        bg: "hover:bg-[#229ED9]/8 dark:hover:bg-[#229ED9]/10",
        border: "hover:border-[#229ED9]/30",
    },
    {
        label: "LinkedIn",
        handle: "im-mohammadi",
        href: "https://www.linkedin.com/in/im-mohammadi",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.106v1.561h.046c.434-.82 1.494-1.684 3.075-1.684 3.289 0 3.896 2.165 3.896 4.981v6.594h-.661ZM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm1.554 13.019H3.78V9h3.111v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0Z" />
            </svg>
        ),
        color: "text-[#0A66C2]",
        bg: "hover:bg-[#0A66C2]/8 dark:hover:bg-[#0A66C2]/10",
        border: "hover:border-[#0A66C2]/30",
    },
    {
        label: "GitHub",
        handle: "sorenammd",
        href: "https://github.com/sorenammd",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.579 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12Z" />
            </svg>
        ),
        color: "text-foreground",
        bg: "hover:bg-foreground/5 dark:hover:bg-foreground/8",
        border: "hover:border-foreground/20",
    },
    {
        label: "F6S",
        handle: "mohammad-mohammadi",
        href: "https://www.f6s.com/mohammad-mohammadi",
        icon: (
            <Image
                src="/f6s-logo.png"
                alt="F6S"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
            />
        ),
        color: "text-[#E8472A]",
        bg: "hover:bg-[#E8472A]/8 dark:hover:bg-[#E8472A]/10",
        border: "hover:border-[#E8472A]/30",
    },
];

export default function Contact() {
    return (
        <section

            className="relative w-full bg-background -mt-20 md:-mt-5 px-5 pb-30 text-foreground md:px-8"
        >
            <div className="relative mx-auto max-w-7xl">


                {/* ── Heading ───────────────────────────────────────────────── */}
                <motion.div
                    {...revealUp(0.05)}
                    className="mb-12 text-center md:mb-16"
                >
                    <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black leading-[1.1] tracking-tight text-foreground">
                        Let&apos;s build something
                        <span className="block text-accent">worth shipping.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-[1.8] text-foreground-secondary md:text-[0.95rem]">
                        Open to collaborations, new roles, or just a good conversation.
                        Reach out through any of the channels below.
                    </p>
                </motion.div>

                {/* ── Link cards ────────────────────────────────────────────── */}
                <motion.div
                    {...revealUp(0.12)}
                    id="contact"
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2"
                >
                    {links.map((item, i) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: 0.08 + i * 0.07, ease }}
                            className={`group flex items-center gap-4 rounded-2xl border border-border bg-surface/20 px-5 py-4 transition-all duration-200 ${item.bg} ${item.border}`}
                        >
                            <span className={`shrink-0 transition-colors duration-200 ${item.color}`}>
                                {item.icon}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                                <p className="truncate text-xs text-caption">{item.handle}</p>
                            </div>
                            <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                className="h-3.5 w-3.5 shrink-0 text-caption opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
                                aria-hidden="true"
                            >
                                <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.a>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
