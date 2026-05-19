import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center pt-14 px-6">
            {/* Hello badge */}
            <div className="relative inline-flex items-center border border-gray-300 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-800 text-sm font-medium">Hello!</span>
                {/* Sparkle */}
                <svg
                    className="absolute -top-3 -right-2 text-orange-500"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
                </svg>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-center leading-tight text-gray-900">
                I&apos;m <span className="text-orange-500">Mohammad,</span>
            </h1>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-center leading-tight text-gray-900 mb-0">
                Full-Stack Developer
            </h1>

            {/* Content row */}
            <div className="relative w-full max-w-6xl flex items-end justify-between">
                {/* Left stats */}
                <div className="flex flex-col gap-8 pb-20 w-52 shrink-0">
                    <div>
                        <span className="text-5xl font-serif text-gray-800 leading-none">&ldquo;</span>
                        <p className="text-gray-500 text-sm leading-relaxed mt-1">
                            Mohammad&apos;s exceptional development skills ensured our product&apos;s success. Highly recommended!
                        </p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-gray-900">50+</p>
                        <p className="text-gray-500 text-sm">Projects Delivered</p>
                    </div>
                </div>

                {/* Center: photo + orange circle + buttons */}
                <div className="relative flex flex-col items-center flex-1 mx-4">
                    {/* Orange semicircle background */}


                    {/* Photo — larger than the orange circle */}
                    <div className="relative w-72 md:w-80 lg:w-96 -mt-16" style={{ height: "650px" }}>
                        <Image
                            src="/me.png"
                            alt="Mohammad Mohammadi photo"
                            fill
                            sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                            className="object-cover object-top"
                        />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 -mt-6 relative z-10">
                        {/* Curved arrow decoration */}
                        <svg
                            className="absolute -left-12 bottom-2 text-gray-700"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                        >
                            <path
                                d="M5 10 Q20 5 30 25"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                            />
                            <path
                                d="M26 30 L30 25 L34 29"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white rounded-full px-7 py-3 font-semibold text-sm flex items-center gap-2 shadow-md">
                            Portfolio
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                            </svg>
                        </button>
                        <button className="border-2 border-gray-300 hover:border-gray-400 transition-colors text-gray-900 rounded-full px-7 py-3 font-semibold text-sm bg-white shadow-sm">
                            Hire Me
                        </button>
                    </div>
                </div>

                {/* Right stats */}
                <div className="flex flex-col gap-1 pb-20 w-52 shrink-0 items-end text-right">
                    <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#F97316">
                                <path d="M10 1l2.4 6.6H19l-5.4 4 2 6.5L10 14.3 4.4 18.1l2-6.5L1 7.6h6.6z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-tight">5 Years</p>
                    <p className="text-gray-500">Experience</p>
                    <hr className="w-full mt-3 border-gray-300" />
                </div>
            </div>
        </section>
    );
}
