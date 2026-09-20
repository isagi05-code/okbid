import React from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';
import { Badge } from '../../components/Badge/Badge';
import { Layers } from 'lucide-react';

export function Categories() {
  const { categories } = useApp();

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Badge variant="indigo" size="sm" icon={Layers} style={{ marginBottom: '0.5rem' }}>
          Ecosystem Directory
        </Badge>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-white)' }}>
          Browse Product Sectors
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
          Explore products categorized by domain, engineering stack, and target market.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
