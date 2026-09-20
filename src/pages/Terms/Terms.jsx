import React from 'react';
import { Badge } from '../../components/Badge/Badge';
import { Scale } from 'lucide-react';

export function Terms() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Badge variant="indigo" size="sm" icon={Scale} style={{ marginBottom: '0.5rem' }}>
          Terms & Conditions
        </Badge>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-white)' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
          Last updated: September 20, 2026
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        <section>
          <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '0.5rem' }}>
            1. Acceptance of Terms
          </h3>
          <p>
            By accessing and using OKBid, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, please do not use the application.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '0.5rem' }}>
            2. Listing Guidelines & Permitted Content
          </h3>
          <p>
            Submitted products must represent legitimate software, hardware, or digital tools. Submissions containing malware, phishing links, counterfeit software, or deceptive claims are subject to immediate removal.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '0.5rem' }}>
            3. Auction & Ranking Mechanics
          </h3>
          <p>
            Leaderboard positions are determined on an ongoing basis according to the highest staked bids. Listings may be outbid and displaced by any other party at any time without prior notice.
          </p>
        </section>
      </div>
    </div>
  );
}
