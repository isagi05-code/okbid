import React from 'react';
import { Badge } from '../../components/Badge/Badge';
import { Shield } from 'lucide-react';

export function Privacy() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Badge variant="emerald" size="sm" icon={Shield} style={{ marginBottom: '0.5rem' }}>
          Data Privacy
        </Badge>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-white)' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
          Last updated: September 20, 2026
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        <section>
          <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '0.5rem' }}>
            1. Information Collection
          </h3>
          <p>
            OKBid collects information submitted directly by creators, including product name, tagline, target URL, and declared category. In frontend demonstration mode, listings and simulated transactions are stored locally in your browser’s `localStorage`.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '0.5rem' }}>
            2. Outbound Link Tracking
          </h3>
          <p>
            When a visitor clicks on an outbound product link, we register the event to compute public click metrics. No invasive cross-site tracking cookies or fingerprinting techniques are utilized.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '0.5rem' }}>
            3. Local Storage & Cookies
          </h3>
          <p>
            We use browser localStorage solely to persist your submitted products, favorite listings, and bid adjustments without requiring mandatory account creation.
          </p>
        </section>
      </div>
    </div>
  );
}
