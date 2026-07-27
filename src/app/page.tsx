import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import QuickStart from "@/components/marketing/QuickStart";
import FAQ from "@/components/marketing/FAQ";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <QuickStart />
      <FAQ />
    </div>
  );
}
