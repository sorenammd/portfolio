import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      <main className="flex flex-1 w-full flex-col">
        <Hero />
      </main>
    </div>
  );
}
