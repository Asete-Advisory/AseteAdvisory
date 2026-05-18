import Image from "next/image"

const PROFILES = [
  {
    label: "01",
    title: "Empresários",
    image: "/images/asete-predio.jpeg",
    alt: "Edifício corporativo representando empresários",
    description:
      "Que precisam separar a saúde financeira da empresa do patrimônio pessoal e estruturar uma sucessão sólida.",
  },
  {
    label: "02",
    title: "Profissionais de alta renda",
    image: "/images/asete-reuniao.jpg",
    alt: "Reunião consultiva representando profissionais de alta renda",
    description:
      "Médicos, executivos e sócios de escritórios que buscam transformar receita recorrente em patrimônio duradouro.",
  },
  {
    label: "03",
    title: "Investidores",
    image: "/images/cta-architecture.jpg",
    alt: "Arquitetura institucional representando investidores",
    description:
      "Que já acumularam patrimônio relevante e desejam uma visão consolidada, independente e criteriosa.",
  },
]

export function ClientProfileSection() {
  return (
    <section id="cliente" className="bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-4 text-muted-foreground">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.4em] uppercase">Para quem atendemos</span>
            </div>
            <h2 className="font-serif text-balance text-4xl font-light leading-[1.1] text-primary sm:text-5xl lg:text-6xl">
              Clientes que tratam o patrimônio como <em className="italic">projeto de vida</em>.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Trabalhamos com perfis exigentes que valorizam discrição, profundidade técnica e um
              relacionamento duradouro.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:items-start">
          <article className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={PROFILES[0].image}
                alt={PROFILES[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-8 border-t border-border pt-8">
              <h3 className="font-serif text-3xl font-light text-primary lg:text-5xl">
                {PROFILES[0].title}
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {PROFILES[0].description}
              </p>
            </div>
          </article>

          <div className="grid gap-10 lg:col-span-5">
            {PROFILES.slice(1).map((profile) => (
              <article
                key={profile.label}
                className="grid gap-6 border-t border-border pt-6 sm:grid-cols-[11rem_1fr] lg:grid-cols-1 xl:grid-cols-[12rem_1fr]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={profile.image}
                    alt={profile.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-3xl font-light text-primary lg:text-4xl">
                    {profile.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {profile.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
