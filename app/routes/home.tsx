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
    { title: "ACCRNOVA Safe Plus — AI Governance Platform" },
    { name: "description", content: "ACCRNOVA Safe Plus is AI governance infrastructure for law firms and financial services. Streaming Circuit Breaker, cryptographic audit trails, and dynamic pricing — in one platform." },
    { property: "og:title", content: "ACCRNOVA Safe Plus — AI Governance Platform" },
    { property: "og:description", content: "The compliance layer for your existing AI tools. Circuit Breaker, Audit Ledger, Pricing Engine." },
    { property: "og:image", content: "/og-image.png" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

export default function Home() {
  return (
    <div className="accrnova-root">
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
