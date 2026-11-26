export type Lang = 'en' | 'zh';

export const ui = {
  brand: { en: 'WYY Bio Game', zh: 'WYY 生物遊戲' },
  tagline: {
    en: 'Learn biology. Save Mr. Wong.',
    zh: '學習生物，拯救黃老師。',
  },
  chapters: { en: 'Choose a chapter', zh: '選擇章節' },
  underConstruction: { en: 'Under construction', zh: '建設中' },
  available: { en: 'Play', zh: '開始' },
  ch2: { en: 'Ch2 Cell', zh: '第2章 細胞' },
  ch3: {
    en: 'Ch3 Movement across the cell membrane',
    zh: '第3章 物質進出細胞',
  },
  ch4: { en: 'Ch4 Enzymes', zh: '第4章 酶' },
  ch5: { en: 'Ch5 Food and Nutrition', zh: '第5章 食物與營養' },
  games: { en: 'Games', zh: '遊戲' },
  saveMrWong: {
    en: 'Save Mr. Wong — Keep fit (Balanced Diet)',
    zh: '拯救黃老師 — 保持健康（均衡膳食）',
  },
  back: { en: '← Back', zh: '← 返回' },
  fight: { en: 'FIGHT', zh: '戰鬥' },
  switch: { en: 'SWITCH', zh: '轉換' },
  help: { en: 'HELP', zh: '提示' },
  run: { en: 'RUN', zh: '逃跑' },
  whatWill: {
    en: 'What will Mr. Wong do?',
    zh: '黃老師要做什麼？',
  },
  bodyWeight: { en: 'Body Weight', zh: '體重' },
  hp: { en: 'HP', zh: 'HP' },
  correct: {
    en: 'Correct! Mr. Wong lands a healthy hit!',
    zh: '正確！黃老師打出健康一擊！',
  },
  wrong: {
    en: 'Wrong! The monster throws fat!',
    zh: '答錯了！怪物拋出脂肪！',
  },
  weightUp: {
    en: (kg: number) => `Body Weight +${kg} kg!`,
    zh: (kg: number) => `體重 +${kg} kg！`,
  },
  bossDefeated: {
    en: (name: string) => `${name} fainted!`,
    zh: (name: string) => `${name} 倒下了！`,
  },
  nextBoss: {
    en: (name: string) => `A wild ${name} appears!`,
    zh: (name: string) => `野生的 ${name} 出現了！`,
  },
  victory: {
    en: 'Victory, You help Mr. Wong to keep fit!!',
    zh: '勝利！你幫助黃老師保持健康了！！',
  },
  gameOver: {
    en: 'Game Over! Mr. Wong is too heavy (≥ 90 kg). Tap Play again to retry, or Home to leave.',
    zh: '遊戲結束！黃老師太重了（≥ 90 kg）。按「再玩一次」重試，或按「主頁」離開。',
  },
  hintTitle: { en: 'Help tip', zh: '提示' },
  continue: { en: 'Continue ▶', zh: '繼續 ▶' },
  playAgain: { en: 'Play again', zh: '再玩一次' },
  home: { en: 'Home', zh: '主頁' },
  time: { en: 'Time', zh: '時間' },
  finalTime: { en: 'Time', zh: '用時' },
  teacher: {
    en: 'For Biology teachers & students',
    zh: '適合生物科老師與學生',
  },
};

export function t(
  key: keyof typeof ui,
  lang: Lang,
  ...args: never[]
): string {
  const val = ui[key];
  if (typeof val === 'object' && 'en' in val) {
    const v = val[lang];
    if (typeof v === 'function') {
      return (v as (...a: never[]) => string)(...args);
    }
    return v as string;
  }
  return String(val);
}
