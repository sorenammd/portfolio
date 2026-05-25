import AboutIdentity from "@/components/about-identity";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import ProjectsShowcase from "@/components/projects-showcase";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <main className="flex flex-1 w-full flex-col">
        <Hero />
        <AboutIdentity />
        <Experience />
        <ProjectsShowcase />
        <Contact />
      </main>
    </div>
  );
}
