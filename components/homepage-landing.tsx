'use client'

import { ArrowRight, AlertTriangle, CheckCircle2, BookOpen, Users, Zap, Target, MessageSquare, BarChart3 } from 'lucide-react'

type Props = {
  onGetStarted: () => void
}

const challenges = [
  {
    icon: BookOpen,
    title: 'Generic training that misses the mark',
    body: 'Most AI courses are built for developers or data scientists. If you work in risk, compliance, operations, or customer service, they feel completely irrelevant — full of jargon and examples that have nothing to do with your day-to-day.',
  },
  {
    icon: Users,
    title: 'No guidance on where to even start',
    body: 'With hundreds of AI tools, courses, and frameworks available, colleagues spend more time figuring out what to learn than actually learning. There is no clear path based on your role, your team, or your experience level.',
  },
  {
    icon: BarChart3,
    title: 'One-size-fits-all content',
    body: 'A Relationship Manager and a Software Engineer face completely different AI challenges. Generic training treats everyone the same, leaving people either overwhelmed or bored — and nothing sticks.',
  },
  {
    icon: MessageSquare,
    title: 'Prompting skills left to chance',
    body: 'Knowing how to communicate with AI — how to write effective prompts — is the single most important practical skill. Yet almost no corporate training covers it, so colleagues learn bad habits or give up entirely.',
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
    body: 'The Academy teaches you to write prompts that work in your world. Whether you are writing risk assessments, summarising client notes, or drafting code, you will practice the exact prompts that matter to you.',
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
              Most AI training is built for someone else. The NatWest AI Academy learns who you are,
              what you do, and where you are starting from — then guides you through the skills that
              will make a real difference in your work.
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

      {/* Challenges */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={18} className="text-accent shrink-0" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">The problem</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Why most AI training fails NatWest colleagues
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-14 text-pretty">
            The demand to understand AI is real and growing — but the training available today
            was not designed with financial services professionals in mind.
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
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">The solution</span>
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
            Join your colleagues and begin building the AI skills that matter for your role today.
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
      {/* Stylised NW monogram in brand colours */}
      <rect width="40" height="40" rx="4" fill={small ? '#42145f' : 'white'} fillOpacity={small ? '1' : '0.15'} />
      <path
        d="M7 10 L7 30 L14 30 L20 18 L26 30 L33 30 L33 10 L27 10 L27 22 L20 10 L13 22 L13 10 Z"
        fill={small ? 'white' : 'white'}
        fillOpacity="0.95"
      />
    </svg>
  )
}
