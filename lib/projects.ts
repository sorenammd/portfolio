export const PROJECT_CATEGORIES = [
    "AI & Platform",
    "AI & Data",
    "AI & Agriculture",
    "AI & Infrastructure",
    "Marketplace & Web3",
    "Immersive & 3D",
    "Commerce & Mobile",
    "Real Estate & Lead Generation",
    "Web3 & FinTech",
    "FinTech & Trading",
    "Super App & Services",
    "Crypto & Dashboard",
    "Ecosystem & Platforms",
    "Restaurant Tech",
    "Marketing & Community",
    "Commerce & Gaming",
    "EdTech & AI",
    "Immersive AI & 3D",
    "Web3 & Finance",
    "Web3 & IP",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectUrl = `http://${string}` | `https://${string}`;
export type ProjectThumbnail = `/${string}`;

export const DEFAULT_PROJECT_THUMBNAIL = "/Macbook-Air-my.dgix.co.png" as const;

export interface Project {
    name: string;
    thumbnail: ProjectThumbnail;
    domains: ReadonlyArray<ProjectUrl>;
    category: ProjectCategory;
    role: string;
    productSummary: string;
    whatIDid: ReadonlyArray<string>;
    shortVersion: string;
    techStack: ReadonlyArray<string>;
}

export interface ProjectsDataset {
    uniqueProjectCount: number;
    notes: string;
    projects: ReadonlyArray<Project>;
}

export const projects: ReadonlyArray<Project> = [
    {
        name: "Sensifai",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://sensifai.com"],
        category: "AI & Platform",
        role: "Frontend and product engineer",
        productSummary:
            "Sensifai is a multilingual corporate and product platform for an AI, IoT, and Web3 company. The site combines marketing pages, marketplace experiences, portfolio case studies, news and playbook content, request-demo lead capture, and authenticated dashboard/admin flows, with strong SEO and secure integrations across auth, billing, email, and bot protection.",
        whatIDid: [
            "Expanded the multilingual experience across 14 locales and improved localized content and validation.",
            "Strengthened SEO with metadata, JSON-LD, sitemap generation, robots configuration, and an LLM-friendly content endpoint.",
            "Worked on authenticated dashboard and account-management features, including profile settings, session handling, password updates, passkey support, and verification flows using Logto.",
            "Implemented and refined admin features, marketplace customer registration, billing portal integrations, and production-readiness improvements.",
        ],
        shortVersion:
            "Contributed to Sensifai, a multilingual Next.js platform for an AI, IoT, and Web3 company, covering marketing pages, marketplace flows, portfolio content, and secure dashboard/admin experiences.",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind",
            "next-intl",
        ],
    },
    {
        name: "Insight",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://insight.sensifai.com"],
        category: "AI & Data",
        role: "Frontend engineer",
        productSummary:
            "Insight is an AI-powered supply chain intelligence web application that helps teams analyze supplier risk, monitor global disruptions, score supplier performance, and simulate sourcing scenarios in one dashboard.",
        whatIDid: [
            "Designed and developed the multi-page React application for supply chain risk and sourcing intelligence.",
            "Built the executive dashboard, supplier KPI views, risk exposure visualizations, and analysis summaries.",
            "Implemented AI-driven document analysis with OpenAI, conversational search, supplier scoring, scenario simulation, and persistent session storage using IndexedDB.",
        ],
        shortVersion:
            "Built an AI-powered supply chain intelligence platform using React, TypeScript, and OpenAI APIs, with dashboards, document analysis, supplier scoring, and scenario simulation.",
        techStack: [
            "TypeScript",
            "Vite",
            "Tailwind",
            "Radix UI",
            "OpenAI API",
            "IndexedDB",
        ],
    },
    {
        name: "PhotoGear",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://photogear.sensifai.com"],
        category: "AI & Agriculture",
        role: "Frontend and product engineer",
        productSummary:
            "PhotoGear is a modern web experience for a precision agriculture platform that turns drone imagery into actionable farm intelligence through AWS-powered photogrammetry and NDVI processing.",
        whatIDid: [
            "Designed and developed the frontend experience with a polished landing page, responsive sections, and conversion-focused calls to action.",
            "Built reusable UI components and interactive product showcases such as the NDVI before/after comparison slider and dashboard preview carousel.",
            "Created dataset and processing views, a mock admin interface, and production-ready branding elements including typography, metadata, favicon assets, and web manifest support.",
        ],
        shortVersion:
            "Built a responsive marketing website and interactive product showcase for PhotoGear, a precision agriculture platform for drone-based NDVI and photogrammetry processing.",
        techStack: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
        name: "Smart Crawler",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: [],
        category: "AI & Infrastructure",
        role: "Backend and AI systems engineer",
        productSummary:
            "Smart Crawler is an autonomous, AI-assisted web crawling and information extraction system for topic-driven crawling and structured entity extraction. It uses an LLM to decide which pages are relevant, what to extract, and which links to follow next, while enforcing validation and quality gates.",
        whatIDid: [
            "Designed and implemented the AI-powered crawling pipeline that combines traditional crawling with LLM-based reasoning.",
            "Built a dual-loop worker architecture for crawl execution and AI processing, with validation layers that treat LLM output as advisory rather than authoritative.",
            "Implemented robots.txt compliance, sitemap discovery, domain scope enforcement, URL normalization, deduplication, pagination guards, entity storage, REST APIs, search, and BDD-style tests.",
        ],
        shortVersion:
            "Built an AI-powered, topic-driven web crawler in NestJS and TypeScript with validation gates, search, and background workers.",
        techStack: [
            "NestJS",
            "TypeScript",
            "PostgreSQL",
            "TypeORM",
            "Meilisearch",
            "Ollama",
            "Crawl4AI"
        ],
    },
    {
        name: "Artogenia",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://artogenia.com"],
        category: "Marketplace & Web3",
        role: "Frontend lead and product engineer",
        productSummary:
            "Artogenia is a Web3-enabled digital art marketplace connecting artists, galleries, and collectors in one platform. It supports artwork discovery, artist profiles, gallery and contest pages, product detail flows, wallet and payment features, NFT-related experiences, and search across multiple art categories.",
        whatIDid: [
            "Built and maintained the frontend of a large-scale art marketplace using Next.js, React, TypeScript, and Redux Toolkit.",
            "Implemented core marketplace flows such as artwork discovery, product pages, artist profiles, wallet/payment-related pages, contests, and gallery experiences.",
            "Improved SEO, structured data, Open Graph metadata, web manifest support, and production deployment with standalone Next.js output, Docker, and Nginx.",
        ],
        shortVersion:
            "Built and maintained Artogenia, a Web3 art marketplace for artists, galleries, and collectors, with marketplace flows, SEO, and production deployment.",
        techStack: ["Next.js", "TypeScript", "Web3"],
    },
    {
        name: "3D Gallery",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://3d-gallery.artogenia.com"],
        category: "Immersive & 3D",
        role: "3D frontend engineer",
        productSummary:
            "A browser-based 3D virtual gallery that lets users explore a digital exhibition space in real time. The experience uses a museum-like environment, first-person navigation, focused lighting, and device-specific interaction patterns for desktop and mobile users.",
        whatIDid: [
            "Built the 3D gallery experience with React, TypeScript, Three.js, React Three Fiber, and Drei.",
            "Integrated a GLTF-based 3D environment, artwork panels, first-person movement, pointer-lock controls, and mobile touch interaction.",
            "Added movement boundaries, spotlight lighting, loading progress feedback, artwork metadata panels, and supporting UI layers for a smoother experience.",
        ],
        shortVersion:
            "Designed and developed an interactive 3D art gallery for the web using React, TypeScript, Three.js, and React Three Fiber.",
        techStack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Drei"],
    },
    {
        name: "COC Game",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://cocgame.net"],
        category: "Commerce & Mobile",
        role: "Frontend engineer",
        productSummary:
            "COC Game is a Persian-language gaming e-commerce platform focused on selling Call of Duty Mobile CP and other digital gaming products. The platform includes marketplace pages, product detail flows, shopping cart and checkout, dashboard sections, wallet top-up, referral features, gaming blog content, and Android delivery support.",
        whatIDid: [
            "Built and maintained the frontend architecture using Next.js App Router, React, TypeScript, and Redux Toolkit.",
            "Developed marketplace, category, product, cart, dashboard, wallet, referral, and content-driven flows.",
            "Improved technical SEO, performance, Android packaging with Capacitor, deep-linking, and payment redirection for mobile behavior.",
        ],
        shortVersion:
            "Built a gaming e-commerce frontend with Next.js, React, TypeScript, Redux Toolkit, and Capacitor for Android.",
        techStack: [
            "Next.js",
            "React",
            "TypeScript"
        ],
    },
    {
        name: "Investment Vista",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://investmentvista.com"],
        category: "Real Estate & Lead Generation",
        role: "Frontend engineer",
        productSummary:
            "InvestmentVista is a premium real estate development website built to showcase residential and mixed-use projects, highlight investment opportunities, and generate qualified leads.",
        whatIDid: [
            "Designed and developed a responsive multi-page real estate website focused on investor-facing presentation.",
            "Built dynamic project pages, animated galleries, metrics, video hero sections, and other motion-driven UI elements.",
            "Created the contact workflow end-to-end, including form validation, email delivery, rate limiting, and CAPTCHA verification.",
        ],
        shortVersion:
            "Built a premium real estate development website with dynamic project pages, media galleries, motion-driven UI, and a secure contact system.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
        name: "FairWin",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://fairwin.online"],
        category: "Web3 & FinTech",
        role: "Full-stack and smart contract engineer",
        productSummary:
            "FairWin is a full-stack decentralized lottery platform that combines a modern web application with a custom backend and on-chain smart contract system. It uses blockchain-based wallet authentication, NFT lottery tickets, verifiable randomness, and admin tools for transparent, trustless lottery operations.",
        whatIDid: [
            "Designed and built the entire platform as a solo developer across frontend, backend, and smart contracts.",
            "Implemented wallet-based authentication, user and admin dashboards, lottery and ticket workflows, notifications, and blockchain event synchronization.",
            "Built Solidity contracts for lottery lifecycle management, NFT ticket minting, Chainlink VRF-based random winner selection, and Aave-based staking logic.",
        ],
        shortVersion:
            "Built FairWin end-to-end as a decentralized lottery platform with wallet auth, NFT tickets, Chainlink VRF, and admin tooling.",
        techStack: [
            "Next.js",
            "TypeScript",
            "Express.js",
            "MongoDB",
            "Solidity"
        ],
    },
    {
        name: "DGIX Ecosystem",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://dgix.app", "https://my.dgix.co", "https://dgixprop.co"],
        category: "Ecosystem & Platforms",
        role: "Full-stack, frontend, and UX engineer",
        productSummary:
            "DGIX Ecosystem is a connected family of digital products spanning a Persian-first super app, a cryptocurrency exchange frontend, and a prop trading platform. Together they cover service workflows, dashboard-heavy trading experiences, multi-phase funded-account journeys, payments, support operations, and localized product UX across a shared brand ecosystem.",
        whatIDid: [
            "Led frontend and backend implementation across the DGIX product family, covering architecture, API integration, dashboard UX, and business-critical workflows.",
            "Built OTP authentication, trader onboarding, challenge progression, funded account logic, withdrawal flows, support ticketing, and MT4-driven trading workflows for the prop platform.",
            "Developed the Persian-first super app experience with modular service flows for booking, verification, payments, RTL behavior, Jalali date handling, and improved mobile usability.",
            "Implemented exchange dashboard modules such as portfolio and market views, quick actions, live widgets, and polished interaction design with motion-rich UI patterns.",
        ],
        shortVersion:
            "Built core parts of the DGIX ecosystem across exchange, super app, and prop trading products, covering full-stack trading flows, localized service UX, and dashboard-driven product experiences.",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "Express",
            "MongoDB",
            "GSAP",
        ],
    },
    {
        name: "Menudi",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://demo-menudi.vercel.app"],
        category: "Restaurant Tech",
        role: "Full-stack engineer",
        productSummary:
            "Menudi is a full-stack digital menu platform for cafes and restaurants. It lets each business manage its brand profile, menu categories, products, media assets, and a QR-based storefront, while customers can browse menus and view store details.",
        whatIDid: [
            "Designed and developed the frontend and backend end-to-end.",
            "Implemented customer-facing menu browsing, store info pages, QR-based access, and store-owner/admin dashboards.",
            "Built authentication, route protection, API integration, state management, image upload handling, QR code generation, and role-based access control.",
        ],
        shortVersion:
            "Built a full-stack digital menu platform for cafes and restaurants with customer, store-owner, and admin experiences.",
        techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    },
    {
        name: "Aerium",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://aerium.network"],
        category: "Marketing & Community",
        role: "Core team member",
        productSummary:
            "Aerium is an open-source platform for collaborative decision-making, on-chain governance, and community-driven consensus. I joined as a core team member, helping shape the product, codebase, and public presence from the ground up.",
        whatIDid: [
            "Joined as a core team member of the open-source Aerium project, taking ownership of the web presence and contributing to technical and product decisions.",
            "Designed and built a responsive one-page marketing site with modular sections — Header, Hero, About, Features, Roadmap, and Footer — aligned with the platform's governance-first identity.",
            "Enriched the visual experience through brand assets, custom SVGs, and background video integration.",
            "Owned the full delivery pipeline: static export, GitHub Pages hosting, SEO metadata, favicon assets, and automated GitHub Actions CI/CD workflows.",
        ],
        shortVersion:
            "Core team member of the open-source Aerium project. Built and shipped the marketing site with modular sections, motion-driven visuals and SEO.",
        techStack: ["Next.js 16", "TypeScript", "Tailwind"],
    },
    {
        name: "Khodesadi",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://khodesadi.com"],
        category: "Commerce & Gaming",
        role: "Frontend engineer",
        productSummary:
            "Khodesadi is a gaming-focused e-commerce platform built for selling in-game products such as Call of Duty Mobile CP. The platform includes a marketplace, category pages, customer feedback, blog content, authentication, shopping cart, dashboard sections, and mobile-friendly experiences.",
        whatIDid: [
            "Worked on the frontend architecture using Next.js App Router, React, TypeScript, and Redux Toolkit.",
            "Built responsive pages for marketplace browsing, product discovery, category filtering, customer feedback, cart, and account-related flows.",
            "Improved technical SEO, performance, lazy loading, route-level code splitting, and Android delivery using Capacitor.",
        ],
        shortVersion:
            "Built a high-performance gaming e-commerce frontend with marketplace flows, SEO, performance optimization, and Android app packaging.",
        techStack: [
            "Next.js",
            "TypeScript",
        ],
    },
    {
        name: "Tutorist",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://sensifai.com/en/portfolio/tutorist"],
        category: "EdTech & AI",
        role: "Product and frontend engineer",
        productSummary:
            "Tutorist is an AI-powered education platform designed to create lifelike virtual teacher twins that can deliver multilingual lessons in an interactive and engaging way.",
        whatIDid: [
            "Worked on the product experience and technical implementation across the web and interactive layers.",
            "Contributed to the Next.js and TypeScript frontend and integrated platform workflows with the AI-driven education experience.",
            "Supported the Unity-based interactive environment to keep the user journey smooth between content delivery and real-time avatar interaction.",
        ],
        shortVersion:
            "Built an AI education platform with Unity and Next.js, contributing to the frontend, platform workflows, and teacher-avatar experience.",
        techStack: ["Unity", "Next.js 16", "TypeScript"],
    },
    {
        name: "Senso3D",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://sensifai.com/en/portfolio/senso3d"],
        category: "Immersive AI & 3D",
        role: "Frontend and Unity integrator",
        productSummary:
            "Senso3D is a platform for AI-assisted 2D-to-3D scene creation that transforms prompts and visual references into interactive 3D environments for gaming, AR/VR, architecture, and digital product visualization.",
        whatIDid: [
            "Contributed to the web platform and interactive 3D experience by working on the Next.js frontend and the Unity-powered visualization layer.",
            "Connected the user-facing web experience with the real-time 3D environment and improved usability across the workflow.",
            "Helped deliver a seamless path from content generation to interactive preview.",
        ],
        shortVersion:
            "Developed parts of an AI-powered 2D-to-3D platform, working on the Next.js frontend and Unity-based real-time scene experience.",
        techStack: ["Unity", "Next.js 16", "TypeScript"],
    },
    {
        name: "SensiLend",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://sensifai.com/en/portfolio/sensilend"],
        category: "Web3 & Finance",
        role: "Frontend engineer",
        productSummary:
            "SensiLend is a digital lending and financial services platform designed to streamline access to blockchain-enabled financial workflows with a modern web-based product experience.",
        whatIDid: [
            "Built and improved the React 18 frontend, focusing on user flows, application structure, and responsive product interfaces.",
            "Integrated Web3-related functionality into the user experience to connect wallet-enabled interactions with blockchain-based processes.",
            "Helped make the lending workflow clear and usable for end users.",
        ],
        shortVersion:
            "Built the React 18 frontend for a Web3 lending platform, integrating blockchain workflows into a clean product experience.",
        techStack: ["Web3", "React 18"],
    },
    {
        name: "IP Captain",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://ip-captain.com"],
        category: "Web3 & IP",
        role: "Frontend engineer",
        productSummary:
            "IPCaptain is a Web3-based platform focused on intellectual property and digital asset management, bringing ownership, protection, and digital rights workflows into a blockchain-enabled environment.",
        whatIDid: [
            "Worked on the React 18 frontend and contributed to the product implementation of the Web3 user experience.",
            "Built interface components and improved platform usability for ownership and rights workflows.",
            "Integrated blockchain-related interactions so users could manage digital ownership more effectively.",
        ],
        shortVersion:
            "Developed the React 18 frontend for a Web3 intellectual property platform, connecting blockchain interactions with practical product workflows.",
        techStack: ["Web3", "React 18"],
    },
    {
        name: "IPMinter",
        thumbnail: DEFAULT_PROJECT_THUMBNAIL,
        domains: ["https://sensifai.com/en/portfolio/ipminter"],
        category: "Web3 & IP",
        role: "Frontend engineer",
        productSummary:
            "IPMinter is a Web3 platform for converting intellectual property assets into blockchain-based digital records and tokenized assets.",
        whatIDid: [
            "Contributed to the React 18 frontend and helped shape the user-facing product experience for minting and managing tokenized IP assets.",
            "Built frontend flows that connect Web3 interactions to the application interface.",
            "Improved the usability of blockchain-based minting and ownership management features.",
        ],
        shortVersion:
            "Built frontend features for a Web3 IP minting platform in React 18, helping turn tokenization and ownership workflows into a usable product experience.",
        techStack: ["Web3", "React 18"],
    },
];

export const projectsData: ProjectsDataset = {
    uniqueProjectCount: projects.length,
    notes:
        "DGIX Exchange, Super App, and Prop were consolidated into a single ecosystem entry. This list is based on the project descriptions shared in this chat.",
    projects,
};

export const projectCount = projectsData.uniqueProjectCount;
export const projectCategories = Array.from(new Set(projects.map((project) => project.category)));
export const projectNames = projects.map((project) => project.name);

export function getProjectsByCategory(category: ProjectCategory) {
    return projects.filter((project) => project.category === category);
}

export function getProjectByName(name: string) {
    return projects.find((project) => project.name.toLowerCase() === name.trim().toLowerCase());
}
