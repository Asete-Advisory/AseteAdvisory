import Image from "next/image";

const ASETE_MEANING = [
  ["A", "Assessoria"],
  ["S", "Soluções"],
  ["E", "Estratégia"],
  ["T", "Transformação"],
  ["E", "Econômica"],
];

const ABOUT_PRINCIPLES = [
  {
    title: "Independência",
    image: "/sobre/img4.jpeg",
    alt: "Profissional em atendimento remoto",
    description:
      "Atuamos sem vínculos que limitem nossa análise, sempre considerando os objetivos e o momento patrimonial de cada cliente.",
  },
  {
    title: "Visão Consolidada",
    image: "/sobre/img3.jpeg",
    alt: "Reunião consultiva com equipe ASETE",
    description:
      "Estruturamos soluções que equilibram proteção, crescimento, sucessão e preservação patrimonial ao longo das gerações.",
  },
  {
    title: "Estrutura Integrada",
    image: "/sobre/img1.webp",
    alt: "Planejamento estratégico em documento corporativo",
    description:
      "Conectamos consultoria, investimentos, imóveis, seguros e consórcios em uma atuação coordenada e multidisciplinar.",
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-y border-border py-5">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.4em]">
                Sobre a Asete
              </span>
            </div>
            <span className="hidden text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:block">
              Editorial Institucional
            </span>
          </div>
        </div>

        <div className="grid border-b border-border lg:grid-cols-12">
          <article className="border-border py-10 lg:col-span-7 lg:border-r lg:pr-10">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/asete-reuniao.jpg"
                alt="Reunião consultiva da equipe ASETE"
                fill
                loading="eager"
                className="object-cover"
              />
            </div>
            <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-accent">
              Consultoria Patrimonial
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl font-light leading-[1.05] text-primary sm:text-5xl lg:text-6xl">
              Uma consultoria <em className="italic">independente</em> voltada
              à proteção, clareza e evolução patrimonial.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              A ASETE nasceu da convicção de que patrimônio não deve ser tratado
              apenas como números, mas como um projeto de vida, continuidade e
              construção de legado.
            </p>
          </article>

          <aside className="grid border-border lg:col-span-5 lg:pl-10">
            <article className="border-b border-border py-10">
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Trajetória
              </p>
              <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-primary lg:text-4xl">
                Mais de 10 anos conectando proximidade, independência e visão
                integrada.
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A atuação em consultoria patrimonial, investimentos e
                estruturação financeira consolidou um modelo voltado a decisões
                estratégicas de longo prazo.
              </p>
            </article>

            <article className="py-10">
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Significado
              </p>
              <div className="mt-5 divide-y divide-border">
                {ASETE_MEANING.map(([letter, label]) => (
                  <div
                    key={`${letter}-${label}`}
                    className="flex items-baseline gap-5 py-3"
                  >
                    <span className="w-8 shrink-0 font-serif text-3xl leading-none text-primary">
                      {letter}
                    </span>
                    <span className="whitespace-nowrap text-xs uppercase tracking-[0.22em] text-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                O nome traduz uma estrutura construída sobre equilíbrio,
                estratégia e evolução constante.
              </p>
            </article>
          </aside>
        </div>

        <div className="grid border-b border-border lg:grid-cols-3">
          {ABOUT_PRINCIPLES.map((item, index) => (
            <article
              key={item.title}
              className={`py-10 lg:px-8 ${
                index === 0 ? "lg:pl-0" : "border-border lg:border-l"
              } ${index === ABOUT_PRINCIPLES.length - 1 ? "lg:pr-0" : ""}`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 font-serif text-3xl font-light leading-tight text-primary lg:text-4xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
