"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const navLinks = [
    { id: 1, name: "Home", href: "/" as const },
    { id: 2, name: "Work", href: "/work" as const },
    { id: 3, name: "Contact", href: "/contact" as const },
];

export function NavMenu() {
    const pathname = usePathname();
    const ref = useRef<HTMLUListElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [isReady, setIsReady] = useState(false);

    const updateIndicator = (activeHref: string) => {
        const activeItem = ref.current?.querySelector(
            `[data-href="${activeHref}"]`,
        ) as HTMLElement | null;
        if (activeItem) {
            setIndicatorStyle({
                left: activeItem.offsetLeft,
                width: activeItem.offsetWidth,
            });
            setIsReady(true);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => updateIndicator(pathname), 50);
        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <div className="w-full hidden md:block">
            <ul
                className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center"
                ref={ref}
            >
                {navLinks.map((item) => (
                    <li
                        key={item.id}
                        data-href={item.href}
                        className={cn(
                            "z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 tracking-tight",
                            pathname === item.href
                                ? "text-foreground"
                                : "text-foreground/50 hover:text-foreground",
                        )}
                    >
                        <Link href={item.href}>{item.name}</Link>
                    </li>
                ))}
                {isReady && (
                    <motion.li
                        animate={indicatorStyle}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 my-1.5 rounded-full bg-foreground/5 border border-border pointer-events-none"
                    />
                )}
            </ul>
        </div>
    );
}
