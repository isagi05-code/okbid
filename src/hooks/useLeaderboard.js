import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export function useLeaderboard(initialMode = 'all-time') {
  const { products, dailyRankings } = useApp();
  const [mode, setMode] = useState(initialMode); // 'all-time' | 'today' | 'trending'

  const leaderboardItems = useMemo(() => {
    if (mode === 'today') {
      // Simulate today's high activity subset or today's snapshot
      return [...products].sort((a, b) => {
        const timeA = new Date(a.updatedAt || 0).getTime();
        const timeB = new Date(b.updatedAt || 0).getTime();
        return timeB - timeA;
      });
    }

    if (mode === 'trending') {
      // Sorted by clicks
      return [...products].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    }

    // Default: all-time highest stakes
    return products;
  }, [products, mode]);

  return {
    mode,
    setMode,
    items: leaderboardItems,
    dailyRankings
  };
}
