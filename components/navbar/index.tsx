"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll } from "framer-motion";
import { Briefcase, Home, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavMenu } from "./nav-menu";

const mobileNavLinks = [
    { id: 1, name: "Home", href: "/" as const, icon: Home },
    { id: 2, name: "Work", href: "/work" as const, icon: Briefcase },
    { id: 3, name: "Contact", href: "/contact" as const, icon: Mail },
];

const INITIAL_WIDTH = "70rem";
const MAX_WIDTH = "800px";

export function Navbar() {
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setHasScrolled(latest > 10);
        });
        return unsubscribe;
    }, [scrollY]);

    const { resolvedTheme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

    return (
        <>
            {/* Desktop top navbar */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "hidden md:flex fixed z-100 left-0 right-0 justify-center px-4",
                    hasScrolled ? "top-6" : "top-4",
                )}
                style={{ transition: "top 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}
                dir="ltr"
            >
                <div
                    className="w-full"
                    style={{
                        maxWidth: hasScrolled ? MAX_WIDTH : INITIAL_WIDTH,
                        transition: "max-width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                >
                    <div
                        className={cn(
                            "mx-auto max-w-7xl rounded-2xl transition-[padding,border-color,background-color,backdrop-filter] duration-300 xl:px-0",
                            hasScrolled
                                ? "px-2 border border-border backdrop-blur-lg bg-background/75"
                                : "shadow-none px-7",
                        )}
                    >
                        <div className="flex h-14 items-center justify-between p-4">
                            <Link href="/" className="flex items-center gap-2 shrink-0">
                                <span className="text-lg font-semibold tracking-tight text-foreground">
                                    20m.
                                </span>
                            </Link>

                            <NavMenu />

                            <div className="flex flex-row items-center gap-3 shrink-0">
                                <button
                                    onClick={toggleTheme}
                                    className="border border-border size-8 rounded-md cursor-pointer flex items-center justify-center hover:bg-foreground/5 transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    <Sun className="size-4 dark:hidden" />
                                    <Moon className="size-4 hidden dark:block" />
                                </button>
                                <Link
                                    href="/contact"
                                    className="h-8 flex items-center justify-center text-sm font-medium tracking-wide rounded-full bg-foreground text-background px-4 hover:opacity-85 transition-opacity active:scale-95"
                                >
                                    Hire me
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile bottom navbar */}
            <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-100"
                dir="ltr"
            >
                <div className="flex items-center gap-1 rounded-full border border-border bg-background/90 backdrop-blur-lg px-2 py-2 shadow-lg">
                    {mobileNavLinks.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-full text-[10px] font-medium transition-colors",
                                    isActive
                                        ? "bg-foreground/8 text-foreground"
                                        : "text-foreground/45 hover:text-foreground",
                                )}
                            >
                                <Icon className="size-5" strokeWidth={isActive ? 2.2 : 1.6} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                    <div className="w-px h-6 bg-border mx-1" />
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center size-10 rounded-full text-foreground/45 hover:text-foreground transition-colors"
                        aria-label="Toggle theme"
                    >
                        <Sun className="size-5 dark:hidden" strokeWidth={1.6} />
                        <Moon className="size-5 hidden dark:block" strokeWidth={1.6} />
                    </button>
                </div>
            </motion.nav>
        </>
    );
}
