import React from 'react';
import { Crown, Trophy, Award } from 'lucide-react';

export function RankBadge({ rank, size = 'md', className = '' }) {
  const isFirst = rank === 1;
  const isSecond = rank === 2;
  const isThird = rank === 3;
  const isTopTen = rank <= 10;

  const sizeDimensions = {
    sm: { width: '28px', height: '28px', fontSize: '0.8rem', iconSize: 13 },
    md: { width: '38px', height: '38px', fontSize: '0.95rem', iconSize: 16 },
    lg: { width: '48px', height: '48px', fontSize: '1.2rem', iconSize: 20 }
  };

  const dim = sizeDimensions[size] || sizeDimensions.md;

  let bg = 'rgba(255, 255, 255, 0.04)';
  let color = 'var(--text-muted)';
  let border = '1px solid var(--border-subtle)';
  let shadow = 'none';

  if (isFirst) {
    bg = 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)';
    color = '#000000';
    border = '1px solid rgba(254, 243, 199, 0.4)';
    shadow = '0 0 16px rgba(245, 158, 11, 0.5)';
  } else if (isSecond) {
    bg = 'linear-gradient(135deg, #CBD5E1 0%, #64748B 100%)';
    color = '#090A0F';
    border = '1px solid rgba(255, 255, 255, 0.3)';
    shadow = '0 0 12px rgba(148, 163, 184, 0.3)';
  } else if (isThird) {
    bg = 'linear-gradient(135deg, #D97706 0%, #78350F 100%)';
    color = '#FFFFFF';
    border = '1px solid rgba(217, 119, 6, 0.4)';
    shadow = '0 0 12px rgba(217, 119, 6, 0.3)';
  } else if (isTopTen) {
    bg = 'rgba(99, 102, 241, 0.1)';
    color = '#A5B4FC';
    border = '1px solid rgba(99, 102, 241, 0.25)';
  }

  return (
    <div
      className={`num-tabular ${className}`}
      style={{
        width: dim.width,
        height: dim.height,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bg,
        color: color,
        border: border,
        boxShadow: shadow,
        fontWeight: 800,
        fontSize: dim.fontSize,
        flexShrink: 0,
        position: 'relative'
      }}
      title={`Rank #${rank}`}
    >
      {isFirst ? (
        <Crown size={dim.iconSize} strokeWidth={2.8} />
      ) : isSecond ? (
        <Trophy size={dim.iconSize} strokeWidth={2.5} />
      ) : isThird ? (
        <Award size={dim.iconSize} strokeWidth={2.5} />
      ) : (
        `#${rank}`
      )}
    </div>
  );
}
