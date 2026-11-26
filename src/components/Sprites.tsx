import type { BossId } from '../data/bosses';

export function MrWongSprite({
  hit,
  fat,
}: {
  hit?: boolean;
  fat?: boolean;
}) {
  return (
    <div
      className={`sprite mr-wong ${hit ? 'anim-hit' : ''} ${fat ? 'anim-fat' : ''}`}
      aria-hidden
    >
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        {/* back view teacher */}
        <ellipse cx="60" cy="128" rx="38" ry="8" fill="rgba(0,0,0,0.18)" />
        <rect x="38" y="58" width="44" height="52" rx="8" fill="#2d6cdf" />
        <rect x="42" y="62" width="36" height="18" fill="#1e4fa8" opacity="0.35" />
        <circle cx="60" cy="38" r="22" fill="#f0c4a0" />
        <path
          d="M38 34 Q60 8 82 34"
          fill="#3a2a1a"
          stroke="#3a2a1a"
          strokeWidth="2"
        />
        <rect x="48" y="48" width="24" height="8" rx="2" fill="#c4845a" />
        <rect x="28" y="68" width="14" height="36" rx="6" fill="#f0c4a0" />
        <rect x="78" y="68" width="14" height="36" rx="6" fill="#f0c4a0" />
        <rect x="42" y="106" width="14" height="20" rx="4" fill="#1a1a2e" />
        <rect x="64" y="106" width="14" height="20" rx="4" fill="#1a1a2e" />
        {/* glasses from behind hint */}
        <path d="M42 40 H78" stroke="#333" strokeWidth="2" opacity="0.4" />
      </svg>
      {fat && <div className="fat-blob" />}
    </div>
  );
}

export function BossSprite({
  id,
  hit,
}: {
  id: BossId;
  hit?: boolean;
}) {
  return (
    <div className={`sprite boss boss-${id} ${hit ? 'anim-hurt' : ''}`} aria-hidden>
      {id === 'oil' && <OilMonster />}
      {id === 'coke' && <CokeEvil />}
      {id === 'icecream' && <IceCreamBadMan />}
    </div>
  );
}

function OilMonster() {
  return (
    <svg viewBox="0 0 140 140" width="100%" height="100%">
      <ellipse cx="70" cy="128" rx="40" ry="8" fill="rgba(0,0,0,0.2)" />
      <ellipse cx="70" cy="78" rx="48" ry="42" fill="#e8a838" />
      <ellipse cx="70" cy="78" rx="36" ry="30" fill="#f5c85a" />
      <circle cx="52" cy="70" r="10" fill="#fff" />
      <circle cx="88" cy="70" r="10" fill="#fff" />
      <circle cx="54" cy="72" r="5" fill="#222" />
      <circle cx="90" cy="72" r="5" fill="#222" />
      <path d="M55 95 Q70 108 85 95" stroke="#8a5a10" strokeWidth="3" fill="none" />
      <ellipse cx="70" cy="48" rx="18" ry="10" fill="#c47a20" opacity="0.7" />
      <path d="M30 60 Q20 40 28 28" stroke="#c47a20" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M110 60 Q120 40 112 28" stroke="#c47a20" strokeWidth="8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CokeEvil() {
  return (
    <svg viewBox="0 0 140 140" width="100%" height="100%">
      <ellipse cx="70" cy="128" rx="36" ry="8" fill="rgba(0,0,0,0.2)" />
      <rect x="42" y="36" width="56" height="84" rx="12" fill="#8b1a2b" />
      <rect x="46" y="42" width="48" height="20" rx="4" fill="#fff" opacity="0.9" />
      <text x="70" y="56" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#8b1a2b" fontFamily="sans-serif">
        COKE
      </text>
      <circle cx="55" cy="80" r="8" fill="#fff" />
      <circle cx="85" cy="80" r="8" fill="#fff" />
      <circle cx="57" cy="82" r="4" fill="#111" />
      <circle cx="87" cy="82" r="4" fill="#111" />
      <path d="M58 100 Q70 92 82 100" stroke="#ff6b7a" strokeWidth="3" fill="none" />
      <ellipse cx="70" cy="32" rx="22" ry="8" fill="#ddd" />
      <rect x="62" y="18" width="16" height="16" rx="3" fill="#c0c0c0" />
      {/* bubbles */}
      <circle cx="58" cy="110" r="3" fill="#ffb0b8" opacity="0.8" />
      <circle cx="78" cy="114" r="2.5" fill="#ffb0b8" opacity="0.7" />
    </svg>
  );
}

function IceCreamBadMan() {
  return (
    <svg viewBox="0 0 140 140" width="100%" height="100%">
      <ellipse cx="70" cy="128" rx="38" ry="8" fill="rgba(0,0,0,0.2)" />
      <polygon points="70,128 48,78 92,78" fill="#e8b86a" />
      <ellipse cx="70" cy="58" rx="36" ry="32" fill="#f5a0c0" />
      <ellipse cx="70" cy="42" rx="28" ry="22" fill="#fff5a0" />
      <ellipse cx="70" cy="30" rx="20" ry="16" fill="#a0e0ff" />
      <circle cx="58" cy="52" r="7" fill="#222" />
      <circle cx="82" cy="52" r="7" fill="#222" />
      <circle cx="60" cy="50" r="2" fill="#fff" />
      <circle cx="84" cy="50" r="2" fill="#fff" />
      <path d="M60 68 Q70 78 80 68" fill="#c04060" />
      <rect x="40" y="70" width="10" height="22" rx="4" fill="#f5a0c0" />
      <rect x="90" y="70" width="10" height="22" rx="4" fill="#f5a0c0" />
    </svg>
  );
}
