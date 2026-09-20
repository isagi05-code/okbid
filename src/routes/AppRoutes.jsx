import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Leaderboard } from '../pages/Leaderboard/Leaderboard';
import { ProductDetail } from '../pages/Product/ProductDetail';
import { SubmitProduct } from '../pages/Submit/SubmitProduct';
import { Categories } from '../pages/Categories/Categories';
import { CategoryDetail } from '../pages/Categories/CategoryDetail';
import { Daily } from '../pages/Daily/Daily';
import { Activity } from '../pages/Activity/Activity';
import { About } from '../pages/About/About';
import { FAQ } from '../pages/FAQ/FAQ';
import { Rules } from '../pages/Rules/Rules';
import { Privacy } from '../pages/Privacy/Privacy';
import { Terms } from '../pages/Terms/Terms';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/leaderboard/today" element={<Leaderboard />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/submit" element={<SubmitProduct />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:slug" element={<CategoryDetail />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {/* Fallback to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
