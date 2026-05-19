"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react"

import { buildWhatsAppContactUrl } from "@/lib/contact"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Answer = {
  label: string
  score: number
}

type Question = {
  id: string
  title: string
  options: Answer[]
}

const questions: Question[] = [
  {
    id: "momento",
    title: "Qual é o momento atual do seu patrimônio?",
    options: [
      { label: "Estou começando a estruturar meus investimentos", score: 1 },
      { label: "Tenho patrimônio formado, mas quero mais organização", score: 2 },
      { label: "Tenho empresa, imóveis ou investimentos em diferentes frentes", score: 3 },
    ],
  },
  {
    id: "prioridade",
    title: "O que mais pesa na sua decisão hoje?",
    options: [
      { label: "Buscar rentabilidade com mais critério", score: 2 },
      { label: "Proteger minha família e reduzir riscos", score: 3 },
      { label: "Consolidar tudo em uma estratégia de longo prazo", score: 3 },
    ],
  },
  {
    id: "prazo",
    title: "Qual horizonte faz mais sentido para você?",
    options: [
      { label: "Até 2 anos", score: 1 },
      { label: "De 3 a 5 anos", score: 2 },
      { label: "Mais de 5 anos", score: 3 },
    ],
  },
  {
    id: "estrutura",
    title: "Como está a sua proteção patrimonial?",
    options: [
      { label: "Ainda não tenho uma estrutura clara", score: 1 },
      { label: "Tenho algumas soluções, mas sem visão integrada", score: 2 },
      { label: "Já cuido disso, mas quero revisar oportunidades", score: 3 },
    ],
  },
  {
    id: "acompanhamento",
    title: "Como você prefere ser acompanhado?",
    options: [
      { label: "Quero orientação pontual para tomar decisões", score: 1 },
      { label: "Quero acompanhamento periódico com especialistas", score: 2 },
      { label: "Quero uma visão completa, com planejamento e execução", score: 3 },
    ],
  },
]

function getProfile(total: number) {
  if (total <= 7) {
    return {
      name: "Perfil em estruturação",
      description:
        "O próximo passo é criar uma base organizada, com prioridades claras, liquidez adequada e decisões menos dispersas.",
    }
  }

  if (total <= 11) {
    return {
      name: "Perfil em consolidação",
      description:
        "Você já tem movimentos importantes em andamento. A maior oportunidade está em integrar investimentos, proteção e objetivos em uma estratégia única.",
    }
  }

  return {
    name: "Perfil patrimonial estratégico",
    description:
      "Seu cenário pede uma análise mais completa, conectando patrimônio, riscos, sucessão, investimentos e oportunidades de longo prazo.",
  }
}

export function ClientJourneyModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})

  const currentQuestion = questions[step]
  const isResultStep = step === questions.length
  const progress = (step / questions.length) * 100

  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined
  const canAdvance = Boolean(selectedAnswer) || isResultStep

  const profile = useMemo(() => {
    const total = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0)
    return getProfile(total)
  }, [answers])

  const whatsappUrl = useMemo(() => {
    const responseLines = questions.map((question) => {
      const answer = answers[question.id]?.label ?? "Sem resposta"
      return `- ${question.title}: ${answer}`
    })

    return buildWhatsAppContactUrl(
      [
        "Olá, fiz a jornada de perfil patrimonial no site da ASETE Advisory.",
        "",
        `Resultado: ${profile.name}`,
        profile.description,
        "",
        "Minhas respostas:",
        ...responseLines,
        "",
        "Gostaria de solicitar uma análise personalizada.",
      ].join("\n"),
    )
  }, [answers, profile])

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setStep(0)
      setAnswers({})
    }
  }

  function handleAdvance() {
    if (!canAdvance) return
    setStep((currentStep) => Math.min(currentStep + 1, questions.length))
  }

  function handleBack() {
    setStep((currentStep) => Math.max(currentStep - 1, 0))
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex min-h-14 items-center justify-center gap-3 bg-accent px-7 py-4 text-xs font-medium tracking-[0.14em] uppercase text-accent-foreground transition-colors hover:bg-primary-foreground hover:text-primary sm:tracking-[0.2em]"
        >
          Solicitar análise personalizada
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] overflow-y-auto border-primary/10 p-0 sm:max-w-2xl">
        <div className="border-b border-border bg-primary px-6 py-6 text-primary-foreground sm:px-8">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl font-light leading-tight">
              Jornada patrimonial
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70">
              Responda algumas perguntas para entendermos o seu momento.
            </DialogDescription>
          </DialogHeader>
          <Progress
            value={isResultStep ? 100 : progress}
            className="mt-6 h-1.5 bg-primary-foreground/15 [&_[data-slot=progress-indicator]]:bg-accent"
          />
        </div>

        <div className="px-6 py-7 sm:px-8">
          {isResultStep ? (
            <div className="space-y-6">
              <div className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="size-5" />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-medium tracking-[0.24em] uppercase text-muted-foreground">
                  Resultado
                </p>
                <h3 className="font-serif text-3xl font-light text-primary">
                  {profile.name}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {profile.description}
                </p>
              </div>

              <div className="rounded-md border border-border bg-secondary/50 p-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Vamos usar esse resumo para conduzir uma conversa mais objetiva
                  sobre seus objetivos, riscos e possibilidades de estruturação.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 bg-accent px-6 py-3 text-xs font-medium tracking-[0.14em] uppercase text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Enviar resultado no WhatsApp
                  <MessageCircle className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0)
                    setAnswers({})
                  }}
                  className="inline-flex min-h-12 items-center justify-center border border-border px-6 py-3 text-xs font-medium tracking-[0.14em] uppercase text-primary transition-colors hover:bg-secondary"
                >
                  Refazer jornada
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-7">
              <div className="space-y-3">
                <p className="text-xs font-medium tracking-[0.24em] uppercase text-muted-foreground">
                  Pergunta {step + 1} de {questions.length}
                </p>
                <h3 className="font-serif text-3xl font-light leading-tight text-primary">
                  {currentQuestion.title}
                </h3>
              </div>

              <RadioGroup
                value={selectedAnswer?.label ?? ""}
                onValueChange={(value) => {
                  const answer = currentQuestion.options.find(
                    (option) => option.label === value,
                  )

                  if (answer) {
                    setAnswers((currentAnswers) => ({
                      ...currentAnswers,
                      [currentQuestion.id]: answer,
                    }))
                  }
                }}
                className="gap-3"
              >
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.label}
                    className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-4 transition-colors hover:border-accent hover:bg-secondary/60 has-[[data-state=checked]]:border-accent has-[[data-state=checked]]:bg-accent/10"
                  >
                    <RadioGroupItem value={option.label} className="mt-1" />
                    <span className="text-sm leading-relaxed text-foreground">
                      {option.label}
                    </span>
                  </label>
                ))}
              </RadioGroup>

              <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-border px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase text-primary transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" />
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleAdvance}
                  disabled={!canAdvance}
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  {step === questions.length - 1 ? "Ver resultado" : "Avançar"}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
