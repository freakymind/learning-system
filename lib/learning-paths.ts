export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'

export type LearningTopic = {
  id: string
  title: string
  description: string
  estimatedTime: string
  category: 'foundations' | 'prompting' | 'tools' | 'advanced' | 'role-specific'
}

export const ROLES = [
  'Software Engineer',
  'Product Manager',
  'Business Analyst',
  'Data Scientist',
  'Customer Service',
  'Risk & Compliance',
  'Finance',
  'Marketing',
  'Manager / Leader',
  'Strategy Manager',
  'Other',
] as const

export type Role = (typeof ROLES)[number]

const FOUNDATION_TOPICS: LearningTopic[] = [
  {
    id: 'what-is-ai',
    title: 'What is AI & LLMs?',
    description: 'Understand the basics of artificial intelligence and large language models.',
    estimatedTime: '10 min',
    category: 'foundations',
  },
  {
    id: 'how-llms-work',
    title: 'How LLMs Process Text',
    description: 'Learn how models like ChatGPT read, understand, and generate responses.',
    estimatedTime: '15 min',
    category: 'foundations',
  },
  {
    id: 'intro-prompting',
    title: 'Introduction to Prompting',
    description: 'Your first steps in writing effective instructions for AI.',
    estimatedTime: '12 min',
    category: 'prompting',
  },
  {
    id: 'zero-shot-few-shot',
    title: 'Zero-shot vs Few-shot Prompting',
    description: 'Discover the difference and when to use examples in your prompts.',
    estimatedTime: '15 min',
    category: 'prompting',
  },
]

const INTERMEDIATE_TOPICS: LearningTopic[] = [
  {
    id: 'chain-of-thought',
    title: 'Chain-of-Thought Prompting',
    description: 'Guide the model to reason step by step for better accuracy.',
    estimatedTime: '20 min',
    category: 'prompting',
  },
  {
    id: 'role-persona-prompting',
    title: 'Role & Persona Prompting',
    description: 'Tell the AI who to be to get better, more targeted responses.',
    estimatedTime: '15 min',
    category: 'prompting',
  },
  {
    id: 'context-management',
    title: 'Managing Context Windows',
    description: 'Understand how memory works in AI and how to use it effectively.',
    estimatedTime: '20 min',
    category: 'prompting',
  },
  {
    id: 'prompt-templates',
    title: 'Prompt Templates & Patterns',
    description: 'Build reusable prompt structures for consistent, high-quality outputs.',
    estimatedTime: '25 min',
    category: 'prompting',
  },
]

const ADVANCED_TOPICS: LearningTopic[] = [
  {
    id: 'ai-agents',
    title: 'AI Agents & Autonomous Workflows',
    description: 'Understand how agents plan, use tools, and complete multi-step tasks.',
    estimatedTime: '30 min',
    category: 'advanced',
  },
  {
    id: 'rag',
    title: 'Retrieval-Augmented Generation (RAG)',
    description: 'Combine AI with your own data sources for grounded, accurate answers.',
    estimatedTime: '35 min',
    category: 'advanced',
  },
  {
    id: 'ai-safety-bias',
    title: 'AI Safety, Bias & Hallucinations',
    description: 'Identify risks, handle uncertainty, and build responsible AI workflows.',
    estimatedTime: '25 min',
    category: 'advanced',
  },
  {
    id: 'fine-tuning',
    title: 'Fine-tuning & Custom Models',
    description: 'Learn when and how to adapt models to specific tasks or knowledge.',
    estimatedTime: '30 min',
    category: 'advanced',
  },
]

const ROLE_SPECIFIC_TOPICS: Record<string, LearningTopic[]> = {
  'Software Engineer': [
    {
      id: 'copilot-code-gen',
      title: 'AI Code Generation & GitHub Copilot',
      description: 'Use AI to write, review, and debug code faster.',
      estimatedTime: '25 min',
      category: 'role-specific',
    },
    {
      id: 'ai-testing',
      title: 'AI-Assisted Testing & Documentation',
      description: 'Auto-generate tests, docs, and comments with AI.',
      estimatedTime: '20 min',
      category: 'role-specific',
    },
  ],
  'Product Manager': [
    {
      id: 'ai-user-research',
      title: 'AI for User Research & Insight',
      description: 'Use AI to analyse feedback, interviews, and usage data.',
      estimatedTime: '20 min',
      category: 'role-specific',
    },
    {
      id: 'ai-specs',
      title: 'Writing PRDs & Specs with AI',
      description: 'Accelerate product spec creation with AI assistance.',
      estimatedTime: '20 min',
      category: 'role-specific',
    },
  ],
  'Business Analyst': [
    {
      id: 'ai-data-analysis',
      title: 'AI for Data Analysis & Reporting',
      description: 'Use AI to interpret datasets, spot trends, and write reports.',
      estimatedTime: '25 min',
      category: 'role-specific',
    },
    {
      id: 'ai-requirements',
      title: 'Gathering Requirements with AI',
      description: 'Structure stakeholder interviews and write requirements faster.',
      estimatedTime: '20 min',
      category: 'role-specific',
    },
  ],
  'Data Scientist': [
    {
      id: 'ai-mlops',
      title: 'MLOps & AI Model Pipelines',
      description: 'Understand how to deploy and monitor ML models at scale.',
      estimatedTime: '35 min',
      category: 'role-specific',
    },
    {
      id: 'ai-notebooks',
      title: 'AI-Assisted Data Notebooks',
      description: 'Accelerate EDA and model building with AI copilots.',
      estimatedTime: '25 min',
      category: 'role-specific',
    },
  ],
  'Customer Service': [
    {
      id: 'ai-response-templates',
      title: 'AI Response Templates & Tone',
      description: 'Use AI to draft consistent, empathetic customer responses.',
      estimatedTime: '15 min',
      category: 'role-specific',
    },
    {
      id: 'ai-sentiment',
      title: 'Sentiment Analysis & Triage',
      description: 'Understand how AI can detect urgency and route queries.',
      estimatedTime: '15 min',
      category: 'role-specific',
    },
  ],
  'Risk & Compliance': [
    {
      id: 'ai-policy-review',
      title: 'AI for Policy & Document Review',
      description: 'Use AI to surface risks in documents and policies quickly.',
      estimatedTime: '25 min',
      category: 'role-specific',
    },
    {
      id: 'ai-risk-governance',
      title: 'AI Risk & Governance Frameworks',
      description: 'Understand how to govern AI responsibly within regulations.',
      estimatedTime: '30 min',
      category: 'role-specific',
    },
  ],
  Finance: [
    {
      id: 'ai-forecasting',
      title: 'AI for Financial Forecasting',
      description: 'Use AI to assist modelling, forecasting, and trend analysis.',
      estimatedTime: '25 min',
      category: 'role-specific',
    },
    {
      id: 'ai-report-writing',
      title: 'AI-Assisted Report Writing',
      description: 'Draft commentary, summaries, and presentations with AI.',
      estimatedTime: '20 min',
      category: 'role-specific',
    },
  ],
  Marketing: [
    {
      id: 'ai-copy',
      title: 'AI for Copywriting & Campaigns',
      description: 'Generate, refine, and A/B test marketing content with AI.',
      estimatedTime: '20 min',
      category: 'role-specific',
    },
    {
      id: 'ai-personalisation',
      title: 'Personalisation & Segmentation with AI',
      description: 'Use AI to tailor messaging and identify audience segments.',
      estimatedTime: '20 min',
      category: 'role-specific',
    },
  ],
  'Manager / Leader': [
    {
      id: 'ai-summarisation',
      title: 'AI Summarisation & Briefing',
      description: 'Quickly digest long documents and get clear summaries.',
      estimatedTime: '15 min',
      category: 'role-specific',
    },
    {
      id: 'ai-strategy',
      title: 'Strategic AI Adoption for Teams',
      description: 'How to introduce AI tools and upskill your team effectively.',
      estimatedTime: '25 min',
      category: 'role-specific',
    },
  ],
  'Strategy Manager': [
    {
      id: 'ai-strategy-analysis',
      title: 'AI for Strategic Analysis',
      description: 'Use AI to synthesise market data, competitor signals, and internal insights into sharp strategic views.',
      estimatedTime: '25 min',
      category: 'role-specific',
    },
    {
      id: 'ai-scenario-planning',
      title: 'Scenario Planning with AI',
      description: 'Generate, stress-test, and refine strategic scenarios faster with AI as a thinking partner.',
      estimatedTime: '25 min',
      category: 'role-specific',
    },
    {
      id: 'ai-exec-comms',
      title: 'AI for Executive Communications',
      description: 'Draft compelling board papers, strategy decks, and briefing notes with AI assistance.',
      estimatedTime: '20 min',
      category: 'role-specific',
    },
  ],
  Other: [
    {
      id: 'ai-productivity',
      title: 'AI for Daily Productivity',
      description: 'Practical ways to use AI to save time in everyday work.',
      estimatedTime: '15 min',
      category: 'role-specific',
    },
  ],
}

export function getLearningPath(role: string, experience: ExperienceLevel): LearningTopic[] {
  const roleTopics = ROLE_SPECIFIC_TOPICS[role] ?? ROLE_SPECIFIC_TOPICS['Other']

  if (experience === 'beginner') {
    return [...FOUNDATION_TOPICS, ...roleTopics]
  }
  if (experience === 'intermediate') {
    return [...INTERMEDIATE_TOPICS, ...roleTopics]
  }
  return [...ADVANCED_TOPICS, ...roleTopics]
}
