import { Hero } from "@/components/marketing/hero";
import { Stats } from "@/components/marketing/stats";
import { Features } from "@/components/marketing/features";
import { ModelShowcase } from "@/components/marketing/model-showcase";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <ModelShowcase />
      <CTA />
    </>
  );
}
