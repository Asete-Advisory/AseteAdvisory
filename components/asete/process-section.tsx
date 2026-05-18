import Image from "next/image"

const STEPS = [
  {
    title: "Diagnóstico",
    image: "/images/asete-reuniao.jpg",
    alt: "Reunião consultiva para diagnóstico patrimonial",
    description:
      "Imersão profunda no patrimônio, nos objetivos e nos riscos. Entendemos antes de propor.",
  },
  {
    title: "Estruturação",
    image: "/images/asete-predio.jpeg",
    alt: "Arquitetura corporativa representando estrutura patrimonial",
    description:
      "Organização patrimonial desenvolvida de forma integrada entre as áreas do CIISC.",
  },
  {
    title: "Acompanhamento",
    image: "/images/cta-architecture.jpg",
    alt: "Estrutura institucional representando acompanhamento estratégico",
    description:
      "Reuniões periódicas, ajustes táticos e leitura permanente do cenário macro e regulatório.",
  },
]

export function ProcessSection() {
  return (
    <section id="como-atuamos" className="bg-secondary py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-4 text-muted-foreground">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            <span className="text-[11px] tracking-[0.4em] uppercase">Como Atuamos</span>
          </div>
          <h2 className="font-serif text-balance text-4xl font-light leading-[1.1] text-primary sm:text-5xl lg:text-6xl">
            Um método <em className="italic">consultivo</em>, em três movimentos.
          </h2>
        </div>

        <div className="mt-20 space-y-px bg-border">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="group grid gap-0 bg-secondary transition-colors hover:bg-background lg:grid-cols-12"
            >
              <div
                className={`relative aspect-[16/10] w-full overflow-hidden lg:col-span-5 ${
                  index % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                className={`flex flex-col justify-center p-8 lg:col-span-6 lg:p-14 ${
                  index % 2 === 1 ? "lg:order-1" : "lg:col-start-7"
                }`}
              >
                <h3 className="font-serif text-3xl font-light text-primary lg:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
