'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { UserProfile } from '@/components/onboarding'
import type { LearningTopic } from '@/lib/learning-paths'

type Props = {
  userProfile: UserProfile
  pendingTopic?: LearningTopic | null
  onTopicConsumed?: () => void
}

function getInitGreeting(profile: UserProfile): string {
  return `Hello! I'm ready to begin. I'm ${profile.name}, a ${profile.role} with ${profile.experience} experience with AI.`
}

const COACH_CHIPS = [
  'Give me a real example',
  'Quiz me on this',
  'Explain it more simply',
  'How do I apply this at work?',
  'What should I learn next?',
]

export default function ChatInterface({ userProfile, pendingTopic, onTopicConsumed }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [inputValue, setInputValue] = useState('')
  const hasInitialised = useRef(false)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: {
          id,
          messages,
          userProfile,
        },
      }),
    }),
  })

  const isStreaming = status === 'streaming' || status === 'submitted'

  // Send initial greeting on mount
  useEffect(() => {
    if (!hasInitialised.current) {
      hasInitialised.current = true
      sendMessage({ text: getInitGreeting(userProfile) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When user clicks a topic from the sidebar, send a message to ask about it
  useEffect(() => {
    if (pendingTopic && !isStreaming) {
      setInputValue('')
      sendMessage({
        text: `Can you teach me about "${pendingTopic.title}"? — ${pendingTopic.description}`,
      })
      onTopicConsumed?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingTopic])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  function handleSend() {
    const text = inputValue.trim()
    if (!text || isStreaming) return
    setInputValue('')
    sendMessage({ text })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Hide the initial user "Hello" message
  const displayMessages = messages.filter((m, i) => !(i === 0 && m.role === 'user'))

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {displayMessages.length === 0 && (
          <div className="flex justify-center">
            <div className="bg-secondary/60 text-secondary-foreground text-sm rounded-xl px-4 py-3 max-w-xs text-center">
              Connecting you with Natalie, your AI guide...
            </div>
          </div>
        )}

        {displayMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isStreaming && displayMessages[displayMessages.length - 1]?.role !== 'assistant' && (
          <TypingIndicator />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick starters — shown only at the very beginning */}
      {displayMessages.length <= 1 && !isStreaming && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Quick starters</p>
          <div className="flex flex-wrap gap-2">
            {getSuggestedPrompts(userProfile).map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setInputValue('')
                  sendMessage({ text: prompt })
                }}
                className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Coach reply chips — shown after each assistant message */}
      {!isStreaming && displayMessages.length > 1 && displayMessages[displayMessages.length - 1]?.role === 'assistant' && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {COACH_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setInputValue('')
                  sendMessage({ text: chip })
                }}
                className="text-xs bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex items-end gap-3 bg-background rounded-xl border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all px-4 py-3">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              // Auto-resize
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask Natalie anything about AI..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed"
            style={{ minHeight: '24px', maxHeight: '120px' }}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim() || isStreaming}
            className={cn(
              'h-8 w-8 shrink-0 rounded-lg transition-all',
              inputValue.trim() && !isStreaming
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Natalie can make mistakes. Always verify important information.
        </p>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user'

  const textContent = message.parts
    ? message.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map((p) => p.text)
        .join('')
    : ''

  if (!textContent) return null

  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0 mt-0.5"
          aria-hidden="true"
        >
          N
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-card border border-border text-foreground rounded-bl-sm'
        )}
      >
        <FormattedText text={textContent} />
      </div>
      {isUser && (
        <div
          className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold shrink-0 mt-0.5"
          aria-hidden="true"
        >
          Me
        </div>
      )}
    </div>
  )
}

function FormattedText({ text }: { text: string }) {
  // Basic markdown-like formatting: bold, bullets, line breaks
  const lines = text.split('\n')
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        // Bold text **...**
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Bullet points
        if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
          return (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-current opacity-60" />
              <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-•]\s+/, '') }} />
            </div>
          )
        }
        // Numbered list
        if (/^\d+\.\s/.test(line.trim())) {
          return (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 font-semibold opacity-70">
                {line.match(/^\d+/)?.[0]}.
              </span>
              <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^\d+\.\s+/, '') }} />
            </div>
          )
        }
        return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
      })}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
        N
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function getSuggestedPrompts(profile: UserProfile): string[] {
  const rolePrompts: Record<string, string[]> = {
    'Software Engineer': [
      'How can I use AI to write better code?',
      'What is prompt engineering?',
    ],
    'Product Manager': [
      'How can AI help me write better PRDs?',
      'What is prompt engineering?',
    ],
    'Business Analyst': [
      'How can AI speed up my analysis work?',
      'What is a prompt?',
    ],
    'Data Scientist': [
      'How do LLMs differ from traditional ML?',
      'What are AI agents?',
    ],
    'Customer Service': [
      'How can AI help me respond faster?',
      'What is prompt engineering?',
    ],
  }

  const defaults = ['What is a prompt?', "What's the best way to start with AI?"]
  return rolePrompts[profile.role] ?? defaults
}
