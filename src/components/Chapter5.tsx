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
            🥗
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
