'use client'

import { useState } from 'react'
import { ChevronRight, BookOpen, Brain, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ROLES, type Role, type ExperienceLevel } from '@/lib/learning-paths'

export type UserProfile = {
  name: string
  role: Role
  experience: ExperienceLevel
}

type Props = {
  onComplete: (profile: UserProfile) => void
}

const EXPERIENCE_OPTIONS: {
  value: ExperienceLevel
  label: string
  description: string
  icon: React.ReactNode
}[] = [
  {
    value: 'beginner',
    label: 'New to AI',
    description: "I've heard the buzz but haven't really used AI tools in my work yet.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    value: 'intermediate',
    label: 'Getting Started',
    description: "I've used ChatGPT or Copilot a few times but want to get more out of them.",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    value: 'advanced',
    label: 'Comfortable User',
    description: "I use AI tools regularly and want to go deeper — agents, RAG, and beyond.",
    icon: <Zap className="w-5 h-5" />,
  },
]

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [role, setRole] = useState<Role | ''>('')
  const [experience, setExperience] = useState<ExperienceLevel | ''>('')

  function handleNext() {
    if (step < 3) setStep(step + 1)
    else if (name && role && experience) {
      onComplete({ name, role: role as Role, experience: experience as ExperienceLevel })
    }
  }

  const canProceed =
    (step === 1 && name.trim().length > 1) ||
    (step === 2 && role !== '') ||
    (step === 3 && experience !== '')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary px-6 py-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <NatWestLogo />
          <span className="text-primary-foreground font-semibold text-lg tracking-tight">
            GenAI Learning Agent
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                    s === step
                      ? 'bg-primary text-primary-foreground'
                      : s < step
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-border text-muted-foreground'
                  )}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 transition-all',
                      s < step ? 'bg-accent' : 'bg-border'
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
            {step === 1 && (
              <StepOne name={name} setName={setName} />
            )}
            {step === 2 && (
              <StepTwo role={role} setRole={setRole} />
            )}
            {step === 3 && (
              <StepThree experience={experience} setExperience={setExperience} />
            )}

            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 gap-2"
              >
                {step === 3 ? 'Start Learning' : 'Continue'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Step labels */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Step {step} of 3
          </p>
        </div>
      </main>
    </div>
  )
}

function StepOne({ name, setName }: { name: string; setName: (v: string) => void }) {
  return (
    <div>
      <div className="mb-6">
        <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Welcome to GenAI Learning Agent
        </span>
        <h1 className="text-2xl font-bold text-foreground text-balance leading-snug">
          Let's personalise your learning journey
        </h1>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Your AI guide will adapt every lesson to your role, experience, and goals. Start by telling us your name.
        </p>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Your first name
        </label>
        <Input
          id="name"
          placeholder="e.g. Sarah"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && name.trim().length > 1 && undefined}
          className="text-base"
          autoFocus
        />
      </div>
    </div>
  )
}

function StepTwo({ role, setRole }: { role: string; setRole: (v: Role) => void }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground text-balance leading-snug">
          What is your area of work?
        </h2>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Your guide will tailor examples, tools, and use cases specifically for your role.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {ROLES.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={cn(
              'text-left p-3 rounded-xl border text-sm font-medium transition-all',
              role === r
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border text-foreground hover:border-primary/50 hover:bg-secondary'
            )}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepThree({
  experience,
  setExperience,
}: {
  experience: string
  setExperience: (v: ExperienceLevel) => void
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground text-balance leading-snug">
          How would you describe your AI experience?
        </h2>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Be honest — there's no wrong answer! This helps your guide pitch lessons at the right level.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {EXPERIENCE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setExperience(opt.value)}
            className={cn(
              'flex items-start gap-4 p-4 rounded-xl border text-left transition-all',
              experience === opt.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border text-foreground hover:border-primary/50 hover:bg-secondary'
            )}
          >
            <div
              className={cn(
                'mt-0.5 p-2 rounded-lg',
                experience === opt.value ? 'bg-white/20' : 'bg-secondary text-primary'
              )}
            >
              {opt.icon}
            </div>
            <div>
              <div className="font-semibold text-sm">{opt.label}</div>
              <div
                className={cn(
                  'text-xs mt-0.5 leading-relaxed',
                  experience === opt.value ? 'text-primary-foreground/80' : 'text-muted-foreground'
                )}
              >
                {opt.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function NatWestLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NatWest logo"
      role="img"
    >
      <rect width="32" height="32" rx="6" fill="white" fillOpacity="0.15" />
      <path
        d="M6 8L12 24L16 14L20 24L26 8"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
