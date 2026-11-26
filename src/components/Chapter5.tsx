import type { Lang } from '../data/i18n';
import { ui } from '../data/i18n';

interface Props {
  lang: Lang;
  onBack: () => void;
  onStartGame: () => void;
  onToggleLang: () => void;
}

export function Chapter5({ lang, onBack, onStartGame, onToggleLang }: Props) {
  return (
    <div className="page chapter-page">
      <div className="home-bg soft" />
      <header className="page-bar">
        <button type="button" className="text-btn" onClick={onBack}>
          {ui.back[lang]}
        </button>
        <button type="button" className="lang-pill" onClick={onToggleLang}>
          {lang === 'en' ? '繁中' : 'EN'}
        </button>
      </header>

      <main className="chapter-main">
        <h1 className="chapter-heading">{ui.ch5[lang]}</h1>
        <p className="section-title">{ui.games[lang]}</p>

        <button type="button" className="game-entry" onClick={onStartGame}>
          <span className="game-entry-icon" aria-hidden>
            <svg viewBox="0 0 48 48" width="40" height="40">
              <circle cx="24" cy="24" r="22" fill="#1fa97a" />
              <ellipse cx="24" cy="26" rx="12" ry="10" fill="#fff8e8" />
              <circle cx="18" cy="18" r="4" fill="#ff6b6b" />
              <circle cx="28" cy="16" r="3.5" fill="#ffd56a" />
              <circle cx="32" cy="24" r="3" fill="#7ddea8" />
            </svg>
          </span>
          <span className="game-entry-text">
            <strong>{ui.saveMrWong[lang]}</strong>
            <small>
              {lang === 'en'
                ? 'Pokémon-style quiz battle · Balanced diet'
                : '寶可夢風格問答對戰 · 均衡膳食'}
            </small>
          </span>
          <span className="game-entry-go">▶</span>
        </button>
      </main>
    </div>
  );
}
