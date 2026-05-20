import { AxiomNav, HeroSection } from "~/components/HeroSection";
import { ProblemSection } from "~/components/ProblemSection";
import { ProductSection } from "~/components/ProductSection";
import { DemoSection } from "~/components/DemoSection";
import { ProofSection } from "~/components/ProofSection";
import { PricingSection } from "~/components/PricingSection";
import { WaitlistSection } from "~/components/WaitlistSection";
import { FooterSection } from "~/components/FooterSection";

export function meta() {
  return [
    { title: "Axiom — AI Governance for Professional Services" },
    { name: "description", content: "Axiom is AI governance infrastructure for law firms and financial services. Streaming Circuit Breaker, cryptographic audit trails, and dynamic pricing — in one platform." },
    { property: "og:title", content: "Axiom — AI Governance for Professional Services" },
    { property: "og:description", content: "The compliance layer for your existing AI tools. Circuit Breaker, Audit Ledger, Pricing Engine." },
    { property: "og:image", content: "/og-image.png" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

export default function Home() {
  return (
    <div className="axiom-root">
      <AxiomNav />
      <HeroSection />
      <ProblemSection />
      <ProductSection />
      <DemoSection />
      <ProofSection />
      <PricingSection />
      <WaitlistSection />
      <FooterSection />
    </div>
  );
}
