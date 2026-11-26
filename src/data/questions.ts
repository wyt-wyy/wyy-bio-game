import raw from './mc-questions.json';
import type { Lang } from './i18n';

export interface Question {
  id: number;
  en: { q: string; choices: string[] };
  zh: { q: string; choices: string[] };
  answer: number;
}

export const questions = raw as Question[];

export interface ShuffledChoice {
  text: string;
  originalIndex: number;
}

export function getQuestionText(q: Question, lang: Lang): string {
  return q[lang].q;
}

export function shuffleChoices(q: Question, lang: Lang): ShuffledChoice[] {
  const choices = q[lang].choices.map((text, originalIndex) => ({
    text,
    originalIndex,
  }));
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return choices;
}

export function isCorrectChoice(
  q: Question,
  choice: ShuffledChoice,
): boolean {
  return choice.originalIndex === q.answer;
}
