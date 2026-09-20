import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityItem } from '../../components/ActivityItem/ActivityItem';
import { Badge } from '../../components/Badge/Badge';
import { Activity as ActivityIcon, Trophy, PlusCircle, Zap } from 'lucide-react';

export function Activity() {
  const { activities } = useApp();
  const [filterType, setFilterType] = useState('ALL');

  const filteredActivities = activities.filter((act) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'OUTBID') return act.type === 'OUTBID';
    if (filterType === 'NEW_SUBMISSION') return act.type === 'NEW_SUBMISSION';
    if (filterType === 'BID_INCREASE') return act.type === 'BID_INCREASE';
    return true;
  });

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '860px' }}>
      <div>
        <Badge variant="gold" size="sm" icon={ActivityIcon} style={{ marginBottom: '0.5rem' }}>
          Real-Time Audit Stream
        </Badge>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-white)' }}>
          Live Arena Activity
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
          Every stake raise, outbid battle, and new contender entry verified on the ledger.
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          background: 'var(--bg-surface-1)',
          padding: '0.4rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          width: 'fit-content'
        }}
      >
        <button
          onClick={() => setFilterType('ALL')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.8125rem',
            background: filterType === 'ALL' ? 'var(--color-indigo)' : 'transparent',
            color: filterType === 'ALL' ? '#fff' : 'var(--text-muted)'
          }}
        >
          All Activity ({activities.length})
        </button>

        <button
          onClick={() => setFilterType('OUTBID')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.8125rem',
            background: filterType === 'OUTBID' ? 'var(--color-gold)' : 'transparent',
            color: filterType === 'OUTBID' ? '#000' : 'var(--text-muted)'
          }}
        >
          Outbids Only
        </button>

        <button
          onClick={() => setFilterType('NEW_SUBMISSION')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.8125rem',
            background: filterType === 'NEW_SUBMISSION' ? 'var(--color-emerald)' : 'transparent',
            color: filterType === 'NEW_SUBMISSION' ? '#fff' : 'var(--text-muted)'
          }}
        >
          New Submissions
        </button>
      </div>

      {/* Feed List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((act) => (
            <ActivityItem key={act.id} activity={act} />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-surface-0)', borderRadius: 'var(--radius-xl)' }}>
            <p style={{ color: 'var(--text-muted)' }}>No activities found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
