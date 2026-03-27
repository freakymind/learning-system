'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, BookOpen, Users, Zap, Target, MessageSquare, BarChart3, Lightbulb, ChevronRight, Sparkles } from 'lucide-react'

type Props = {
  onGetStarted: () => void
}

const challenges = [
  {
    icon: BookOpen,
    title: 'You deserve learning that speaks your language',
    body: 'Whether you work in risk, compliance, operations, or relationship management, you deserve training built around your world — with examples, scenarios, and language that actually resonate with your day-to-day work.',
  },
  {
    icon: Users,
    title: 'A clear path forward, not an overwhelming list',
    body: 'With so many AI tools and resources out there, colleagues simply need a trusted guide to show them where to start. A structured, role-based path removes the guesswork and builds confidence from day one.',
  },
  {
    icon: BarChart3,
    title: 'Learning that meets you where you are',
    body: 'A Relationship Manager and a Software Engineer are on completely different journeys with AI. Great learning adapts to your starting point and your goals — so you always feel challenged but never lost.',
  },
  {
    icon: MessageSquare,
    title: 'Practical prompting skills you can use today',
    body: 'Knowing how to communicate with AI effectively is one of the most valuable skills you can develop right now. Colleagues who learn to write great prompts unlock immediate, tangible benefits in their everyday tasks.',
  },
]

const solutions = [
  {
    icon: Target,
    title: 'Personalised from the first moment',
    body: 'Tell the Academy your role and experience level. It immediately tailors your learning path, language, and examples to match your actual job — no irrelevant content, no wasted time.',
  },
  {
    icon: Zap,
    title: 'Learn by doing, not just watching',
    body: 'Every topic ends with a practical exercise or challenge. The AI agent teaches you by conversation — asking questions, correcting misconceptions, and adapting to how you respond in real time.',
  },
  {
    icon: CheckCircle2,
    title: 'Role-specific prompting mastery',
    body: 'The Academy teaches you to write prompts that work in your world. Whether you are writing risk assessments, summarising client notes, or drafting code, you will practise the exact prompts that matter to you.',
  },
  {
    icon: MessageSquare,
    title: 'An agent that guides, not just answers',
    body: 'Rather than a search bar or a static course, you have a conversational AI learning guide. It checks your understanding, builds on what you know, and keeps you moving forward with purpose.',
  },
]

const stats = [
  { value: '10+', label: 'Job roles covered' },
  { value: '3', label: 'Experience levels' },
  { value: '40+', label: 'Learning topics' },
  { value: '1', label: 'AI guide, just for you' },
]

// --- Interactive prompt demo data ---
type DemoScenario = {
  id: string
  label: string
  role: string
  weak: { prompt: string; response: string }
  strong: { prompt: string; response: string }
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'summary',
    label: 'Summarise a document',
    role: 'Business Analyst',
    weak: {
      prompt: 'Summarise this.',
      response:
        'This document covers several topics including processes, risks, and outcomes. There are many points mentioned throughout.',
    },
    strong: {
      prompt:
        'You are a Business Analyst at NatWest. Summarise the following document in 3 bullet points for a senior stakeholder. Focus on key risks and recommended actions. Use plain English.',
      response:
        '• Key risk identified: manual reconciliation process introduces a 12% error rate, affecting downstream reporting.\n• Recommended action: automate the reconciliation step using existing tooling — estimated to save 4 hours per week.\n• Stakeholder note: no budget increase required; delivery is achievable within Q2 with current team capacity.',
    },
  },
  {
    id: 'email',
    label: 'Draft a client email',
    role: 'Relationship Manager',
    weak: {
      prompt: 'Write an email to a client.',
      response:
        'Dear Client, I hope you are well. I wanted to reach out regarding your account. Please let me know if you have any questions. Kind regards.',
    },
    strong: {
      prompt:
        'Act as a NatWest Relationship Manager. Draft a short, warm email to a long-standing business client (10+ years) following up after their recent loan application was approved. Mention next steps and offer a call this week. Tone: professional but personal.',
      response:
        'Subject: Your loan application — approved and next steps\n\nDear Sarah,\n\nGreat news — your application has been approved. After 10 years of working together, it is always a pleasure to support Greenfield\'s growth.\n\nNext steps: our team will be in touch within 2 business days to finalise the agreement. In the meantime, I\'d love to catch up — are you free for a call Thursday or Friday afternoon?\n\nWarm regards,\nJames',
    },
  },
  {
    id: 'risk',
    label: 'Identify risks in a policy',
    role: 'Risk & Compliance',
    weak: {
      prompt: 'What are the risks?',
      response: 'There could be various risks such as operational risk, compliance risk, and reputational risk.',
    },
    strong: {
      prompt:
        'You are a Risk & Compliance specialist at a UK retail bank. Review the following draft policy excerpt and identify the top 3 regulatory risks, citing the relevant FCA principle where applicable. Be specific and concise.',
      response:
        '1. FCA Principle 6 (Customers\' interests): The opt-out mechanism is buried in section 9 — this may not constitute fair treatment of customers and could attract supervisory attention.\n2. FCA Principle 11 (Relations with regulators): The escalation timeline (72 hours) does not align with current breach reporting obligations under SYSC 18.\n3. Operational risk: No business continuity clause exists for the defined process — a gap that would likely be flagged in the next internal audit.',
    },
  },
]

function PromptDemo({ onGetStarted }: { onGetStarted: () => void }) {
  const [activeId, setActiveId] = useState(DEMO_SCENARIOS[0].id)
  const scenario = DEMO_SCENARIOS.find((s) => s.id === activeId)!

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Scenario tabs */}
      <div className="flex border-b border-border bg-muted/40">
        {DEMO_SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`flex-1 text-xs font-medium px-3 py-3 transition-colors border-b-2 ${
              activeId === s.id
                ? 'border-primary text-primary bg-card'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Weak prompt */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-muted-foreground/40 shrink-0" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Without coaching</span>
          </div>
          <div className="bg-muted/50 rounded-lg px-3 py-2.5 mb-3 border border-border">
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">{scenario.weak.prompt}</p>
          </div>
          <div className="bg-background rounded-lg px-3 py-3 border border-border">
            <p className="text-xs text-foreground/70 leading-relaxed whitespace-pre-line">{scenario.weak.response}</p>
          </div>
        </div>

        {/* Strong prompt */}
        <div className="p-5 bg-primary/[0.02]">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wide">After the AI Academy</span>
          </div>
          <div className="bg-primary/5 rounded-lg px-3 py-2.5 mb-3 border border-primary/20">
            <p className="text-xs text-foreground font-mono leading-relaxed">{scenario.strong.prompt}</p>
          </div>
          <div className="bg-background rounded-lg px-3 py-3 border border-primary/15">
            <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">{scenario.strong.response}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 bg-secondary/40 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Role shown:</span> {scenario.role} — the Academy adapts this for your specific job.
        </p>
        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline whitespace-nowrap"
        >
          Get your personalised path <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}

export default function HomepageLanding({ onGetStarted }: Props) {
  return (
    <div className="min-h-screen bg-background font-sans">

      {/* Nav */}
      <nav className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NatWestLogo />
            <div className="h-5 w-px bg-white/30" />
            <span className="text-sm font-medium tracking-wide text-white/90">AI Academy</span>
          </div>
          <button
            onClick={onGetStarted}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Start learning
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-white/10 rounded-full px-3 py-1 mb-6">
              NatWest Internal — AI Skills Programme
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance mb-6">
              AI learning that actually fits{' '}
              <span className="text-accent">your role.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed text-pretty mb-10 max-w-2xl">
              Every colleague at NatWest has a unique role, unique experience, and unique potential
              with AI. The AI Academy meets you exactly where you are — and guides you step by step
              toward skills that make a real difference in your work.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-7 py-3.5 rounded-md transition-colors text-base"
              >
                Start your learning journey
                <ArrowRight size={18} />
              </button>
              <span className="text-sm text-white/50">Free to use — no setup required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={18} className="text-accent shrink-0" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">See the difference</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            See what better prompting looks like
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-10 text-pretty">
            Pick a scenario below and see how the same task produces a completely different result
            once you know how to guide AI properly. This is what the Academy teaches.
          </p>
          <PromptDemo onGetStarted={onGetStarted} />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* What colleagues need */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <Lightbulb size={18} className="text-accent shrink-0" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">What great AI learning looks like</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Every colleague deserves learning built for them
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-14 text-pretty">
            The demand to build AI skills is growing fast across NatWest. Colleagues are eager —
            they just need a learning experience that truly fits who they are and what they do.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {challenges.map((c) => (
              <div
                key={c.title}
                className="bg-card border border-border rounded-lg p-6 flex gap-4"
              >
                <div className="mt-0.5 shrink-0 w-9 h-9 rounded-md bg-accent/10 flex items-center justify-center">
                  <c.icon size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Solution */}
      <section className="py-20 md:py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 size={18} className="text-primary shrink-0" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">How the Academy helps</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            A learning guide built around you
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-14 text-pretty">
            The NatWest AI Academy pairs a personalised learning path with a conversational AI agent
            that teaches, challenges, and adapts to you — not the other way around.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="bg-card border border-primary/15 rounded-lg p-6 flex gap-4"
              >
                <div className="mt-0.5 shrink-0 w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <s.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-3">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-14 text-pretty">
            From zero to guided learning in under two minutes.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell us about yourself',
                body: 'Share your name, your role at NatWest, and how much you already know about AI. Takes less than a minute.',
              },
              {
                step: '02',
                title: 'Get your learning path',
                body: 'The Academy builds a personalised curriculum covering prompting, AI fundamentals, and topics specific to your function.',
              },
              {
                step: '03',
                title: 'Learn through conversation',
                body: 'Chat with your AI guide, pick topics from your learning path, and build practical skills you can use immediately.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <span className="block text-6xl font-bold text-primary/10 leading-none mb-4 select-none">
                  {item.step}
                </span>
                <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Ready to start learning?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto text-pretty">
            Thousands of colleagues across NatWest are already building their AI skills.
            Your personalised journey starts in under two minutes.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 rounded-md transition-colors text-base"
          >
            Begin your personalised journey
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NatWestLogo small />
            <span className="text-sm text-muted-foreground">AI Academy</span>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            For internal NatWest use only. Powered by OpenAI via the Vercel AI Gateway.
          </p>
        </div>
      </footer>

    </div>
  )
}

function NatWestLogo({ small }: { small?: boolean }) {
  const size = small ? 24 : 30
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NatWest logo mark"
      role="img"
    >
      <rect width="40" height="40" rx="4" fill={small ? '#42145f' : 'white'} fillOpacity={small ? '1' : '0.15'} />
      <path
        d="M7 10 L7 30 L14 30 L20 18 L26 30 L33 30 L33 10 L27 10 L27 22 L20 10 L13 22 L13 10 Z"
        fill="white"
        fillOpacity="0.95"
      />
    </svg>
  )
}
