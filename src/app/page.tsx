import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import Architecture3D from "@/components/marketing/Architecture3D";
import VerticalArchitectureFlow from "@/components/marketing/VerticalArchitectureFlow";
import QuickStart from "@/components/marketing/QuickStart";
import FAQ from "@/components/marketing/FAQ";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <VerticalArchitectureFlow />
      <Architecture3D />
      <QuickStart />
      <FAQ />
    </div>
  );
}


