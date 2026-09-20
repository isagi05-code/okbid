import React from 'react';

export function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  style = {},
  onClick,
  ...props
}) {
  return (
    <div
      className={`glass-card ${hover ? 'interactive-card' : ''} ${className}`}
      onClick={onClick}
      style={{
        padding: '1.5rem',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        ...(glow ? { borderColor: 'var(--border-indigo)', boxShadow: 'var(--shadow-indigo)' } : {}),
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
