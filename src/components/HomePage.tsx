import type { Lang } from '../data/i18n';
import { ui } from '../data/i18n';

interface Props {
  lang: Lang;
  onSelectCh5: () => void;
  onToggleLang: () => void;
}

const chapters = [
  { key: 'ch2' as const, locked: true },
  { key: 'ch3' as const, locked: true },
  { key: 'ch4' as const, locked: true },
  { key: 'ch5' as const, locked: false },
];

export function HomePage({ lang, onSelectCh5, onToggleLang }: Props) {
  return (
    <div className="page home-page">
      <div className="home-bg" />
      <header className="home-header">
        <button type="button" className="lang-pill" onClick={onToggleLang}>
          {lang === 'en' ? '繁中' : 'EN'}
        </button>
      </header>

      <main className="home-hero">
        <p className="home-eyebrow">{ui.teacher[lang]}</p>
        <h1 className="home-brand">{ui.brand[lang]}</h1>
        <p className="home-tagline">{ui.tagline[lang]}</p>
      </main>

      <section className="chapter-section">
        <h2 className="section-title">{ui.chapters[lang]}</h2>
        <div className="chapter-grid">
          {chapters.map((ch) => (
            <button
              key={ch.key}
              type="button"
              className={`chapter-card ${ch.locked ? 'locked' : 'open'} chapter-${ch.key}`}
              disabled={ch.locked}
              onClick={() => {
                if (!ch.locked) onSelectCh5();
              }}
            >
              <span className="chapter-name">{ui[ch.key][lang]}</span>
              <span className="chapter-badge">
                {ch.locked ? ui.underConstruction[lang] : ui.available[lang]}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
