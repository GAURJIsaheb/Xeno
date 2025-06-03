import { buttonVariants } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}