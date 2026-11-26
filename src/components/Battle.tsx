import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  bosses,
  GAME_OVER_WEIGHT,
  START_WEIGHT,
  type Boss,
} from '../data/bosses';
import { hints } from '../data/hints';
import { ui, type Lang } from '../data/i18n';
import {
  getQuestionText,
  isCorrectChoice,
  questions,
  shuffleChoices,
  type ShuffledChoice,
} from '../data/questions';
import { BossSprite, MrWongSprite } from './Sprites';

type Phase =
  | 'menu'
  | 'fight'
  | 'help'
  | 'feedback'
  | 'bossDown'
  | 'nextBoss'
  | 'victory'
  | 'gameover';

interface Props {
  lang: Lang;
  onToggleLang: () => void;
  onHome: () => void;
}

function formatElapsed(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function bossForQuestion(qIndex: number): { boss: Boss; bossIndex: number } {
  const qId = questions[qIndex].id;
  const bossIndex = bosses.findIndex((b) => b.questionIds.includes(qId));
  return { boss: bosses[bossIndex], bossIndex };
}

export function Battle({ lang, onToggleLang, onHome }: Props) {
  const [weight, setWeight] = useState(START_WEIGHT);
  const [qIndex, setQIndex] = useState(0);
  const [bossHp, setBossHp] = useState(bosses[0].maxHp);
  const [bossIndex, setBossIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('menu');
  const [message, setMessage] = useState('');
  const [choices, setChoices] = useState<ShuffledChoice[]>([]);
  const [playerHit, setPlayerHit] = useState(false);
  const [playerFat, setPlayerFat] = useState(false);
  const [bossHurt, setBossHurt] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const startedAtRef = useRef(Date.now());

  const boss = bosses[bossIndex];

  const resetGame = useCallback(() => {
    setWeight(START_WEIGHT);
    setQIndex(0);
    setBossIndex(0);
    setBossHp(bosses[0].maxHp);
    setPhase('menu');
    setMessage(ui.whatWill[lang]);
    setChoices([]);
    setPlayerHit(false);
    setPlayerFat(false);
    setBossHurt(false);
    startedAtRef.current = Date.now();
    setElapsedMs(0);
    setTimerRunning(true);
  }, [lang]);

  useEffect(() => {
    setMessage((prev) => {
      // Keep contextual feedback; refresh only menu / empty prompts on lang switch
      if (!prev || prev === ui.whatWill.en || prev === ui.whatWill.zh) {
        return ui.whatWill[lang];
      }
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    if (!timerRunning) return;
    const tick = () => {
      setElapsedMs(Date.now() - startedAtRef.current);
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    if (phase === 'victory' || phase === 'gameover') {
      setTimerRunning(false);
      setElapsedMs(Date.now() - startedAtRef.current);
    }
  }, [phase]);

  const openFight = () => {
    const q = questions[qIndex];
    setChoices(shuffleChoices(q, lang));
    setPhase('fight');
    setMessage(getQuestionText(q, lang));
  };

  const openHelp = () => {
    const q = questions[qIndex];
    const tip = hints[q.id];
    setPhase('help');
    setMessage(`${ui.hintTitle[lang]}: ${tip[lang]}`);
  };

  const afterFeedback = () => {
    if (phase === 'gameover' || phase === 'victory') return;

    if (phase === 'help') {
      setPhase('menu');
      setMessage(ui.whatWill[lang]);
      return;
    }

    if (phase === 'bossDown') {
      const next = bossIndex + 1;
      if (next >= bosses.length) {
        setPhase('victory');
        setMessage(ui.victory[lang]);
        return;
      }
      setBossIndex(next);
      setBossHp(bosses[next].maxHp);
      setPhase('nextBoss');
      setMessage(ui.nextBoss[lang](bosses[next].name[lang]));
      return;
    }

    if (phase === 'nextBoss') {
      setPhase('menu');
      setMessage(ui.whatWill[lang]);
      return;
    }

    // feedback after answer
    if (weight >= GAME_OVER_WEIGHT) {
      setPhase('gameover');
      setMessage(ui.gameOver[lang]);
      return;
    }

    if (bossHp <= 0) {
      setPhase('bossDown');
      setMessage(ui.bossDefeated[lang](boss.name[lang]));
      return;
    }

    setPhase('menu');
    setMessage(ui.whatWill[lang]);
  };

  const answerChoice = (choice: ShuffledChoice) => {
    const q = questions[qIndex];
    const correct = isCorrectChoice(q, choice);
    const currentBoss = bossForQuestion(qIndex).boss;

    if (correct) {
      setBossHurt(true);
      setPlayerHit(true);
      const newHp = bossHp - 1;
      setBossHp(newHp);
      setMessage(ui.correct[lang]);
      setPhase('feedback');

      window.setTimeout(() => {
        setBossHurt(false);
        setPlayerHit(false);
      }, 600);

      if (qIndex < questions.length - 1) {
        setQIndex((i) => i + 1);
      }

      // if last question of this boss and hp hits 0, handled in afterFeedback
      if (newHp <= 0) {
        // stay in feedback; next continue → bossDown
      }
    } else {
      const penalty = currentBoss.weightPenalty;
      setPlayerFat(true);
      const newWeight = weight + penalty;
      setWeight(newWeight);
      setMessage(
        `${ui.wrong[lang]} ${ui.weightUp[lang](penalty)}`,
      );
      setPhase('feedback');
      window.setTimeout(() => setPlayerFat(false), 800);
    }
  };

  const hpSegments = useMemo(() => {
    return Array.from({ length: boss.maxHp }, (_, i) => i < bossHp);
  }, [boss.maxHp, bossHp]);

  const weightPct = Math.min(100, ((weight - START_WEIGHT) / (GAME_OVER_WEIGHT - START_WEIGHT)) * 100);
  const weightBarColor =
    weight >= 85 ? '#e74c3c' : weight >= 75 ? '#f39c12' : '#2ecc71';
  const elapsedLabel = formatElapsed(elapsedMs);
  const isEnded = phase === 'victory' || phase === 'gameover';

  return (
    <div className="battle-screen">
      <div className="battle-field">
        <div className="sky" />
        <div className="grass" />

        <div className="battle-timer" aria-live="polite">
          <span className="battle-timer-label">{ui.time[lang]}</span>
          <span className="battle-timer-value">{elapsedLabel}</span>
        </div>

        <div className="enemy-hud">
          <div className="hud-box">
            <div className="hud-name-row">
              <span className="hud-name">{boss.name[lang]}</span>
              <span className="hud-lv">Q{qIndex + 1}/11</span>
            </div>
            <div className="hp-row">
              <span className="hp-label">{ui.hp[lang]}</span>
              <div className="hp-segments">
                {hpSegments.map((filled, i) => (
                  <span
                    key={i}
                    className={`hp-seg ${filled ? 'filled' : 'empty'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="enemy-platform">
          <BossSprite id={boss.id} hit={bossHurt} />
        </div>

        <div className="player-platform">
          <MrWongSprite hit={playerHit} fat={playerFat} />
        </div>

        <div className="player-hud">
          <div className="hud-box player">
            <div className="hud-name-row">
              <span className="hud-name">Mr. Wong</span>
              <span className="hud-lv">Lv.Bio</span>
            </div>
            <div className="hp-row">
              <span className="hp-label">{ui.bodyWeight[lang]}</span>
              <div className="weight-bar-track">
                <div
                  className="weight-bar-fill"
                  style={{
                    width: `${Math.max(8, 100 - weightPct)}%`,
                    background: weightBarColor,
                  }}
                />
              </div>
            </div>
            <div className="weight-num">
              {weight} / {GAME_OVER_WEIGHT} kg
            </div>
          </div>
        </div>
      </div>

      <div className="battle-ui">
        <div className={`dialogue-box${phase === 'fight' ? ' fight-mode' : ''}`}>
          <p className={`dialogue-text${phase === 'fight' ? ' fight-q' : ''}`}>
            {message}
          </p>
          {isEnded && (
            <p className="final-time">
              {ui.finalTime[lang]}: {elapsedLabel}
            </p>
          )}
          {(phase === 'feedback' ||
            phase === 'bossDown' ||
            phase === 'nextBoss' ||
            phase === 'help') && (
            <button type="button" className="continue-btn" onClick={afterFeedback}>
              {ui.continue[lang]}
            </button>
          )}
          {isEnded && (
            <div className="end-actions">
              <button type="button" className="continue-btn" onClick={resetGame}>
                {ui.playAgain[lang]}
              </button>
              <button type="button" className="continue-btn secondary" onClick={onHome}>
                {ui.home[lang]}
              </button>
            </div>
          )}
        </div>

        {phase === 'menu' && (
          <div className="command-menu">
            <button type="button" className="cmd fight" onClick={openFight}>
              {ui.fight[lang]}
            </button>
            <button
              type="button"
              className="cmd switch"
              onClick={onToggleLang}
            >
              {ui.switch[lang]}
              <small>EN↔繁中</small>
            </button>
            <button type="button" className="cmd help" onClick={openHelp}>
              {ui.help[lang]}
            </button>
            <button type="button" className="cmd run" onClick={onHome}>
              {ui.run[lang]}
            </button>
          </div>
        )}

        {phase === 'fight' && (
          <div className="mc-menu">
            {choices.map((c, i) => (
              <button
                key={`${c.originalIndex}-${i}`}
                type="button"
                className="mc-btn"
                onClick={() => answerChoice(c)}
              >
                <span className="mc-letter">{String.fromCharCode(65 + i)}</span>
                <span className="mc-text">{c.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
