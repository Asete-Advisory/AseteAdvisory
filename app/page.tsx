import { SiteHeader } from "@/components/asete/site-header";
import { HeroSection } from "@/components/asete/hero-section";
import { AboutSection } from "@/components/asete/about-section";
import { EcosystemSection } from "@/components/asete/ecosystem-section";
import { ProcessSection } from "@/components/asete/process-section";
import { ClientProfileSection } from "@/components/asete/client-profile-section";
import { DifferentialsSection } from "@/components/asete/differentials-section";
import { CtaSection } from "@/components/asete/cta-section";
import { SiteFooter } from "@/components/asete/site-footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <EcosystemSection />
      <ProcessSection />
      <ClientProfileSection />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
