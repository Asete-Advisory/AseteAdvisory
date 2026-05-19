import Image from "next/image";
import { ClientJourneyModal } from "@/components/asete/client-journey-modal";

export function CtaSection() {
  return (
    <section id="contato" className="relative isolate overflow-hidden">
      <Image
        src="/images/cta-architecture.jpg"
        alt="Detalhe arquitetônico institucional"
        fill
        priority
        loading="eager"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/85" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-10 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center gap-4 text-primary-foreground/60">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.4em] uppercase">
                Próximo Passo
              </span>
            </div>
            <h2 className="font-serif text-balance text-4xl font-light leading-[1.05] text-primary-foreground sm:text-5xl lg:text-7xl">
              Vamos organizar seu patrimônio de forma mais{" "}
              <em className="italic text-accent">sólida e consciente</em>?
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
              Agende uma conversa reservada com nossos especialistas. Sem
              compromisso e sem fórmulas prontas, com uma análise honesta
              sobre como podemos contribuir.
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <ClientJourneyModal />
          </div>
        </div>
      </div>
    </section>
  );
}
