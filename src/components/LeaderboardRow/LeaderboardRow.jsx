import React from 'react';
import { Link } from 'react-router-dom';
import { RankBadge } from '../RankBadge/RankBadge';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { formatCurrency, formatNumber } from '../../utils/formatting';
import { useApp } from '../../context/AppContext';
import { Zap, ExternalLink, MousePointerClick, CheckCircle2 } from 'lucide-react';

export function LeaderboardRow({ product }) {
  const { openOutbidModal, trackClick } = useApp();

  const isRankOne = product.rank === 1;
  const isRankTwo = product.rank === 2;
  const isRankThree = product.rank === 3;

  return (
    <tr
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        background: isRankOne
          ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.07) 0%, transparent 60%)'
          : isRankTwo
          ? 'linear-gradient(90deg, rgba(148, 163, 184, 0.04) 0%, transparent 60%)'
          : 'transparent'
      }}
    >
      {/* Rank */}
      <td style={{ width: '60px', padding: '1rem 0.75rem 1rem 1.25rem' }}>
        <RankBadge rank={product.rank} size="md" />
      </td>

      {/* Product */}
      <td style={{ padding: '1rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: product.brandColor || 'var(--color-indigo)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.15rem',
              flexShrink: 0,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {product.logoLetter || product.name[0]}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Link
                to={`/product/${product.slug}`}
                style={{
                  fontWeight: 700,
                  fontSize: '0.975rem',
                  color: 'var(--text-white)',
                  textDecoration: 'none'
                }}
              >
                {product.name}
              </Link>
              {product.verified && (
                <CheckCircle2 size={14} color="var(--color-indigo)" style={{ flexShrink: 0 }} />
              )}
              {isRankOne && (
                <Badge variant="gold" size="sm">
                  #1 LEADER
                </Badge>
              )}
            </div>

            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginTop: '0.2rem',
                maxWidth: '480px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {product.tagline}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td style={{ padding: '1rem 1rem' }}>
        <Badge variant="default" size="sm">
          {product.category}
        </Badge>
      </td>

      {/* Clicks */}
      <td style={{ padding: '1rem 1rem' }}>
        <div
          className="num-tabular"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.875rem',
            color: 'var(--text-muted)'
          }}
        >
          <MousePointerClick size={13} color="var(--text-dim)" />
          {formatNumber(product.clicks || 0)}
        </div>
      </td>

      {/* Current Stake */}
      <td style={{ padding: '1rem 1rem' }}>
        <div
          className="num-tabular"
          style={{
            fontWeight: 800,
            fontSize: '1.05rem',
            color: isRankOne ? 'var(--color-gold)' : 'var(--text-white)'
          }}
        >
          {formatCurrency(product.bid)}
        </div>
      </td>

      {/* Outbid Action */}
      <td style={{ padding: '1rem 1.25rem 1rem 1rem', textAlign: 'right' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <a
            href={product.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick(product.id)}
            style={{
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface-2)',
              color: 'var(--text-dim)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-subtle)'
            }}
            title={`Visit ${product.name}`}
          >
            <ExternalLink size={14} />
          </a>
          <Button
            size="sm"
            variant={isRankOne ? 'gold' : 'primary'}
            icon={Zap}
            onClick={() => openOutbidModal(product)}
          >
            Outbid
          </Button>
        </div>
      </td>
    </tr>
  );
}
