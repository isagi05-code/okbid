import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { LeaderboardRow } from '../../components/LeaderboardRow/LeaderboardRow';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { formatCurrency } from '../../utils/formatting';
import { ArrowLeft, Layers, Plus, Sparkles } from 'lucide-react';

export function CategoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { categories, products } = useApp();

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-white)' }}>
          Category Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          We could not locate the requested category sector.
        </p>
        <Link to="/categories">
          <Button variant="primary" icon={ArrowLeft}>
            Back to Categories
          </Button>
        </Link>
      </div>
    );
  }

  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase() === category.name?.toLowerCase()
  );

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <button
          onClick={() => navigate('/categories')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            padding: 0,
            marginBottom: '1rem'
          }}
        >
          <ArrowLeft size={16} /> All Categories
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="indigo" size="sm">
                Category Spotlight
              </Badge>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
                {categoryProducts.length} Competitors Listed
              </span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-white)' }}>
              {category.name}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.35rem', maxWidth: '640px' }}>
              {category.description}
            </p>
          </div>

          <Link to="/submit" style={{ textDecoration: 'none' }}>
            <Button variant="gold" icon={Plus}>
              List in {category.name}
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid of products in this category */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)' }}>
            Category Leaderboard
          </h2>
          <span className="num-tabular" style={{ fontSize: '0.875rem', color: 'var(--color-gold)', fontWeight: 700 }}>
            {formatCurrency(category.totalBids || 0)} Staked in Category
          </span>
        </div>

        {categoryProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '3.5rem',
              background: 'var(--bg-surface-0)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <p style={{ color: 'var(--text-muted)' }}>No products listed in this category yet.</p>
            <Link to="/submit" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
              <Button variant="primary">Be the First to List</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
