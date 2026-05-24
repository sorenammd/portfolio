import { projects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-background px-5 pb-20 pt-5 text-foreground md:px-8 md:pb-24 md:pt-28">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-6 rounded-[2rem]   backdrop-blur-xl md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-caption">
                            Projects
                        </div>
                        <h1 className="mt-4 text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.92] tracking-tight text-foreground">
                            Full project <span className="text-accent">archive.</span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-[1.8] text-foreground-secondary">
                            A complete list of selected work across product engineering, AI systems, immersive experiences, commerce, and Web3.
                        </p>
                    </div>

                    <Link
                        href="/#projects"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-semibold text-accent transition-colors duration-200 hover:bg-surface/80"
                    >
                        Back to home
                    </Link>
                </div>

                <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                        <article
                            key={project.name}
                            className="overflow-hidden flex flex-col rounded-[1.1rem] border border-border bg-surface/30 transition-colors duration-200 hover:bg-surface/50"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-68 w-full overflow-hidden">
                                <Image
                                    src={project.thumbnail}
                                    alt={project.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                />
                                {/* Glassmorphism tags overlay */}
                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-4 py-3">
                                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <h2 className="text-2xl font-black leading-tight text-foreground">
                                    {project.name}
                                </h2>

                                <p className="mt-3 text-sm font-semibold text-foreground">
                                    {project.role}
                                </p>

                                <p className="mt-4 mb-4 text-sm leading-[1.8] text-foreground-secondary">
                                    {project.shortVersion}
                                </p>

                                {/* Tech stack + link always at bottom */}
                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full border border-border bg-surface/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-caption"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {project.domains[0] ? (
                                        <a
                                            href={project.domains[0]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
                                        >
                                            Visit project
                                            <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}