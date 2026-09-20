import React from 'react';

export function Badge({
  children,
  variant = 'default', // 'default' | 'gold' | 'indigo' | 'emerald' | 'rose' | 'muted'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className = '',
  style = {}
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    borderRadius: 'var(--radius-full)',
    fontWeight: 600,
    fontSize: size === 'sm' ? '0.7rem' : '0.75rem',
    padding: size === 'sm' ? '0.15rem 0.5rem' : '0.25rem 0.65rem',
    border: '1px solid transparent',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    ...style
  };

  const variants = {
    default: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'var(--text-muted)',
      borderColor: 'var(--border-subtle)'
    },
    gold: {
      backgroundColor: 'rgba(245, 158, 11, 0.12)',
      color: '#FBBF24',
      borderColor: 'rgba(245, 158, 11, 0.35)'
    },
    indigo: {
      backgroundColor: 'rgba(99, 102, 241, 0.12)',
      color: '#A5B4FC',
      borderColor: 'rgba(99, 102, 241, 0.35)'
    },
    emerald: {
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      color: '#34D399',
      borderColor: 'rgba(16, 185, 129, 0.35)'
    },
    rose: {
      backgroundColor: 'rgba(244, 63, 94, 0.12)',
      color: '#FB7185',
      borderColor: 'rgba(244, 63, 94, 0.35)'
    },
    muted: {
      backgroundColor: 'var(--bg-surface-2)',
      color: 'var(--text-dim)',
      borderColor: 'var(--border-subtle)'
    }
  };

  return (
    <span style={{ ...baseStyle, ...variants[variant] }} className={`okbid-badge ${className}`}>
      {Icon && <Icon size={size === 'sm' ? 10 : 12} />}
      {children}
    </span>
  );
}
