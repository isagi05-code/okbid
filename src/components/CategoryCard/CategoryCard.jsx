import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatting';
import { Sparkles, Terminal, Zap, Layers, Coins, TrendingUp, ArrowRight } from 'lucide-react';

const iconMap = {
  Sparkles,
  Terminal,
  Zap,
  Layers,
  Coins,
  TrendingUp
};

export function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || Sparkles;

  return (
    <Link
      to={`/categories/${category.slug}`}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <div
        className="glass-card"
        style={{
          padding: '1.25rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: `rgba(${category.color === '#F59E0B' ? '245, 158, 11' : '99, 102, 241'}, 0.12)`,
              color: category.color || 'var(--color-indigo)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.875rem'
            }}
          >
            <IconComponent size={20} />
          </div>

          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-white)' }}>
            {category.name}
          </h4>

          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.4 }}>
            {category.tagline}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.78rem'
          }}
        >
          <span style={{ color: 'var(--text-dim)' }}>
            {category.productCount || 0} listings
          </span>
          <span className="num-tabular" style={{ fontWeight: 700, color: 'var(--color-gold)' }}>
            {formatCurrency(category.totalBids || 0)} staked
          </span>
        </div>
      </div>
    </Link>
  );
}
