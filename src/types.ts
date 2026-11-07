export interface Chapter {
  id: string;
  title: string;
  short: string;
  start: number;
  end: number;
  icon: string;
}

export interface SummaryBlock {
  type: string;
  title?: string;
  kicker?: string;
  text?: string;
  items?: (string | { num?: string; title?: string; text?: string })[];
  steps?: { title: string; text: string }[];
  cols?: { title: string; text: string }[];
  rows?: { label: string; val: string }[];
  note?: string;
  src?: string;
}

export interface Summary {
  id: string;
  title: string;
  lead: string;
  icon: string;
  pages: number[];
  blocks: SummaryBlock[];
  action?: {
    href: string;
    label: string;
  } | [string, string];
}

export interface PromptItem {
  id: number;
  title: string;
  origin: string;
  generated: string;
  pages: number[];
}

export interface PracticalCase {
  label: string;
  topic: string;
  page: number;
  blocks: (
    | { type: 'p'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'note'; title?: string; text: string }
  )[];
}

export interface ChecklistGroup {
  title: string;
  items: string[];
  page: number;
}

export interface ContractModel {
  id: string;
  title: string;
  text: string;
  page: number;
}

export interface GlossaryTerm {
  term: string;
  text: string;
  page: number;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number | string;
  part: number;
  question: string;
  options: QuizOption[];
  answer: string;
  explanation: string;
  page: number;
  evidence: string;
}

export interface AppData {
  chapters: Chapter[];
  prompts: PromptItem[];
  models: ContractModel[];
  checks: ChecklistGroup[];
  ten: any[];
  glossary: GlossaryTerm[];
  practical: PracticalCase[];
  summaries: Summary[];
  quizzes: QuizQuestion[];
  diagram: string;
}
