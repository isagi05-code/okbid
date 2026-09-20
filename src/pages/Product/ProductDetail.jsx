import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RankBadge } from '../../components/RankBadge/RankBadge';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { ActivityItem } from '../../components/ActivityItem/ActivityItem';
import { formatCurrency, formatNumber, formatRelativeTime, extractHostname } from '../../utils/formatting';
import { getMinimumOutbid } from '../../utils/ranking';
import {
  ExternalLink,
  Zap,
  ArrowLeft,
  CheckCircle2,
  MousePointerClick,
  Calendar,
  User,
  ShieldCheck,
  TrendingUp,
  Tag,
  Share2
} from 'lucide-react';

export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, activities, openOutbidModal, trackClick, addToast } = useApp();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-white)' }}>
          Product Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          We couldn't find a product listed under "{slug}".
        </p>
        <Link to="/leaderboard">
          <Button variant="primary" icon={ArrowLeft}>
            Back to Leaderboard
          </Button>
        </Link>
      </div>
    );
  }

  // Calculate position in relation to neighbors
  const currentIndex = products.findIndex((p) => p.id === product.id);
  const higherProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const lowerProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  // Filter activities for this product
  const productActivities = activities.filter((a) => a.productId === product.id);

  // Calculate category rank
  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase() === product.category?.toLowerCase()
  );
  const categoryRank = categoryProducts.findIndex((p) => p.id === product.id) + 1;

  const minRequiredBid = getMinimumOutbid(product.bid);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to your clipboard!', 'info');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <ArrowLeft size={16} /> Back to Leaderboard
        </button>
      </div>

      {/* Main Hero Header */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
          flexWrap: 'wrap'
        }}
      >
        {/* Left Identity */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', maxWidth: '720px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: 'var(--radius-xl)',
              background: product.brandColor || 'var(--color-indigo)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '2.2rem',
              flexShrink: 0,
              boxShadow: '0 0 25px rgba(0,0,0,0.5)'
            }}
          >
            {product.logoLetter || product.name[0]}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-white)', letterSpacing: '-0.03em' }}>
                {product.name}
              </h1>
              {product.verified && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-indigo)', fontSize: '0.8125rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> Verified Product
                </div>
              )}
            </div>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginTop: '0.4rem', lineHeight: 1.5 }}>
              {product.tagline}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <Link to={`/categories/${product.category.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                <Badge variant="indigo" size="md">
                  {product.category}
                </Badge>
              </Link>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> Listed {formatRelativeTime(product.createdAt)}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <User size={14} /> @{product.maker}
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleShare}
            style={{
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border-card)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Share Product"
          >
            <Share2 size={18} />
          </button>

          <a
            href={product.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick(product.id)}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="secondary" iconRight={ExternalLink}>
              Visit {extractHostname(product.website)}
            </Button>
          </a>

          <Button
            variant={product.rank === 1 ? 'gold' : 'primary'}
            icon={Zap}
            onClick={() => openOutbidModal(product)}
          >
            Outbid Product
          </Button>
        </div>
      </div>

      {/* Grid: Live Stake Panel & Product Intel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Stake & Leaderboard Box */}
        <div
          className="glass-card"
          style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, rgba(20, 23, 33, 0.95) 0%, rgba(12, 14, 20, 0.98) 100%)',
            borderColor: product.rank === 1 ? 'var(--border-gold)' : 'var(--border-bright)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              High Stakes Standing
            </span>
            <RankBadge rank={product.rank} size="lg" />
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Current Capital Staked</div>
            <div className="num-tabular" style={{ fontSize: '2.5rem', fontWeight: 900, color: product.rank === 1 ? 'var(--color-gold)' : 'var(--text-white)' }}>
              {formatCurrency(product.bid)}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Overall Rank</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-white)', marginTop: '0.2rem' }}>
                #{product.rank} of {products.length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Category Rank</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-indigo)', marginTop: '0.2rem' }}>
                #{categoryRank} in {product.category}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Traffic Routed</div>
              <div className="num-tabular" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-white)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MousePointerClick size={15} color="var(--text-dim)" /> {formatNumber(product.clicks || 0)} Clicks
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Min Outbid Needed</div>
              <div className="num-tabular" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-gold)', marginTop: '0.2rem' }}>
                {formatCurrency(minRequiredBid)}
              </div>
            </div>
          </div>

          {/* Neighborhood duel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Rank Neighborhood
            </span>
            {higherProduct && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.4rem 0.6rem', background: 'var(--bg-surface-0)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Above: #{higherProduct.rank} {higherProduct.name}</span>
                <span className="num-tabular" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{formatCurrency(higherProduct.bid)}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.4rem 0.6rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--border-indigo)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-white)', fontWeight: 700 }}>Current: #{product.rank} {product.name}</span>
              <span className="num-tabular" style={{ color: 'var(--color-gold)', fontWeight: 800 }}>{formatCurrency(product.bid)}</span>
            </div>
            {lowerProduct && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.4rem 0.6rem', background: 'var(--bg-surface-0)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Below: #{lowerProduct.rank} {lowerProduct.name}</span>
                <span className="num-tabular" style={{ color: 'var(--text-dim)', fontWeight: 700 }}>{formatCurrency(lowerProduct.bid)}</span>
              </div>
            )}
          </div>

          <Button
            variant={product.rank === 1 ? 'gold' : 'primary'}
            size="lg"
            icon={Zap}
            onClick={() => openOutbidModal(product)}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Outbid {product.name} ({formatCurrency(minRequiredBid)}+)
          </Button>
        </div>

        {/* Product Details & Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* About */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '1rem' }}>
              About {product.name}
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.975rem' }}>
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
                  Key Highlights & Capabilities
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                  {product.features.map((feat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-main)',
                        background: 'var(--bg-surface-0)',
                        padding: '0.6rem 0.8rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <CheckCircle2 size={15} color="var(--color-emerald)" style={{ flexShrink: 0 }} />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.pricing && (
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-surface-0)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <Tag size={16} color="var(--color-indigo)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pricing Model:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-white)' }}>{product.pricing}</span>
              </div>
            )}
          </div>

          {/* Activity Log for this product */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '1rem' }}>
              Battle History
            </h3>
            {productActivities.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {productActivities.map((act) => (
                  <ActivityItem key={act.id} activity={act} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>
                No recent outbid activity logged for this listing yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
