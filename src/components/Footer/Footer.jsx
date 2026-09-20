import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Flame, Shield, RotateCcw, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const { resetToDefaults } = useApp();

  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface-0)',
        paddingTop: '3.5rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000'
                }}
              >
                <Flame size={18} strokeWidth={2.5} fill="#000" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-white)' }}>
                OK<span style={{ color: 'var(--color-gold)' }}>Bid</span>
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
              The transparent, competitive product leaderboard. Products stake bids to claim top ranks and drive targeted traffic.
            </p>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                onClick={resetToDefaults}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-dim)',
                  fontSize: '0.78rem',
                  padding: '0.35rem 0.65rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}
                title="Reset mock products and activities to seed state"
              >
                <RotateCcw size={12} />
                Reset Demo Data
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              Explore
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/leaderboard" style={{ color: 'var(--text-muted)', transition: 'color 0.15s ease' }}>
                  Live Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/categories" style={{ color: 'var(--text-muted)' }}>
                  Categories Directory
                </Link>
              </li>
              <li>
                <Link to="/daily" style={{ color: 'var(--text-muted)' }}>
                  Daily Archive
                </Link>
              </li>
              <li>
                <Link to="/activity" style={{ color: 'var(--text-muted)' }}>
                  Live Activity Feed
                </Link>
              </li>
              <li>
                <Link to="/submit" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
                  List Your Product
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Rules */}
          <div>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              Protocol & Rules
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/rules" style={{ color: 'var(--text-muted)' }}>
                  Bidding Rules & Tie-Breakers
                </Link>
              </li>
              <li>
                <Link to="/faq" style={{ color: 'var(--text-muted)' }}>
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-muted)' }}>
                  About OKBid
                </Link>
              </li>
              <li>
                <span style={{ color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Shield size={12} /> Transparent Logic
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              Trust & Legal
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/terms" style={{ color: 'var(--text-muted)' }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" style={{ color: 'var(--text-muted)' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', lineHeight: 1.4, display: 'block', marginTop: '0.5rem' }}>
                  OKBid operates in continuous simulated auction mode. No financial guarantee is provided.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--text-dim)'
          }}
        >
          <div>
            © {new Date().getFullYear()} OKBid Inc. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Built with extreme craft for high-stakes products.
          </div>
        </div>
      </div>
    </footer>
  );
}
