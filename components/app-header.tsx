'use client'

import { useState } from 'react'
import { LogOut, PanelLeftClose, PanelLeftOpen, GraduationCap } from 'lucide-react'
import { NatWestLogo } from '@/components/onboarding'
import type { UserProfile } from '@/components/onboarding'

type Props = {
  userProfile: UserProfile
  sidebarOpen: boolean
  onToggleSidebar: () => void
  onReset: () => void
}

export default function AppHeader({ userProfile, sidebarOpen, onToggleSidebar, onReset }: Props) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <header className="h-14 bg-primary border-b border-primary/80 flex items-center px-4 gap-3 shrink-0">
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors p-1 rounded"
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? (
          <PanelLeftClose className="w-5 h-5" />
        ) : (
          <PanelLeftOpen className="w-5 h-5" />
        )}
      </button>

      {/* Logo + title */}
      <div className="flex items-center gap-2.5">
        <NatWestLogo />
        <div>
          <span className="text-primary-foreground font-semibold text-sm leading-none block">
            NatWest AI Academy
          </span>
          <span className="text-primary-foreground/60 text-xs leading-none">
            Personalised AI Learning
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User info */}
      <div className="flex items-center gap-2 text-primary-foreground/80">
        <div className="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{userProfile.name}</span>
          <span className="text-primary-foreground/50">·</span>
          <span className="text-xs text-primary-foreground/70">{userProfile.role}</span>
        </div>

        {/* Reset / logout */}
        {showConfirm ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary-foreground/70">Start over?</span>
            <button
              onClick={onReset}
              className="text-xs bg-accent hover:bg-accent/80 text-accent-foreground px-2 py-1 rounded font-medium transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="text-xs text-primary-foreground/60 hover:text-primary-foreground px-2 py-1 rounded transition-colors"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="p-1.5 rounded text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10 transition-all"
            aria-label="Reset profile"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  )
}
