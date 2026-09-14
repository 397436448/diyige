/* ============================================
   UI Primitives — built from design tokens
   Button, Card, ProgressRing, ProgressBar, Badge
   ============================================ */
import type { ReactNode, CSSProperties } from 'react';
import { Icon, type IconName } from './Icons';

/* ---------- Button ---------- */
type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  type?: 'button' | 'submit';
  icon?: IconName;
};

export function Button({ children, variant = 'primary', size = 'md', full, onClick, disabled, style, type = 'button', icon }: ButtonProps) {
  const IconComp = icon ? Icon[icon] : null;
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size}${full ? ' btn--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {IconComp && <IconComp size={size === 'sm' ? 16 : 18} />}
      {children}
    </button>
  );
}

/* ---------- Card ---------- */
type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  padded?: boolean;
};

export function Card({ children, className = '', style, onClick, padded = true }: CardProps) {
  return (
    <div
      className={`card${padded ? ' card--padded' : ''} ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/* ---------- ProgressRing ---------- */
type RingProps = {
  progress: number; // 0-1
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  children?: ReactNode;
};

export function ProgressRing({ progress, size = 120, strokeWidth = 8, color = 'var(--color-primary)', label, sublabel, children }: RingProps) {
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - Math.max(0, Math.min(1, progress)));
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="ring__svg">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-track)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.6s var(--ease-out)' }}
        />
      </svg>
      <div className="ring__center">
        {children || (
          <>
            {label && <span className="ring__label">{label}</span>}
            {sublabel && <span className="ring__sublabel">{sublabel}</span>}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- ProgressBar ---------- */
type BarProps = {
  progress: number; // 0-1
  label?: string;
  meta?: string;
  color?: string;
  height?: number;
};

export function ProgressBar({ progress, label, meta, color = 'var(--color-primary)', height = 14 }: BarProps) {
  const pct = Math.round(Math.max(0, Math.min(1, progress)) * 100);
  return (
    <div className="pbar">
      {(label || meta) && (
        <div className="pbar__header">
          {label && <span className="pbar__label">{label}</span>}
          {meta && <span className="pbar__meta">{meta}</span>}
        </div>
      )}
      <div className="pbar__track" style={{ height }}>
        <div
          className="pbar__fill"
          style={{ width: `${pct}%`, background: color, height }}
          role="progressbar"
          aria-valuenow={pct}
        >
          <span className="pbar__pct">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Badge / Medal ---------- */
type BadgeProps = {
  icon: IconName | string;
  label: string;
  earned?: boolean;
  special?: boolean;
  size?: number;
};

export function AchievementBadge({ icon, label, earned = false, special = false, size = 72 }: BadgeProps) {
  const IconComp = typeof icon === 'string' ? (Icon as any)[icon] || Icon.Sparkles : icon;
  return (
    <div className={`badge${earned ? ' badge--earned' : ''}${special ? ' badge--special' : ''}`}>
      <div className="badge__circle" style={{ width: size, height: size }}>
        <IconComp size={size * 0.4} />
      </div>
      <span className="badge__label">{label}</span>
    </div>
  );
}

/* ---------- DotProgress ---------- */
type DotProps = {
  current: number;
  total: number;
};

export function DotProgress({ current, total }: DotProps) {
  return (
    <div className="dots">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`dots__dot${i < current ? ' dots__dot--filled' : ''}`} />
      ))}
      <span className="dots__count">{current} / {total}</span>
    </div>
  );
}

/* ---------- SectionHeader ---------- */
export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>
      {action}
    </div>
  );
}

/* ---------- Tag ---------- */
export function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return <span className="tag" style={color ? { background: color + '20', color } : undefined}>{children}</span>;
}
