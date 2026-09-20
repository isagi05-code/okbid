import React from 'react';
import { Badge } from '../../components/Badge/Badge';
import { Flame, Target, Shield, Rocket } from 'lucide-react';

export function About() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <Badge variant="gold" size="sm" icon={Flame} style={{ marginBottom: '0.5rem' }}>
          Mission & Origin
        </Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-white)' }}>
          About OKBid
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
          A radical, zero-fluff approach to product discovery and high-intent startup traffic.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>
          Why We Built OKBid
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
          Traditional startup directories have grown stale. Upvote-trading cartels, algorithmic bias, and pay-to-play review sites hide genuine innovation behind vanity metrics.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
          OKBid flips the script with pure economic clarity. Inspired by outbid.lol, every product's position is strictly governed by open, public capital stakes. No algorithmic black boxes. If you want the #1 spot, you stake the highest bid.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <Target size={24} color="var(--color-indigo)" style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-white)' }}>Zero Bias</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Code determines the leaderboard order, not editors or hidden algorithms.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <Shield size={24} color="var(--color-emerald)" style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-white)' }}>Live Transparency</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Every outbid, stake adjustment, and entrant is recorded on an open activity stream.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <Rocket size={24} color="var(--color-gold)" style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-white)' }}>Direct Traffic</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Unfiltered outbound clicks straight to your website with zero interstitial walls.
          </p>
        </div>
      </div>
    </div>
  );
}
