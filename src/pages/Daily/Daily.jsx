import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { RankBadge } from '../../components/RankBadge/RankBadge';
import { formatCurrency, formatNumber } from '../../utils/formatting';
import { Calendar, Trophy, ArrowRight, ExternalLink } from 'lucide-react';

export function Daily() {
  const { dailyRankings } = useApp();
  const [selectedDate, setSelectedDate] = useState(dailyRankings[0]?.date || '2026-09-20');

  const currentSnapshot = dailyRankings.find((d) => d.date === selectedDate) || dailyRankings[0];
  const champion = currentSnapshot?.leaderboard?.[0];

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
      <div>
        <Badge variant="gold" size="sm" icon={Calendar} style={{ marginBottom: '0.5rem' }}>
          Historical Hall of Fame
        </Badge>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-white)' }}>
          Daily Leaderboard Archive
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
          Explore historical snapshots of who held the #1 spot on previous days.
        </p>
      </div>

      {/* Date Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          background: 'var(--bg-surface-1)',
          padding: '0.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          width: 'fit-content'
        }}
      >
        {dailyRankings.map((day) => {
          const isSelected = day.date === selectedDate;
          return (
            <button
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.875rem',
                background: isSelected ? 'var(--color-gold)' : 'transparent',
                color: isSelected ? '#000000' : 'var(--text-muted)',
                boxShadow: isSelected ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {day.label}
            </button>
          );
        })}
      </div>

      {/* Champion of the Day Spotlight Banner */}
      {champion && (
        <div
          className="rank-card-1"
          style={{
            padding: '2rem 2.5rem',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <RankBadge rank={1} size="lg" />
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Daily Champion • {currentSnapshot.label}
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-white)', marginTop: '0.2rem' }}>
                {champion.name}
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {champion.category}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Winning Stake</span>
              <div className="num-tabular" style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-gold)' }}>
                {formatCurrency(champion.bid)}
              </div>
            </div>

            <Link to={`/product/${champion.slug}`} style={{ textDecoration: 'none' }}>
              <Button variant="gold" size="sm" iconRight={ArrowRight}>
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Snapshot Leaderboard Table */}
      <div className="table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Rank</th>
              <th>Product</th>
              <th>Category</th>
              <th>Clicks Stamped</th>
              <th>Final Bid Staked</th>
              <th style={{ textAlign: 'right' }}>View</th>
            </tr>
          </thead>
          <tbody>
            {currentSnapshot.leaderboard.map((item) => (
              <tr key={item.rank}>
                <td style={{ padding: '1rem 0.75rem 1rem 1.25rem' }}>
                  <RankBadge rank={item.rank} size="md" />
                </td>
                <td style={{ padding: '1rem 1rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-white)' }}>
                    {item.name}
                  </span>
                </td>
                <td style={{ padding: '1rem 1rem' }}>
                  <Badge variant="default" size="sm">
                    {item.category}
                  </Badge>
                </td>
                <td style={{ padding: '1rem 1rem' }}>
                  <span className="num-tabular" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {formatNumber(item.clicks)}
                  </span>
                </td>
                <td style={{ padding: '1rem 1rem' }}>
                  <span className="num-tabular" style={{ fontWeight: 800, color: item.rank === 1 ? 'var(--color-gold)' : 'var(--text-white)' }}>
                    {formatCurrency(item.bid)}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem 1rem 1rem', textAlign: 'right' }}>
                  <Link to={`/product/${item.slug}`} style={{ textDecoration: 'none' }}>
                    <Button variant="secondary" size="sm">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
