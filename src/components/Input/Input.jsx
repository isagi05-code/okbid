import React from 'react';

export function Input({
  label,
  error,
  helperText,
  prefix,
  suffix,
  className = '',
  id,
  type = 'text',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: '0.02em'
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-surface-0)',
          border: `1px solid ${error ? 'var(--color-rose)' : 'var(--border-card)'}`,
          borderRadius: 'var(--radius-md)',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          overflow: 'hidden'
        }}
        className="input-container"
      >
        {prefix && (
          <span
            style={{
              paddingLeft: '0.875rem',
              color: 'var(--text-dim)',
              fontSize: '0.875rem',
              fontWeight: 600,
              userSelect: 'none'
            }}
          >
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-white)',
            fontSize: '0.9375rem',
            padding: '0.625rem 0.875rem',
            width: '100%'
          }}
          className={className}
          {...props}
        />

        {suffix && (
          <span
            style={{
              paddingRight: '0.875rem',
              color: 'var(--text-dim)',
              fontSize: '0.8125rem',
              userSelect: 'none'
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {error ? (
        <span style={{ fontSize: '0.75rem', color: 'var(--color-rose)', fontWeight: 500 }}>
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}

export function Textarea({ label, error, helperText, id, className = '', rows = 3, ...props }) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-muted)'
          }}
        >
          {label}
        </label>
      )}

      <textarea
        id={inputId}
        rows={rows}
        style={{
          background: 'var(--bg-surface-0)',
          border: `1px solid ${error ? 'var(--color-rose)' : 'var(--border-card)'}`,
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-white)',
          fontSize: '0.9375rem',
          padding: '0.625rem 0.875rem',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit',
          width: '100%',
          boxSizing: 'border-box'
        }}
        className={className}
        {...props}
      />

      {error ? (
        <span style={{ fontSize: '0.75rem', color: 'var(--color-rose)', fontWeight: 500 }}>
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
