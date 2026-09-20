import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Flame, Trophy, Plus, Menu, X, Sparkles, Activity, Calendar, HelpCircle, Layers } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Categories', path: '/categories', icon: Layers },
    { name: 'Daily', path: '/daily', icon: Calendar },
    { name: 'Activity', path: '/activity', icon: Activity },
    { name: 'Rules', path: '/rules', icon: HelpCircle }
  ];

  const isActive = (path) => {
    if (path === '/leaderboard' && location.pathname === '/leaderboard') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return location.pathname === path;
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: 'rgba(8, 9, 12, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        height: 'var(--header-height)'
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              boxShadow: '0 0 16px rgba(245, 158, 11, 0.45)'
            }}
          >
            <Flame size={20} strokeWidth={2.5} fill="#000" />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span
              style={{
                fontSize: '1.35rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: 'var(--text-white)'
              }}
            >
              OK<span style={{ color: 'var(--color-gold)' }}>Bid</span>
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--text-dim)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              PRO
            </span>
          </div>
        </Link>

        {/* Live Status Pill (Desktop) */}
        <div
          className="desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--bg-surface-1)',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span className="pulse-dot" style={{ backgroundColor: 'var(--color-emerald)' }} />
          <span>Live Stakes Active</span>
        </div>

        {/* Desktop Nav Links */}
        <nav
          className="desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--text-white)' : 'var(--text-muted)',
                  background: active ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={15} color={active ? 'var(--color-gold)' : 'var(--text-dim)'} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/submit" style={{ textDecoration: 'none' }}>
            <Button
              size="sm"
              variant="primary"
              icon={Plus}
              style={{
                boxShadow: '0 0 16px rgba(99, 102, 241, 0.35)'
              }}
            >
              List Product
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only-btn"
            style={{
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-white)',
              padding: '0.45rem',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-surface-0)',
            borderBottom: '1px solid var(--border-card)',
            padding: '1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9375rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--text-white)' : 'var(--text-muted)',
                  background: active ? 'rgba(255, 255, 255, 0.06)' : 'transparent'
                }}
              >
                <Icon size={18} color={active ? 'var(--color-gold)' : 'var(--text-dim)'} />
                {link.name}
              </Link>
            );
          })}

          <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link to="/submit" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <Button size="md" variant="gold" icon={Plus} style={{ width: '100%' }}>
                List Your Product
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Style for responsive visibility */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-only { display: none !important; }
          .mobile-only-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
