'use client'

import { useState } from 'react'
import { Clock, ChevronDown, ChevronUp, GraduationCap, BookOpen, Zap, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLearningPath, type LearningTopic, type ExperienceLevel } from '@/lib/learning-paths'
import type { UserProfile } from '@/components/onboarding'

type Props = {
  userProfile: UserProfile
  onTopicClick: (topic: LearningTopic) => void
}

const CATEGORY_META: Record<
  LearningTopic['category'],
  { label: string; icon: React.ReactNode; color: string }
> = {
  foundations: {
    label: 'Foundations',
    icon: <BookOpen className="w-3.5 h-3.5" />,
    color: 'text-blue-300',
  },
  prompting: {
    label: 'Prompting',
    icon: <Layers className="w-3.5 h-3.5" />,
    color: 'text-green-300',
  },
  tools: {
    label: 'Tools',
    icon: <Zap className="w-3.5 h-3.5" />,
    color: 'text-yellow-300',
  },
  advanced: {
    label: 'Advanced',
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    color: 'text-orange-300',
  },
  'role-specific': {
    label: 'Your Role',
    icon: <Zap className="w-3.5 h-3.5" />,
    color: 'text-pink-300',
  },
}

const EXPERIENCE_LABEL: Record<ExperienceLevel, string> = {
  beginner: 'New to AI',
  intermediate: 'Getting Started',
  advanced: 'Comfortable User',
}

export default function LearningSidebar({ userProfile, onTopicClick }: Props) {
  const topics = getLearningPath(userProfile.role, userProfile.experience)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [expandedCategory, setExpandedCategory] = useState<string | null>('all')

  // Group by category
  const grouped = topics.reduce<Record<string, LearningTopic[]>>((acc, topic) => {
    const key = topic.category
    if (!acc[key]) acc[key] = []
    acc[key].push(topic)
    return acc
  }, {})

  const completedCount = completedIds.size
  const progressPct = Math.round((completedCount / topics.length) * 100)

  function toggleComplete(id: string) {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <aside className="w-72 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col h-full overflow-hidden">
      {/* Profile summary */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sidebar-primary/30 border border-sidebar-primary/40 flex items-center justify-center text-sidebar-foreground font-bold text-sm shrink-0">
            {userProfile.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-sidebar-foreground truncate">
              {userProfile.name}
            </p>
            <p className="text-xs text-sidebar-foreground/70 truncate">{userProfile.role}</p>
          </div>
        </div>

        {/* Experience badge */}
        <div className="inline-flex items-center gap-1.5 bg-sidebar-accent/40 border border-sidebar-border/60 text-sidebar-foreground/90 text-xs px-2.5 py-1 rounded-full mb-4">
          <GraduationCap className="w-3 h-3" />
          {EXPERIENCE_LABEL[userProfile.experience]}
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-xs text-sidebar-foreground/70 mb-1.5">
            <span>Learning progress</span>
            <span className="font-semibold text-sidebar-foreground">
              {completedCount}/{topics.length}
            </span>
          </div>
          <div className="h-1.5 bg-sidebar-accent/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-sidebar-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="text-xs text-sidebar-foreground/60 mt-1">{progressPct}% complete</p>
        </div>
      </div>

      {/* Topics list */}
      <div className="flex-1 overflow-y-auto py-3">
        <p className="px-4 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
          Your Learning Path
        </p>

        {Object.entries(grouped).map(([category, categoryTopics]) => {
          const meta = CATEGORY_META[category as LearningTopic['category']]
          const isExpanded = expandedCategory === category || expandedCategory === 'all'
          const categoryCompleted = categoryTopics.filter((t) => completedIds.has(t.id)).length

          return (
            <div key={category} className="mb-1">
              {/* Category header */}
              <button
                onClick={() =>
                  setExpandedCategory(isExpanded && expandedCategory === category ? null : category)
                }
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-sidebar-accent/20 transition-colors"
              >
                <span className={cn('shrink-0', meta.color)}>{meta.icon}</span>
                <span className="flex-1 text-xs font-semibold text-sidebar-foreground/80">
                  {meta.label}
                </span>
                <span className="text-xs text-sidebar-foreground/50">
                  {categoryCompleted}/{categoryTopics.length}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-3 h-3 text-sidebar-foreground/40" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-sidebar-foreground/40" />
                )}
              </button>

              {/* Topics */}
              {isExpanded &&
                categoryTopics.map((topic) => (
                  <TopicItem
                    key={topic.id}
                    topic={topic}
                    isCompleted={completedIds.has(topic.id)}
                    onToggleComplete={() => toggleComplete(topic.id)}
                    onAskAbout={() => onTopicClick(topic)}
                  />
                ))}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border/50">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          Powered by NatWest AI Academy
        </p>
      </div>
    </aside>
  )
}

function TopicItem({
  topic,
  isCompleted,
  onToggleComplete,
  onAskAbout,
}: {
  topic: LearningTopic
  isCompleted: boolean
  onToggleComplete: () => void
  onAskAbout: () => void
}) {
  return (
    <div
      className={cn(
        'mx-2 mb-0.5 rounded-lg transition-all',
        isCompleted ? 'opacity-60' : 'opacity-100'
      )}
    >
      <div className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-sidebar-accent/20 group">
        {/* Checkbox */}
        <button
          onClick={onToggleComplete}
          className={cn(
            'mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all',
            isCompleted
              ? 'bg-sidebar-primary border-sidebar-primary'
              : 'border-sidebar-foreground/30 hover:border-sidebar-primary/60'
          )}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isCompleted && (
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="none"
              viewBox="0 0 12 12"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M2 6l3 3 5-5" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <button
            onClick={onAskAbout}
            className="text-left w-full"
            aria-label={`Ask about ${topic.title}`}
          >
            <p
              className={cn(
                'text-xs font-medium leading-snug',
                isCompleted
                  ? 'line-through text-sidebar-foreground/50'
                  : 'text-sidebar-foreground group-hover:text-white'
              )}
            >
              {topic.title}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock className="w-2.5 h-2.5 text-sidebar-foreground/40" />
              <span className="text-xs text-sidebar-foreground/40">{topic.estimatedTime}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
