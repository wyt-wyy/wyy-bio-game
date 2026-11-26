import { useState } from 'react';
import { Battle } from './components/Battle';
import { Chapter5 } from './components/Chapter5';
import { HomePage } from './components/HomePage';
import type { Lang } from './data/i18n';

type Screen = 'home' | 'ch5' | 'battle';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => setLang((l) => (l === 'en' ? 'zh' : 'en'));

  if (screen === 'battle') {
    return (
      <Battle
        lang={lang}
        onToggleLang={toggleLang}
        onHome={() => setScreen('home')}
      />
    );
  }

  if (screen === 'ch5') {
    return (
      <Chapter5
        lang={lang}
        onBack={() => setScreen('home')}
        onStartGame={() => setScreen('battle')}
        onToggleLang={toggleLang}
      />
    );
  }

  return (
    <HomePage
      lang={lang}
      onSelectCh5={() => setScreen('ch5')}
      onToggleLang={toggleLang}
    />
  );
}
