import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatRelativeTime } from '../../utils/formatting';
import { ArrowUpRight, Trophy, Zap, PlusCircle, TrendingUp } from 'lucide-react';

export function ActivityItem({ activity, compact = false }) {
  let icon = <Zap size={14} />;
  let iconBg = 'rgba(99, 102, 241, 0.15)';
  let iconColor = 'var(--color-indigo)';

  if (activity.type === 'OUTBID') {
    icon = <Trophy size={14} />;
    iconBg = 'rgba(245, 158, 11, 0.15)';
    iconColor = 'var(--color-gold)';
  } else if (activity.type === 'NEW_SUBMISSION') {
    icon = <PlusCircle size={14} />;
    iconBg = 'rgba(16, 185, 129, 0.15)';
    iconColor = 'var(--color-emerald)';
  } else if (activity.type === 'BID_INCREASE') {
    icon = <TrendingUp size={14} />;
    iconBg = 'rgba(6, 182, 212, 0.15)';
    iconColor = 'var(--color-cyan)';
  }

  if (compact) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.35rem 0.75rem',
          background: 'var(--bg-surface-2)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.8125rem'
        }}
      >
        <span
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: iconBg,
            color: iconColor,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {icon}
        </span>
        <span style={{ fontWeight: 600, color: 'var(--text-white)' }}>
          {activity.productName}
        </span>
        <span style={{ color: 'var(--text-dim)' }}>•</span>
        <span className="num-tabular" style={{ fontWeight: 700, color: 'var(--color-gold)' }}>
          {formatCurrency(activity.amount)}
        </span>
        <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
          {formatRelativeTime(activity.timestamp)}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem 1.25rem',
        background: 'var(--bg-surface-1)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        transition: 'border-color 0.15s ease'
      }}
      className="glass-card"
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-md)',
          background: iconBg,
          color: iconColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px'
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link
            to={`/product/${activity.productSlug}`}
            style={{
              fontWeight: 700,
              fontSize: '0.9375rem',
              color: 'var(--text-white)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            {activity.title}
            <ArrowUpRight size={13} color="var(--text-dim)" />
          </Link>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            {formatRelativeTime(activity.timestamp)}
          </span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          {activity.message}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginTop: '0.65rem' }}>
          <span className="num-tabular" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-gold)' }}>
            Stake: {formatCurrency(activity.amount)}
          </span>
          {activity.newRank && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: activity.newRank <= 3 ? 'var(--color-gold)' : 'var(--text-muted)',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              Current Rank: #{activity.newRank}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
