import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { useFilter } from '../../hooks/useFilter';
import { LeaderboardRow } from '../../components/LeaderboardRow/LeaderboardRow';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { formatCurrency } from '../../utils/formatting';
import { Trophy, Flame, Zap, MousePointerClick, Filter, Sparkles, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Leaderboard() {
  const { mode, setMode, items } = useLeaderboard('all-time');
  const { categories } = useApp();

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredItems
  } = useFilter(items);

  const totalFilteredStaked = filteredItems.reduce((acc, p) => acc + (p.bid || 0), 0);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="gold" size="sm" icon={Flame}>
              Live Global Standings
            </Badge>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
              Real-time stake verification
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-white)' }}>
            The Arena Leaderboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Browse and outbid products competing for the coveted #1 spot.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/submit" style={{ textDecoration: 'none' }}>
            <Button variant="gold" icon={Plus}>
              List Your Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Mode Tabs (All-Time, Today, Trending) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--bg-surface-1)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          width: 'fit-content'
        }}
      >
        <button
          onClick={() => setMode('all-time')}
          style={{
            padding: '0.5rem 1.1rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: mode === 'all-time' ? 'var(--color-indigo)' : 'transparent',
            color: mode === 'all-time' ? '#FFFFFF' : 'var(--text-muted)',
            boxShadow: mode === 'all-time' ? '0 0 12px rgba(99, 102, 241, 0.4)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <Trophy size={14} />
          All-Time Stakes
        </button>

        <button
          onClick={() => setMode('today')}
          style={{
            padding: '0.5rem 1.1rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: mode === 'today' ? 'var(--color-gold)' : 'transparent',
            color: mode === 'today' ? '#000000' : 'var(--text-muted)',
            boxShadow: mode === 'today' ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <Flame size={14} />
          Today's Activity
        </button>

        <button
          onClick={() => setMode('trending')}
          style={{
            padding: '0.5rem 1.1rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: mode === 'trending' ? 'var(--color-emerald)' : 'transparent',
            color: mode === 'trending' ? '#FFFFFF' : 'var(--text-muted)',
            boxShadow: mode === 'trending' ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <MousePointerClick size={14} />
          Most Clicked
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          background: 'var(--bg-surface-0)',
          padding: '1rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by product name, tagline, founder..."
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              background: 'var(--bg-surface-2)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '0.55rem 0.85rem',
              fontSize: '0.875rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--bg-surface-2)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '0.55rem 0.85rem',
              fontSize: '0.875rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="bid">Sort: Highest Stake</option>
            <option value="clicks">Sort: Most Clicks</option>
            <option value="recent">Sort: Newest Listed</option>
          </select>
        </div>
      </div>

      {/* Results Overview Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
        <div>
          Showing <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>{filteredItems.length}</span> listed products
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </div>
        <div>
          Total Stake: <span className="num-tabular" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{formatCurrency(totalFilteredStaked)}</span>
        </div>
      </div>

      {/* Main Leaderboard Render */}
      {filteredItems.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="desktop-table-container">
            <div className="table-container">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>Rank</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Clicks Delivered</th>
                    <th>Current Stake</th>
                    <th style={{ textAlign: 'right' }}>Outbid</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((product) => (
                    <LeaderboardRow key={product.id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="mobile-cards-grid">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem'
              }}
            >
              {filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: 'var(--bg-surface-0)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--bg-surface-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-dim)'
            }}
          >
            <Filter size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-white)' }}>
            No products matched your filter
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '400px' }}>
            Try clearing your search query or selecting "All Categories" to view the full leaderboard.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      <style>{`
        .mobile-cards-grid { display: none; }
        @media (max-width: 820px) {
          .desktop-table-container { display: none !important; }
          .mobile-cards-grid { display: block !important; }
        }
      `}</style>
    </div>
  );
}
