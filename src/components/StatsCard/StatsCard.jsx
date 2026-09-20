import React from 'react';
import { Card } from '../Card/Card';

export function StatsCard({ title, value, subtitle, icon: Icon, color = 'var(--color-indigo)', trend }) {
  return (
    <Card hover={false} style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        {Icon && (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: `rgba(${color === 'var(--color-gold)' ? '245, 158, 11' : '99, 102, 241'}, 0.12)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color
            }}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <div className="num-tabular" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-white)' }}>
          {value}
        </div>
        {trend && (
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-emerald)' }}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {subtitle}
        </span>
      )}
    </Card>
  );
}
