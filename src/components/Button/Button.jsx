import React from 'react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconRight: IconRight,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
    border: '1px solid transparent',
    textDecoration: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    gap: '0.5rem'
  };

  const sizeStyles = {
    sm: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.8125rem'
    },
    md: {
      padding: '0.6rem 1.15rem',
      fontSize: '0.875rem'
    },
    lg: {
      padding: '0.85rem 1.6rem',
      fontSize: '1rem'
    }
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-indigo)',
      color: '#FFFFFF',
      boxShadow: '0 0 16px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    },
    gold: {
      backgroundColor: 'var(--color-gold)',
      color: '#090A0F',
      fontWeight: 700,
      boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
    },
    secondary: {
      backgroundColor: 'var(--bg-surface-2)',
      color: 'var(--text-main)',
      borderColor: 'var(--border-card)',
      boxShadow: 'var(--shadow-sm)'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-main)',
      borderColor: 'var(--border-bright)'
    },
    danger: {
      backgroundColor: 'rgba(244, 63, 94, 0.15)',
      color: '#FB7185',
      borderColor: 'rgba(244, 63, 94, 0.3)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-muted)'
    }
  };

  return (
    <button
      type={type}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant]
      }}
      className={`okbid-btn ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span
          style={{
            width: '1rem',
            height: '1rem',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.6s linear infinite'
          }}
        />
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
          {children}
          {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
        </>
      )}
    </button>
  );
}
