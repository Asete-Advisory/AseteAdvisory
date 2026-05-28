import { ClientJourneyBoard } from "@/components/asete/client-journey-board";
import { SiteFooter } from "@/components/asete/site-footer";
import { SiteHeader } from "@/components/asete/site-header";

export default function JornadaPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <SiteHeader />
      <ClientJourneyBoard />
      <SiteFooter />
    </main>
  );
}
