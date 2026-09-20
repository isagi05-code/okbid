import React from 'react';
import { Link } from 'react-router-dom';
import { RankBadge } from '../RankBadge/RankBadge';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { formatCurrency, formatNumber } from '../../utils/formatting';
import { useApp } from '../../context/AppContext';
import { Zap, ExternalLink, MousePointerClick, CheckCircle2 } from 'lucide-react';

export function ProductCard({ product }) {
  const { openOutbidModal, trackClick } = useApp();

  const isRankOne = product.rank === 1;
  const isRankTwo = product.rank === 2;
  const isRankThree = product.rank === 3;

  let cardClass = 'glass-card';
  if (isRankOne) cardClass += ' rank-card-1';
  else if (isRankTwo) cardClass += ' rank-card-2';
  else if (isRankThree) cardClass += ' rank-card-3';

  return (
    <div
      className={cardClass}
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        position: 'relative',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      {/* Top row: Rank badge + Category */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <RankBadge rank={product.rank} size="md" />
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: product.brandColor || 'var(--color-indigo)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {product.logoLetter || product.name[0]}
          </div>
        </div>

        <Badge variant={isRankOne ? 'gold' : 'default'} size="sm">
          {product.category}
        </Badge>
      </div>

      {/* Info */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link
            to={`/product/${product.slug}`}
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-white)',
              textDecoration: 'none'
            }}
          >
            {product.name}
          </Link>
          {product.verified && (
            <CheckCircle2 size={14} color="var(--color-indigo)" style={{ flexShrink: 0 }} />
          )}
        </div>

        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            marginTop: '0.35rem',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.tagline}
        </p>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 0.75rem',
          background: 'var(--bg-surface-0)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Current Stake
          </span>
          <div className="num-tabular" style={{ fontWeight: 800, color: 'var(--color-gold)', fontSize: '1.1rem' }}>
            {formatCurrency(product.bid)}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Clicks
          </span>
          <div className="num-tabular" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.2rem' }}>
            <MousePointerClick size={12} color="var(--text-dim)" />
            {formatNumber(product.clicks || 0)}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link
          to={`/product/${product.slug}`}
          style={{ flex: 1, textDecoration: 'none' }}
        >
          <Button variant="secondary" size="sm" style={{ width: '100%' }}>
            Details
          </Button>
        </Link>
        <Button
          variant={isRankOne ? 'gold' : 'primary'}
          size="sm"
          icon={Zap}
          onClick={() => openOutbidModal(product)}
          style={{ flex: 1 }}
        >
          Outbid
        </Button>
      </div>
    </div>
  );
}
