import AboutIdentity from "@/components/about-identity";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <main className="flex flex-1 w-full flex-col">
        <Hero />
        <AboutIdentity />
      </main>
    </div>
  );
}
