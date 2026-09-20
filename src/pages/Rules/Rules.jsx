import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { HelpCircle, Shield, Scale, Clock, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export function Rules() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <Badge variant="gold" size="sm" icon={Scale} style={{ marginBottom: '0.5rem' }}>
          Auction Governance
        </Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-white)' }}>
          OKBid Ranking Rules & Mechanics
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
          Transparent, deterministic rules governing leader rankings, minimum outbid amounts, and tie-breakers.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Rule 1 */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              1
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-white)' }}>
              Deterministic Ranking by Capital Staked
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
            The primary ranking factor on OKBid is the active bid amount ($ USD) staked on a product listing. The highest active bid always occupies Rank #1 and enjoys global hero placement and maximum traffic routing.
          </p>
        </div>

        {/* Rule 2 */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              2
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-white)' }}>
              Tie-Breaker Mechanism
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
            In the event that two products possess identical active bids, seniority prevails: the product that reached that bid tier or was listed earlier in time retains the higher rank. To bypass an equal stake, you must increase your bid above the minimum increment.
          </p>
        </div>

        {/* Rule 3 */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              3
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-white)' }}>
              Tiered Minimum Bid Increments
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            To prevent $0.01 micro-bidding battles, OKBid enforces clean tiered minimum increments:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            <div style={{ background: 'var(--bg-surface-0)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Stakes &lt; ₹500</span>
              <div style={{ fontWeight: 700, color: 'var(--text-white)' }}>+₹50 Minimum</div>
            </div>
            <div style={{ background: 'var(--bg-surface-0)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>₹500 – ₹1,999</span>
              <div style={{ fontWeight: 700, color: 'var(--text-white)' }}>+₹100 Minimum</div>
            </div>
            <div style={{ background: 'var(--bg-surface-0)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>₹2,000 – ₹4,999</span>
              <div style={{ fontWeight: 700, color: 'var(--text-white)' }}>+₹250 Minimum</div>
            </div>
            <div style={{ background: 'var(--bg-surface-0)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>₹5,000 – ₹14,999</span>
              <div style={{ fontWeight: 700, color: 'var(--text-white)' }}>+₹500 Minimum</div>
            </div>
          </div>
        </div>

        {/* Rule 4 */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              4
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-white)' }}>
              Instant Rank Recalculation
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
            Rank calculations are computed immediately upon transaction confirmation. If your bid exceeds a competitor, your listing ascends instantaneously and the previous holder drops down one spot.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/submit" style={{ textDecoration: 'none' }}>
          <Button size="lg" variant="gold" iconRight={ArrowRight}>
            Stake Your First Bid
          </Button>
        </Link>
      </div>
    </div>
  );
}
