'use client'

import { useState } from 'react'
import HomepageLanding from '@/components/homepage-landing'
import Onboarding, { type UserProfile } from '@/components/onboarding'
import AppHeader from '@/components/app-header'
import LearningSidebar from '@/components/learning-sidebar'
import ChatInterface from '@/components/chat-interface'
import type { LearningTopic } from '@/lib/learning-paths'

type AppView = 'landing' | 'onboarding' | 'app'

export default function HomePage() {
  const [view, setView] = useState<AppView>('landing')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [pendingTopic, setPendingTopic] = useState<LearningTopic | null>(null)

  if (view === 'landing') {
    return <HomepageLanding onGetStarted={() => setView('onboarding')} />
  }

  if (view === 'onboarding' || !userProfile) {
    return (
      <Onboarding
        onComplete={(profile) => {
          setUserProfile(profile)
          setView('app')
        }}
      />
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <AppHeader
        userProfile={userProfile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        onReset={() => {
          setUserProfile(null)
          setView('landing')
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Learning sidebar */}
        {sidebarOpen && (
          <LearningSidebar
            userProfile={userProfile}
            onTopicClick={(topic) => {
              setPendingTopic(topic)
            }}
          />
        )}

        {/* Main chat area */}
        <main className="flex-1 overflow-hidden flex flex-col bg-background">
          {/* Topic banner — when user clicks a topic from sidebar */}
          {pendingTopic && (
            <div className="bg-secondary border-b border-border px-4 py-2 flex items-center justify-between">
              <p className="text-sm text-secondary-foreground">
                <span className="font-medium">Study: </span>
                {pendingTopic.title}
              </p>
              <button
                onClick={() => setPendingTopic(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}

          <ChatInterface
            userProfile={userProfile}
            pendingTopic={pendingTopic}
            onTopicConsumed={() => setPendingTopic(null)}
          />
        </main>
      </div>
    </div>
  )
}
