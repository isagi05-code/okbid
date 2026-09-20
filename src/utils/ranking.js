// Ranking logic, tie-breaking, and minimum outbid calculations

export function sortProductsByBid(products = []) {
  return [...products].sort((a, b) => {
    // 1. Primary: Bid amount descending
    if (b.bid !== a.bid) {
      return b.bid - a.bid;
    }
    // 2. Secondary: Older listing ranks first (earlier createdAt date)
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateA - dateB;
  });
}

export function calculateRankings(products = []) {
  const sorted = sortProductsByBid(products);
  return sorted.map((product, index) => ({
    ...product,
    rank: index + 1
  }));
}

export function getMinimumIncrement(currentBid = 0) {
  if (currentBid < 500) return 50;
  if (currentBid < 2000) return 100;
  if (currentBid < 5000) return 250;
  if (currentBid < 15000) return 500;
  return 1000;
}

export function getMinimumOutbid(currentBid = 0) {
  return currentBid + getMinimumIncrement(currentBid);
}

export function predictRank(products = [], hypotheticalBid = 0, currentProductId = null) {
  // Filter out the current product if it's already on the board
  const otherProducts = currentProductId 
    ? products.filter(p => p.id !== currentProductId) 
    : [...products];

  const sortedOthers = sortProductsByBid(otherProducts);
  
  // Find where the new bid lands
  let rank = 1;
  for (const item of sortedOthers) {
    if (hypotheticalBid > item.bid) {
      break;
    }
    rank++;
  }
  return rank;
}

export function getCategoryRankings(products = [], category) {
  if (!category || category === 'All') return calculateRankings(products);
  const filtered = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  return calculateRankings(filtered);
}
