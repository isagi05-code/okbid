import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/Button/Button';
import { Badge } from '../../components/Badge/Badge';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { LeaderboardRow } from '../../components/LeaderboardRow/LeaderboardRow';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';
import { ActivityItem } from '../../components/ActivityItem/ActivityItem';
import { formatCurrency, formatNumber } from '../../utils/formatting';
import {
  Flame,
  Zap,
  Trophy,
  ArrowRight,
  TrendingUp,
  Sparkles,
  MousePointerClick,
  ShieldCheck,
  Plus
} from 'lucide-react';

export function Home() {
  const { products, categories, activities, openOutbidModal } = useApp();

  const topTen = products.slice(0, 10);
  const topProduct = products[0];

  // Calculate platform high-level stats
  const totalStaked = products.reduce((acc, p) => acc + (p.bid || 0), 0);
  const totalClicks = products.reduce((acc, p) => acc + (p.clicks || 0), 0);
  const activeProductsCount = products.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>
      {/* 1. Live Activity Ticker Bar */}
      {activities && activities.length > 0 && (
        <section
          style={{
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-0)',
            padding: '0.6rem 0',
            overflow: 'hidden'
          }}
        >
          <div className="marquee-container">
            <div className="marquee-content">
              {activities.map((act) => (
                <ActivityItem key={act.id} activity={act} compact={true} />
              ))}
              {/* Duplicate for infinite loop illusion */}
              {activities.map((act) => (
                <ActivityItem key={`dup-${act.id}`} activity={act} compact={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Hero Section */}
      <section className="container" style={{ paddingTop: '2rem' }}>
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          {/* Top Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Badge variant="gold" size="md" icon={Flame}>
              Competitive Product Leaderboard
            </Badge>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: 'var(--text-white)'
            }}
          >
            Outbid your competitors.{' '}
            <span className="gradient-text-gold">Own the #1 rank.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '680px'
            }}
          >
            A high-stakes leaderboard where ambitious startups, AI agents, and developer tools
            stake bids in real-time to capture elite spotlight and high-converting traffic.
          </p>

          {/* Primary Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '0.5rem'
            }}
          >
            <Link to="/submit" style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="gold" icon={Plus}>
                Stake & List Your Product
              </Button>
            </Link>
            <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="secondary" iconRight={ArrowRight}>
                Explore Leaderboard
              </Button>
            </Link>
          </div>

          {/* Trust points */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem',
              marginTop: '0.75rem',
              fontSize: '0.8125rem',
              color: 'var(--text-dim)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} color="var(--color-emerald)" /> Transparent Bid Engine
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={14} color="var(--color-gold)" /> Instant Rank Recalculation
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MousePointerClick size={14} color="var(--color-indigo)" /> 100% Direct Traffic Routed
            </span>
          </div>
        </div>
      </section>

      {/* 3. Platform Metric Stats */}
      <section className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem'
          }}
        >
          <StatsCard
            title="Total Capital Staked"
            value={formatCurrency(totalStaked)}
            subtitle="Live balance across active leaderboard"
            icon={TrendingUp}
            color="var(--color-gold)"
            trend="+18.4% this week"
          />
          <StatsCard
            title="Total Clicks Delivered"
            value={formatNumber(totalClicks)}
            subtitle="Direct referral visits to listed products"
            icon={MousePointerClick}
            color="var(--color-indigo)"
            trend="+2,410 today"
          />
          <StatsCard
            title="Current #1 Spotlight"
            value={topProduct?.name || 'Krypton AI'}
            subtitle={`Staked ${formatCurrency(topProduct?.bid || 0)}`}
            icon={Trophy}
            color="var(--color-gold)"
          />
          <StatsCard
            title="Active Competitors"
            value={`${activeProductsCount} Startups`}
            subtitle="Competing across 6 tech categories"
            icon={Sparkles}
            color="var(--color-indigo)"
          />
        </div>
      </section>

      {/* 4. Top Leaderboard Preview */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="gold" size="sm" icon={Flame}>
                Live Rankings
              </Badge>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
                Sorted by Highest Active Stake
              </span>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-white)' }}>
              The Top 10 Arena
            </h2>
          </div>

          <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" iconRight={ArrowRight}>
              View All {products.length} Products
            </Button>
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="desktop-table-container">
          <div className="table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Rank</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Clicks</th>
                  <th>Current Stake</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {topTen.map((product) => (
                  <LeaderboardRow key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card Grid View */}
        <div className="mobile-cards-grid">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem'
            }}
          >
            {topTen.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <style>{`
          .mobile-cards-grid { display: none; }
          @media (max-width: 820px) {
            .desktop-table-container { display: none !important; }
            .mobile-cards-grid { display: block !important; }
          }
        `}</style>
      </section>

      {/* 5. How It Works Section */}
      <section className="container">
        <div
          style={{
            background: 'var(--bg-surface-1)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <Badge variant="indigo" size="sm" icon={Zap} style={{ marginBottom: '0.75rem' }}>
              Mechanics
            </Badge>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-white)' }}>
              How OKBid Works
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              A deterministic, zero-algorithm auction. The highest stake wins the most visibility.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {/* Step 1 */}
            <div
              className="glass-card"
              style={{
                padding: '1.75rem',
                background: 'var(--bg-surface-0)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--color-indigo)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem'
                }}
              >
                01
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-white)' }}>
                List Your Product
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Submit your project details, website link, and choose your initial bid amount to enter the arena.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="glass-card"
              style={{
                padding: '1.75rem',
                background: 'var(--bg-surface-0)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem'
                }}
              >
                02
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-white)' }}>
                Outbid & Climb Ranks
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Raise your stake anytime. When you outbid a competitor, you instantly take their position and push them down.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="glass-card"
              style={{
                padding: '1.75rem',
                background: 'var(--bg-surface-0)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--color-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem'
                }}
              >
                03
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-white)' }}>
                Capture High-Intent Clicks
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Top ranked products receive exponential homepage discovery and qualified clicks directly to their landing page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Categories Exploration Grid */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Badge variant="indigo" size="sm">
                Directory
              </Badge>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
                6 Active Ecosystems
              </span>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-white)' }}>
              Explore Categories
            </h2>
          </div>

          <Link to="/categories" style={{ textDecoration: 'none' }}>
            <Button variant="ghost" size="sm" iconRight={ArrowRight}>
              All Categories
            </Button>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 7. Bottom CTA Banner */}
      <section className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)',
            border: '1px solid var(--border-bright)',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ maxWidth: '620px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <Badge variant="gold" size="md" icon={Trophy}>
              Ready for the Spotlight?
            </Badge>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: 'var(--text-white)', lineHeight: 1.15 }}>
              Claim your spot on OKBid today
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              Join fast-growing companies and indie makers competing for #1 visibility. Set your bid and enter the live ranking right now.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
              <Link to="/submit" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="gold" icon={Plus}>
                  List Your Startup Now
                </Button>
              </Link>
              <Link to="/rules" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="secondary">
                  Read Auction Rules
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
