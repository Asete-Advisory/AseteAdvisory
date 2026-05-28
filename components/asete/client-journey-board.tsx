"use client"

import { useMemo, useState } from "react"
import type { ComponentType } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Dices,
  Flag,
  Layers3,
  Mail,
  MessageCircle,
  Phone,
  PieChart,
  ShieldCheck,
  User,
} from "lucide-react"

import { buildWhatsAppContactUrl } from "@/lib/contact"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

type BoardPosition = {
  x: number
  y: number
}

type JourneyStep = {
  id: string
  number: string
  title: string
  shortTitle: string
  action: string
  description: string
  icon: ComponentType<{ className?: string }>
  desktopPosition: BoardPosition
  decisions: string[]
  insight: string
}

type ContactData = {
  name: string
  email: string
  phone: string
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "analise",
    number: "01",
    title: "Análise do cenário",
    shortTitle: "Análise",
    action: "Comece mapeando",
    description:
      "Você entra no tabuleiro organizando objetivos, patrimônio atual, riscos e prioridades antes de qualquer recomendação.",
    icon: BarChart3,
    desktopPosition: { x: 12, y: 58 },
    decisions: [
      "Entender onde meu patrimônio está concentrado",
      "Separar objetivos pessoais, familiares e empresariais",
      "Identificar riscos que hoje não estão claros",
    ],
    insight:
      "A primeira casa define o mapa. Quanto mais claro o diagnóstico, melhor a próxima decisão.",
  },
  {
    id: "estrategia",
    number: "02",
    title: "Desenho da estratégia",
    shortTitle: "Estratégia",
    action: "Defina prioridades",
    description:
      "Nesta casa, o jogo deixa de ser produto e vira lógica: liquidez, prazo, proteção e crescimento no mesmo plano.",
    icon: ShieldCheck,
    desktopPosition: { x: 32, y: 35 },
    decisions: [
      "Criar uma reserva de liquidez bem definida",
      "Proteger minha família e a continuidade dos planos",
      "Considerar impostos, sucessão e riscos na estratégia",
    ],
    insight:
      "A estratégia cria regras para o jogo e evita movimentos soltos ao longo da jornada.",
  },
  {
    id: "carteira",
    number: "03",
    title: "Montagem da carteira",
    shortTitle: "Carteira",
    action: "Monte a composição",
    description:
      "Agora você escolhe o papel de cada peça: renda fixa, fundos, previdência, renda variável e ativos reais entram com funções diferentes.",
    icon: PieChart,
    desktopPosition: { x: 50, y: 58 },
    decisions: [
      "Equilibrar segurança, rentabilidade e liquidez",
      "Comparar oportunidades antes de tomar posição",
      "Entender o papel de cada ativo dentro da carteira",
    ],
    insight:
      "Uma carteira consistente nasce de função, peso e horizonte, não de apostas isoladas.",
  },
  {
    id: "execucao",
    number: "04",
    title: "Locação e execução",
    shortTitle: "Execução",
    action: "Coloque em movimento",
    description:
      "Você avança para aportes, reorganização de posições, imóveis, seguros, crédito ou consórcios quando eles fazem sentido para o plano.",
    icon: Building2,
    desktopPosition: { x: 68, y: 35 },
    decisions: [
      "Executar por etapas, sem decisões precipitadas",
      "Avaliar imóveis, crédito ou consórcios dentro da estratégia",
      "Acompanhar custos, riscos e prazos antes da contratação",
    ],
    insight:
      "A execução deve preservar controle. O ritmo do movimento importa tanto quanto a escolha.",
  },
  {
    id: "diversificacao",
    number: "05",
    title: "Diversificação e acompanhamento",
    shortTitle: "Diversificação",
    action: "Finalize a rodada",
    description:
      "Na última casa, você acompanha resultados, revisa cenários e ajusta a rota com uma visão integrada do patrimônio.",
    icon: Layers3,
    desktopPosition: { x: 88, y: 58 },
    decisions: [
      "Revisar minha carteira periodicamente",
      "Diversificar entre classes, geografias e objetivos",
      "Ter acompanhamento consultivo para decisões relevantes",
    ],
    insight:
      "Diversificar não é espalhar recursos. É reduzir dependências e manter coerência ao longo do tempo.",
  },
]

const DESKTOP_PATH =
  "M 12 58 C 22 58, 22 35, 32 35 C 42 35, 40 58, 50 58 C 60 58, 58 35, 68 35 C 78 35, 78 58, 88 58"

export function ClientJourneyBoard() {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedDecisions, setSelectedDecisions] = useState<Record<string, string[]>>({})
  const [contact, setContact] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [rolling, setRolling] = useState(false)
  const [dieValue, setDieValue] = useState(1)

  const currentStep = JOURNEY_STEPS[activeStep]
  const currentSelections = selectedDecisions[currentStep.id] ?? []
  const isLastStep = activeStep === JOURNEY_STEPS.length - 1
  const completedSteps = JOURNEY_STEPS.filter(
    (step) => (selectedDecisions[step.id] ?? []).length > 0,
  ).length
  const progress = (completedSteps / JOURNEY_STEPS.length) * 100
  const contactReady =
    contact.name.trim().length > 1 &&
    contact.email.includes("@") &&
    contact.phone.replace(/\D/g, "").length >= 10

  const whatsappUrl = useMemo(() => {
    const responseLines = JOURNEY_STEPS.flatMap((step) => {
      const answers = selectedDecisions[step.id] ?? []

      return [
        `${step.number} - ${step.title}`,
        answers.length > 0
          ? answers.map((answer) => `- ${answer}`).join("\n")
          : "- Sem marcações",
      ]
    })

    return buildWhatsAppContactUrl(
      [
        "Olá, joguei a jornada do cliente no site da ASETE Advisory.",
        "",
        `Nome: ${contact.name || "Não informado"}`,
        `E-mail: ${contact.email || "Não informado"}`,
        `Telefone: ${contact.phone || "Não informado"}`,
        "",
        "Minhas escolhas na jornada:",
        ...responseLines,
        "",
        "Gostaria de solicitar uma análise personalizada.",
      ].join("\n"),
    )
  }, [contact, selectedDecisions])

  function toggleDecision(decision: string) {
    setSelectedDecisions((current) => {
      const stepSelections = current[currentStep.id] ?? []
      const nextSelections = stepSelections.includes(decision)
        ? stepSelections.filter((item) => item !== decision)
        : [...stepSelections, decision]

      return {
        ...current,
        [currentStep.id]: nextSelections,
      }
    })
  }

  function canOpenStep(index: number) {
    if (index <= activeStep) return true
    return JOURNEY_STEPS.slice(0, index).every(
      (step) => (selectedDecisions[step.id] ?? []).length > 0,
    )
  }

  function openStep(index: number) {
    if (!canOpenStep(index)) return
    setActiveStep(Math.min(Math.max(index, 0), JOURNEY_STEPS.length - 1))
    setModalOpen(true)
  }

  function moveToStep(index: number) {
    if (!canOpenStep(index)) return
    setActiveStep(Math.min(Math.max(index, 0), JOURNEY_STEPS.length - 1))
  }

  function rollNext() {
    if (currentSelections.length === 0 || isLastStep || rolling) return

    setRolling(true)
    setDieValue(Math.floor(Math.random() * 6) + 1)
    window.setTimeout(() => {
      setActiveStep((current) => Math.min(current + 1, JOURNEY_STEPS.length - 1))
      setRolling(false)
      setModalOpen(true)
    }, 620)
  }

  function restartJourney() {
    setActiveStep(0)
    setSelectedDecisions({})
    setContact({ name: "", email: "", phone: "" })
    setDieValue(1)
    setModalOpen(true)
  }

  return (
    <section className="min-h-screen bg-secondary pt-24 lg:pt-28">
      <div className="mx-auto max-w-[96rem] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-4 text-muted-foreground">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.4em] uppercase">
                Jornada do Cliente
              </span>
            </div>
            <h1 className="max-w-4xl font-serif text-balance text-4xl font-light leading-[1.04] text-primary sm:text-5xl lg:text-6xl">
              Jogue sua jornada patrimonial no tabuleiro ASETE.
            </h1>
          </div>
          <div className="border-l-2 border-accent pl-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Toque em uma casa, resolva a missão no modal e avance. O tabuleiro
              é o centro da experiência em desktop e mobile.
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden border border-border bg-background shadow-sm">
          <div className="grid gap-4 border-b border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-muted-foreground">
                Tabuleiro patrimonial
              </p>
              <p className="mt-1 text-base text-primary">
                Casa {activeStep + 1} de {JOURNEY_STEPS.length}: {currentStep.shortTitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center border border-accent bg-accent/10 font-serif text-2xl text-primary">
                {dieValue}
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Abrir missão
                <ArrowRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={rollNext}
                disabled={currentSelections.length === 0 || isLastStep || rolling}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <Dices className={cn("size-4", rolling && "animate-spin")} />
                Jogar próxima casa
              </button>
            </div>
          </div>

          <Progress
            value={progress}
            className="h-1.5 bg-border [&_[data-slot=progress-indicator]]:bg-accent"
          />

          <div className="relative h-[74vh] min-h-[40rem] overflow-hidden bg-primary text-primary-foreground lg:h-[calc(100vh-18rem)] lg:min-h-[42rem]">
            <div
              className="absolute inset-0 opacity-28"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                backgroundSize: "52px 52px",
              }}
            />

            <BoardMap
              activeStep={activeStep}
              canOpenStep={canOpenStep}
              completedById={selectedDecisions}
              onOpenStep={openStep}
              path={DESKTOP_PATH}
              className="hidden lg:block"
            />

            <MobileBoardMap
              activeStep={activeStep}
              canOpenStep={canOpenStep}
              completedById={selectedDecisions}
              onOpenStep={openStep}
            />

            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
              <p className="text-[10px] font-medium tracking-[0.24em] uppercase text-primary-foreground/55">
                Mapa do cliente
              </p>
            </div>

            <div className="absolute bottom-5 right-5 hidden items-center gap-3 border border-primary-foreground/15 bg-primary-foreground/[0.06] px-4 py-3 backdrop-blur sm:bottom-7 sm:right-7 lg:flex">
              <Flag className="size-5 text-accent" />
              <span className="text-xs tracking-[0.2em] uppercase text-primary-foreground/70">
                Final
              </span>
            </div>
          </div>
        </div>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-h-[92vh] overflow-y-auto border-primary/10 p-0 sm:max-w-2xl">
            <div className="border-b border-border bg-primary px-6 py-6 text-primary-foreground sm:px-8">
              <DialogHeader>
                <p className="text-xs font-medium tracking-[0.24em] uppercase text-primary-foreground/55">
                  Casa {currentStep.number}
                </p>
                <DialogTitle className="font-serif text-4xl font-light leading-tight sm:text-5xl">
                  {currentStep.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed text-primary-foreground/70">
                  {currentStep.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="px-6 py-7 sm:px-8">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                {currentStep.action}
              </p>
              <div className="mt-4 grid gap-3">
                {currentStep.decisions.map((decision) => {
                  const checked = currentSelections.includes(decision)

                  return (
                    <label
                      key={decision}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 border p-4 transition-colors",
                        checked
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/70 hover:bg-secondary/50",
                      )}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleDecision(decision)}
                        className="mt-0.5"
                      />
                      <span className="text-sm leading-relaxed text-foreground">
                        {decision}
                      </span>
                    </label>
                  )
                })}
              </div>

              <div className="mt-6 border-l-2 border-accent pl-4">
                <p className="font-serif text-3xl font-light leading-tight text-primary">
                  {currentStep.insight}
                </p>
              </div>

              {isLastStep ? (
                <div className="mt-7 space-y-5 border-t border-border pt-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Para concluir o jogo e enviar seu resumo, informe seus dados de
                    contato. Esta etapa aparece somente no final.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
                        <User className="size-3.5" />
                        Nome
                      </span>
                      <Input
                        value={contact.name}
                        onChange={(event) =>
                          setContact((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        className="h-11 rounded-none bg-background"
                        autoComplete="name"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
                        <Mail className="size-3.5" />
                        E-mail
                      </span>
                      <Input
                        type="email"
                        value={contact.email}
                        onChange={(event) =>
                          setContact((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        className="h-11 rounded-none bg-background"
                        autoComplete="email"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
                        <Phone className="size-3.5" />
                        Telefone
                      </span>
                      <Input
                        type="tel"
                        value={contact.phone}
                        onChange={(event) =>
                          setContact((current) => ({
                            ...current,
                            phone: event.target.value,
                          }))
                        }
                        className="h-11 rounded-none bg-background"
                        autoComplete="tel"
                      />
                    </label>
                  </div>
                </div>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => moveToStep(activeStep - 1)}
                  disabled={activeStep === 0}
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-border px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase text-primary transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" />
                  Voltar casa
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {isLastStep ? (
                    <>
                      <button
                        type="button"
                        onClick={restartJourney}
                        className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase text-primary transition-colors hover:bg-secondary"
                      >
                        Reiniciar
                      </button>
                      <a
                        href={contactReady ? whatsappUrl : undefined}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={!contactReady}
                        className={cn(
                          "inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase transition-colors",
                          contactReady
                            ? "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
                            : "pointer-events-none bg-muted text-muted-foreground",
                        )}
                      >
                        Enviar resumo
                        <MessageCircle className="size-4" />
                      </a>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={rollNext}
                      disabled={currentSelections.length === 0 || rolling}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
                    >
                      Jogar próxima casa
                      <Dices className={cn("size-4", rolling && "animate-spin")} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

type BoardMapProps = {
  activeStep: number
  canOpenStep: (index: number) => boolean
  className?: string
  completedById: Record<string, string[]>
  onOpenStep: (index: number) => void
  path: string
}

function BoardMap({
  activeStep,
  canOpenStep,
  className,
  completedById,
  onOpenStep,
  path,
}: BoardMapProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeLinecap="round"
          strokeWidth="4.4"
        />
        <path
          d={path}
          fill="none"
          stroke="rgba(5,22,46,0.32)"
          strokeLinecap="round"
          strokeWidth="2.9"
        />
        <path
          d={path}
          fill="none"
          stroke="rgba(199,164,105,0.95)"
          strokeDasharray="0.85 2.1"
          strokeLinecap="round"
          strokeWidth="0.72"
        />
      </svg>

      {JOURNEY_STEPS.map((step, index) => {
        const Icon = step.icon
        const isActive = index === activeStep
        const isComplete = (completedById[step.id] ?? []).length > 0
        const locked = !canOpenStep(index)
        const position = step.desktopPosition

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onOpenStep(index)}
            disabled={locked}
            className={cn(
              "group absolute z-20 flex w-48 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center transition-transform hover:scale-[1.04] disabled:pointer-events-none",
              isActive && "scale-105",
              locked && "opacity-45",
            )}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
          >
            <span
              className={cn(
                "relative flex size-32 items-center justify-center rounded-full border shadow-[0_24px_64px_rgba(0,0,0,0.3)] transition-colors",
                isActive
                  ? "border-accent bg-background text-primary ring-[10px] ring-accent/20"
                  : isComplete
                    ? "border-accent/90 bg-accent text-accent-foreground"
                    : locked
                      ? "border-primary-foreground/12 bg-primary-foreground/[0.08] text-primary-foreground/55"
                      : "border-primary-foreground/45 bg-background text-primary",
              )}
            >
              {isComplete ? <Check className="size-11" /> : <Icon className="size-11" />}
              <span
                className={cn(
                  "absolute -right-1 top-2 inline-flex size-12 items-center justify-center rounded-full border-2 border-primary-foreground bg-primary text-sm font-semibold text-primary-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isComplete
                      ? "bg-primary text-primary-foreground"
                      : locked
                        ? "border-primary-foreground/45 text-primary-foreground/70"
                        : "bg-primary text-primary-foreground",
                )}
              >
                {step.number}
              </span>
            </span>

            <span
              className={cn(
                "mt-5 inline-flex min-h-9 items-center justify-center rounded-full px-5 text-[11px] font-semibold tracking-[0.18em] uppercase shadow-[0_12px_35px_rgba(0,0,0,0.18)]",
                isActive
                  ? "bg-primary-foreground text-primary"
                  : isComplete
                    ? "bg-primary-foreground/95 text-primary"
                    : locked
                      ? "bg-primary-foreground/[0.08] text-primary-foreground/50"
                      : "bg-primary-foreground/95 text-primary",
              )}
            >
              {step.shortTitle}
            </span>

            {isActive ? (
              <span className="mt-2 inline-flex rounded-full bg-accent px-3 py-1 text-[9px] font-semibold tracking-[0.16em] uppercase text-accent-foreground">
                Você está aqui
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

type MobileBoardMapProps = {
  activeStep: number
  canOpenStep: (index: number) => boolean
  completedById: Record<string, string[]>
  onOpenStep: (index: number) => void
}

function MobileBoardMap({
  activeStep,
  canOpenStep,
  completedById,
  onOpenStep,
}: MobileBoardMapProps) {
  return (
    <div className="absolute inset-0 overflow-y-auto px-5 py-12 lg:hidden">
      <div className="relative mx-auto max-w-sm pb-10 pt-8">
        <div
          className="absolute bottom-20 left-12 top-20 w-2 rounded-full bg-primary-foreground/12"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 left-[3.15rem] top-20 w-px border-l-2 border-dashed border-accent/80"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {JOURNEY_STEPS.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeStep
            const isComplete = (completedById[step.id] ?? []).length > 0
            const locked = !canOpenStep(index)

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onOpenStep(index)}
                disabled={locked}
                className={cn(
                  "relative z-10 grid w-full grid-cols-[6rem_1fr] items-center gap-4 rounded-full py-2 pr-2 text-left transition-transform hover:scale-[1.015] disabled:pointer-events-none",
                  isActive && "scale-[1.02]",
                  locked && "opacity-45",
                )}
              >
                <span
                  className={cn(
                    "relative flex size-24 items-center justify-center rounded-full border shadow-[0_16px_42px_rgba(0,0,0,0.28)]",
                    isActive
                      ? "border-accent bg-background text-primary ring-8 ring-accent/20"
                      : isComplete
                        ? "border-accent/90 bg-accent text-accent-foreground"
                        : locked
                          ? "border-primary-foreground/12 bg-primary-foreground/[0.08] text-primary-foreground/55"
                          : "border-primary-foreground/35 bg-background text-primary",
                  )}
                >
                  {isComplete ? <Check className="size-9" /> : <Icon className="size-9" />}
                  <span className="absolute -right-1 top-1 flex size-10 items-center justify-center rounded-full border-2 border-primary-foreground bg-primary text-xs font-semibold text-primary-foreground">
                    {step.number}
                  </span>
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-medium tracking-[0.22em] uppercase text-primary-foreground/55">
                    Casa {step.number}
                  </span>
                  <span className="mt-1 block break-words font-serif text-2xl font-light leading-none text-primary-foreground min-[380px]:text-3xl">
                    {step.shortTitle}
                  </span>
                  {isActive ? (
                    <span className="mt-3 inline-flex rounded-full bg-accent px-3 py-1 text-[9px] font-semibold tracking-[0.16em] uppercase text-accent-foreground">
                      Você está aqui
                    </span>
                  ) : null}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
