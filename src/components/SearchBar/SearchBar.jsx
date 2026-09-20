import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search products, founders, categories...',
  className = ''
}) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '420px'
      }}
      className={className}
    >
      <Search
        size={16}
        color="var(--text-dim)"
        style={{
          position: 'absolute',
          left: '0.875rem',
          pointerEvents: 'none'
        }}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'var(--bg-surface-1)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-full)',
          padding: '0.55rem 2.25rem 0.55rem 2.35rem',
          color: 'var(--text-white)',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'all 0.15s ease'
        }}
      />

      {value && (
        <button
          onClick={onClear || (() => onChange(''))}
          style={{
            position: 'absolute',
            right: '0.75rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-dim)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
