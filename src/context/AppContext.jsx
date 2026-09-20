import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { initialProducts } from '../data/products';
import { initialCategories } from '../data/categories';
import { initialActivities } from '../data/activities';
import { initialDailyRankings } from '../data/dailyRankings';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateRankings, getMinimumOutbid, predictRank } from '../utils/ranking';
import { slugify } from '../utils/slugify';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Persisted state in localStorage
  const [rawProducts, setRawProducts] = useLocalStorage('okbid_products_v1', initialProducts);
  const [activities, setActivities] = useLocalStorage('okbid_activities_v1', initialActivities);
  const [categories] = useState(initialCategories);
  const [dailyRankings] = useState(initialDailyRankings);

  // Active outbid modal state
  const [outbidModalProduct, setOutbidModalProduct] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Compute live ranked products
  const products = useMemo(() => {
    return calculateRankings(rawProducts);
  }, [rawProducts]);

  // Compute category statistics dynamically
  const categoriesWithStats = useMemo(() => {
    return categories.map((cat) => {
      const catProducts = products.filter(
        (p) => p.category?.toLowerCase() === cat.name?.toLowerCase()
      );
      const totalBids = catProducts.reduce((sum, p) => sum + (p.bid || 0), 0);
      const totalClicks = catProducts.reduce((sum, p) => sum + (p.clicks || 0), 0);
      return {
        ...cat,
        productCount: catProducts.length,
        totalBids,
        totalClicks,
        topProduct: catProducts[0] || null
      };
    });
  }, [categories, products]);

  // Outbid Action
  const placeOutbid = useCallback(
    (productId, newBidAmount, bidderNote = '') => {
      const target = products.find((p) => p.id === productId);
      if (!target) return false;

      const minBid = getMinimumOutbid(target.bid);
      if (newBidAmount < minBid) {
        addToast('Invalid Bid', `New bid must be at least $${minBid}`, 'error');
        return false;
      }

      const prevRank = target.rank;
      const predictedNewRank = predictRank(rawProducts, newBidAmount, target.id);

      // Update product bid in storage
      const now = new Date().toISOString();
      setRawProducts((prev) =>
        prev.map((p) => {
          if (p.id === productId) {
            return {
              ...p,
              bid: newBidAmount,
              updatedAt: now
            };
          }
          return p;
        })
      );

      // Log activity event
      const newActivity = {
        id: `act-${Date.now()}`,
        productId: target.id,
        productName: target.name,
        productSlug: target.slug,
        type: predictedNewRank < prevRank ? 'OUTBID' : 'BID_INCREASE',
        title:
          predictedNewRank === 1
            ? `${target.name} claimed #1 Spotlight!`
            : predictedNewRank < prevRank
            ? `${target.name} climbed to #${predictedNewRank}`
            : `${target.name} increased bid to $${newBidAmount.toLocaleString()}`,
        message:
          bidderNote ||
          `Raised bid from $${target.bid.toLocaleString()} to $${newBidAmount.toLocaleString()}`,
        amount: newBidAmount,
        prevRank,
        newRank: predictedNewRank,
        timestamp: now
      };

      setActivities((prev) => [newActivity, ...prev]);

      addToast(
        'Bid Successful!',
        `${target.name} is now positioned at Rank #${predictedNewRank} with $${newBidAmount.toLocaleString()}`,
        'success'
      );

      setOutbidModalProduct(null);
      return true;
    },
    [products, rawProducts, setRawProducts, setActivities, addToast]
  );

  // Submit Product Action
  const submitProduct = useCallback(
    (submissionData) => {
      const slug = slugify(submissionData.name);
      const newId = Date.now();
      const now = new Date().toISOString();

      const newProduct = {
        id: newId,
        name: submissionData.name.trim(),
        slug: slug || `product-${newId}`,
        tagline: submissionData.tagline.trim(),
        description: submissionData.description || submissionData.tagline.trim(),
        website: submissionData.website.trim(),
        category: submissionData.category,
        bid: Number(submissionData.bid),
        clicks: 0,
        maker: submissionData.maker || 'anonymous_founder',
        createdAt: now,
        updatedAt: now,
        brandColor: submissionData.brandColor || '#6366F1',
        logoLetter: (submissionData.name.trim()[0] || 'P').toUpperCase(),
        features: submissionData.features || ['Instant verification', 'Real-time telemetry'],
        pricing: submissionData.pricing || 'Free / Paid',
        verified: false
      };

      // Add to list
      setRawProducts((prev) => [newProduct, ...prev]);

      // Calculate new rank
      const initialRank = predictRank(rawProducts, newProduct.bid);

      // Add to activity stream
      const newActivity = {
        id: `act-${Date.now()}`,
        productId: newId,
        productName: newProduct.name,
        productSlug: newProduct.slug,
        type: 'NEW_SUBMISSION',
        title: `${newProduct.name} joined OKBid`,
        message: `Entered the arena with an initial stake of $${newProduct.bid.toLocaleString()} at Rank #${initialRank}.`,
        amount: newProduct.bid,
        prevRank: null,
        newRank: initialRank,
        timestamp: now
      };

      setActivities((prev) => [newActivity, ...prev]);

      addToast(
        'Product Launched!',
        `${newProduct.name} is now live at Rank #${initialRank}!`,
        'success'
      );

      return newProduct;
    },
    [rawProducts, setRawProducts, setActivities, addToast]
  );

  // Track product clicks
  const trackClick = useCallback(
    (productId) => {
      setRawProducts((prev) =>
        prev.map((p) => {
          if (p.id === productId) {
            return { ...p, clicks: (p.clicks || 0) + 1 };
          }
          return p;
        })
      );
    },
    [setRawProducts]
  );

  // Reset demo data helper
  const resetToDefaults = useCallback(() => {
    setRawProducts(initialProducts);
    setActivities(initialActivities);
    addToast('Reset Complete', 'OKBid data has been restored to default seeds.', 'info');
  }, [setRawProducts, setActivities, addToast]);

  const value = {
    products,
    categories: categoriesWithStats,
    activities,
    dailyRankings,
    outbidModalProduct,
    openOutbidModal: setOutbidModalProduct,
    closeOutbidModal: () => setOutbidModalProduct(null),
    placeOutbid,
    submitProduct,
    trackClick,
    resetToDefaults,
    toasts,
    addToast,
    removeToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
