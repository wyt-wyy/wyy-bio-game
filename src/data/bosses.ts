export type BossId = 'oil' | 'coke' | 'icecream';

export interface Boss {
  id: BossId;
  maxHp: number;
  /** question ids (1-based) this boss covers */
  questionIds: number[];
  weightPenalty: number;
  name: { en: string; zh: string };
  color: string;
}

export const bosses: Boss[] = [
  {
    id: 'oil',
    maxHp: 3,
    questionIds: [1, 2, 3],
    weightPenalty: 20,
    name: { en: 'Oil Monster', zh: '油脂怪物' },
    color: '#e8a838',
  },
  {
    id: 'coke',
    maxHp: 3,
    questionIds: [4, 5, 6],
    weightPenalty: 20,
    name: { en: 'Coke Evil', zh: '可樂邪惡' },
    color: '#8b1a2b',
  },
  {
    id: 'icecream',
    maxHp: 5,
    questionIds: [7, 8, 9, 10, 11],
    weightPenalty: 50,
    name: { en: 'Ice cream Bad Man', zh: '雪糕壞人' },
    color: '#f5a0c0',
  },
];

export const START_WEIGHT = 60;
export const GAME_OVER_WEIGHT = 90;
