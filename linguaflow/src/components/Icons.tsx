/* ============================================
   Icon set — lucide-style outline, 2px stroke
   Matches accepted concept design
   ============================================ */
import type { CSSProperties } from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}

const base = (size: number): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const Icon = {
  Home: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>
  ),
  Book: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
  ),
  Graduation: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/></svg>
  ),
  Chart: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M3 3v18h18"/><path d="M7 14v4M12 9v9M17 5v13"/></svg>
  ),
  Trophy: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M5 4H3v3a3 3 0 0 0 3 3M19 4h2v3a3 3 0 0 1-3 3"/></svg>
  ),
  Flame: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M12 2s4 3 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s-3 1-3 5a6 6 0 0 0 12 0c0-6-6-10-6-10z"/></svg>
  ),
  Star: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z"/></svg>
  ),
  Medal: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><circle cx="12" cy="15" r="6"/><path d="M8.5 9.5 7 3h10l-1.5 6.5M12 13v4"/></svg>
  ),
  Crown: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="m3 7 4 5 5-7 5 7 4-5v11H3z"/></svg>
  ),
  Layers: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>
  ),
  Puzzle: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M19 9h-2V7a2 2 0 0 0-4 0v2H8.5a1.5 1.5 0 0 0-1.5 1.5V14H5a2 2 0 0 0 0 4h2v1.5A1.5 1.5 0 0 0 8.5 21H12a1 1 0 0 0 1-1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3.5A1.5 1.5 0 0 0 19.5 15H17v-2a2 2 0 0 0-4 0v2h-2V9z"/></svg>
  ),
  Mic: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8"/></svg>
  ),
  Headphones: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 16v3a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2zM3 16v3a2 2 0 0 0 2 2h2v-7H5a2 2 0 0 0-2 2z"/></svg>
  ),
  Pencil: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
  ),
  Doc: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>
  ),
  Play: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="m6 3 14 9-14 9z" fill="currentColor"/></svg>
  ),
  ArrowLeft: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
  ),
  ArrowRight: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  Check: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M20 6 9 17l-5-5"/></svg>
  ),
  CheckCircle: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>
  ),
  X: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>
  ),
  Sparkles: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6.3 6.3 3.5 3.5M20.5 20.5l-2.8-2.8M17.7 6.3l2.8-2.8M3.5 20.5l2.8-2.8"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Coffee: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M3 8h14v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M17 8h2a2 2 0 0 1 0 4h-2M6 2v2M10 2v2M14 2v2"/></svg>
  ),
  Clipboard: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
  ),
  Lock: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
  ),
  LogOut: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
  ),
  User: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>
  ),
  Target: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>
  ),
  Route: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 16V9a4 4 0 0 1 4-4h4M14 5v3a4 4 0 0 1-4 4H6"/></svg>
  ),
  Brain: ({ size = 20, ...p }: IconProps) => (
    <svg {...base(size)} {...p}><path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.5a2.5 2.5 0 0 0-2 2.4 2.5 2.5 0 0 0-1 4.6 2.5 2.5 0 0 0 1 4.1A2.5 2.5 0 0 0 7 19a2.5 2.5 0 0 0 5 0V4.5A2.5 2.5 0 0 0 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v.5a2.5 2.5 0 0 1 2 2.4 2.5 2.5 0 0 1 1 4.6 2.5 2.5 0 0 1-1 4.1A2.5 2.5 0 0 1 17 19a2.5 2.5 0 0 1-5 0"/></svg>
  ),
};

export type IconName = keyof typeof Icon;

export function getIcon(name: string) {
  return (Icon as any)[name] || Icon.Sparkles;
}
