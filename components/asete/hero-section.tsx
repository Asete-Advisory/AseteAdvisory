import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate min-h-screen w-full overflow-hidden"
    >
      <Image
        src="/images/asete-predio.jpeg"
        alt="Predio da Asete"
        fill
        priority
        className="object-cover"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-primary/70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary/95"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-36 lg:px-10 lg:pb-36 lg:pt-36">
        <div className="mb-10 flex items-center gap-4 text-primary-foreground/70">
          <span className="h-px w-12 bg-accent" aria-hidden="true" />
          <span className="text-[11px] tracking-[0.4em] uppercase">
            Consultoria Patrimonial
          </span>
        </div>

        <h1 className="font-serif text-balance text-primary-foreground text-5xl font-light leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Clareza, proteção
          <br className="hidden sm:block" /> e{" "}
          <em className="italic font-light text-accent">construção</em>
          <br className="hidden sm:block" /> patrimonial.
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Soluções completas para empresários e investidores que buscam
            segurança, performance e visão consolidada de longo prazo.
          </p>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#pilares"
              className="group inline-flex items-center gap-3 whitespace-nowrap bg-primary-foreground px-7 py-4 text-xs tracking-[0.14em] uppercase text-primary transition-colors hover:bg-accent hover:text-accent-foreground sm:tracking-[0.2em]"
            >
              Conheça nossos pilares
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Footer rail */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-primary-foreground/15 pt-8 text-[11px] tracking-[0.3em] uppercase text-primary-foreground/60">
          <span>Pilares CIISC</span>
          <div className="hidden md:flex items-center gap-8">
            <span>Consultoria</span>
            <span>Investimentos</span>
            <span>Imóveis</span>
            <span>Seguros</span>
            <span>Consórcios</span>
          </div>
        </div>
      </div>
    </section>
  );
}
