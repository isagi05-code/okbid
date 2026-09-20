import { useMemo } from 'react';
import { useApp } from '../context/AppContext';

export function useProducts(filterCategory = null) {
  const { products, trackClick } = useApp();

  const filtered = useMemo(() => {
    if (!filterCategory || filterCategory === 'All') return products;
    return products.filter(
      (p) => p.category?.toLowerCase() === filterCategory.toLowerCase()
    );
  }, [products, filterCategory]);

  const topThree = useMemo(() => filtered.slice(0, 3), [filtered]);

  return {
    products: filtered,
    topThree,
    totalCount: filtered.length,
    trackClick
  };
}
