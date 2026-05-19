import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely, resolving conflicts via tailwind-merge
 * and handling conditional classes via clsx.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a Date using Intl.DateTimeFormat. Falls back to "en" locale if the
 * provided locale is unsupported or throws.
 */
export function safeFormatDate(locale: string, date: Date, options: Intl.DateTimeFormatOptions): string {
    try {
        return new Intl.DateTimeFormat(locale, options).format(date);
    } catch {
        return new Intl.DateTimeFormat("en", options).format(date);
    }
}
