# Frontend Structure

## 1. High-Level Architecture

```text
                         WEBSITE
                            |
             +--------------+--------------+
             |              |              |
             v              v              v
          PAGES        COMPONENTS      MOCK DATA
             |              |              |
             v              v              v
       React Router     Reusable UI     Local State
             |              |              |
             +--------------+--------------+
                            |
                            v
                     FRONTEND LOGIC
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
          Ranking       Submission      Activity
           Logic          Logic           Logic
              |             |             |
              +-------------+-------------+
                            |
                            v
                       localStorage
```

---

## 2. Folder Structure

```text
project-root/
│
├── public/
│   ├── images/
│   ├── logos/
│   └── icons/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── logos/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── ProductCard/
│   │   ├── LeaderboardRow/
│   │   ├── RankBadge/
│   │   ├── StatsCard/
│   │   ├── ActivityItem/
│   │   ├── CategoryCard/
│   │   └── SearchBar/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── Leaderboard/
│   │   │   └── Leaderboard.jsx
│   │   │
│   │   ├── Product/
│   │   │   └── ProductDetail.jsx
│   │   │
│   │   ├── Submit/
│   │   │   ├── SubmitProduct.jsx
│   │   │   ├── ProductInfoStep.jsx
│   │   │   ├── BidStep.jsx
│   │   │   ├── ReviewStep.jsx
│   │   │   └── Success.jsx
│   │   │
│   │   ├── Categories/
│   │   │   ├── Categories.jsx
│   │   │   └── CategoryDetail.jsx
│   │   │
│   │   ├── Daily/
│   │   │   └── Daily.jsx
│   │   │
│   │   ├── Activity/
│   │   │   └── Activity.jsx
│   │   │
│   │   ├── About/
│   │   │   └── About.jsx
│   │   │
│   │   ├── FAQ/
│   │   │   └── FAQ.jsx
│   │   │
│   │   ├── Rules/
│   │   │   └── Rules.jsx
│   │   │
│   │   ├── Privacy/
│   │   │   └── Privacy.jsx
│   │   │
│   │   └── Terms/
│   │       └── Terms.jsx
│   │
│   ├── data/
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── activities.js
│   │   └── dailyRankings.js
│   │
│   ├── hooks/
│   │   ├── useProducts.js
│   │   ├── useLeaderboard.js
│   │   ├── useFilter.js
│   │   └── useLocalStorage.js
│   │
│   ├── utils/
│   │   ├── ranking.js
│   │   ├── formatting.js
│   │   ├── validation.js
│   │   ├── slugify.js
│   │   └── mockPayment.js
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 3. Route Structure

```text
/
├── /
│   └── Home
│
├── /leaderboard
│   └── Leaderboard
│
├── /leaderboard/today
│   └── TodayLeaderboard
│
├── /daily
│   └── Daily
│
├── /categories
│   └── Categories
│
├── /categories/:slug
│   └── CategoryDetail
│
├── /product/:slug
│   └── ProductDetail
│
├── /submit
│   └── SubmitProduct
│
├── /activity
│   └── Activity
│
├── /about
│   └── About
│
├── /faq
│   └── FAQ
│
├── /rules
│   └── Rules
│
├── /privacy
│   └── Privacy
│
└── /terms
    └── Terms
```

---

## 4. Component Hierarchy

```text
App
│
├── Navbar
│
├── AppRoutes
│   │
│   ├── Home
│   │   ├── Hero
│   │   ├── StatsSection
│   │   ├── TopLeaderboard
│   │   │   └── LeaderboardRow
│   │   ├── ActivityPreview
│   │   │   └── ActivityItem
│   │   ├── HowItWorks
│   │   └── CategoryGrid
│   │       └── CategoryCard
│   │
│   ├── Leaderboard
│   │   ├── LeaderboardHeader
│   │   ├── SearchBar
│   │   ├── CategoryFilter
│   │   ├── LeaderboardTabs
│   │   └── LeaderboardRow
│   │
│   ├── ProductDetail
│   │   ├── ProductHeader
│   │   ├── ProductStats
│   │   ├── RankCard
│   │   ├── ProductDescription
│   │   ├── ActivityList
│   │   └── OutbidButton
│   │
│   ├── SubmitProduct
│   │   ├── ProgressIndicator
│   │   ├── ProductInfoStep
│   │   ├── BidStep
│   │   ├── ReviewStep
│   │   └── Success
│   │
│   └── OtherPages
│
├── Global Modals
│   ├── OutbidModal
│   ├── MockPaymentModal
│   └── ConfirmationModal
│
└── Footer
```

---

## 5. Data Structure

### Product

```js
{
  id: 1,
  name: "Product Alpha",
  slug: "product-alpha",
  logo: "/logos/alpha.png",
  website: "https://example.com",
  description: "Product description",
  category: "AI",
  bid: 17001,
  clicks: 2438,
  createdAt: "2026-09-01",
  updatedAt: "2026-09-20"
}
```

### Category

```js
{
  id: 1,
  name: "AI",
  slug: "ai",
  description: "Artificial intelligence products",
  productCount: 126
}
```

### Activity

```js
{
  id: 1,
  productId: 1,
  type: "OUTBID",
  message: "Product Alpha was moved to #3",
  amount: 17500,
  timestamp: "2026-09-20T10:30:00"
}
```

### Daily Ranking

```js
{
  date: "2026-09-20",
  rankings: [
    {
      productId: 1,
      rank: 1,
      bid: 17500
    }
  ]
}
```

---

## 6. State Architecture

```text
AppContext
│
├── products
├── categories
├── activities
├── dailyRankings
│
├── leaderboardMode
├── selectedCategory
├── searchQuery
│
├── submissionState
├── selectedProduct
├── modalState
│
└── actions
    ├── addProduct()
    ├── updateBid()
    ├── calculateRank()
    ├── addActivity()
    └── filterProducts()
```

---

## 7. Ranking Logic

```text
Products
   |
   v
Filter by board/category/search
   |
   v
Sort by bid DESC
   |
   v
Equal bid?
   |
   +---- YES → older listing first
   |
   +---- NO
   |
   v
Assign rank
   |
   v
Display leaderboard
```

Utility:

```text
utils/ranking.js
```

Responsibilities:

- calculateRank()
- sortProducts()
- getMinimumOutbid()
- getCategoryRank()
- getOverallRank()

---

## 8. Outbid Interaction

```text
LeaderboardRow
      |
      v
[ OUTBID ]
      |
      v
OutbidModal
      |
      ├── Current bid
      ├── Minimum bid
      └── New bid
             |
             v
       Validation
             |
             v
       Mock Payment
             |
             v
          Success
             |
      +------+------+
      |             |
      v             v
Update Bid    Add Activity
      |
      v
Recalculate Ranking
      |
      v
Update UI
```

---

## 9. Submission Interaction

```text
Submit
  |
  v
Product URL
  |
  v
Product Information
  |
  v
Category
  |
  v
Bid
  |
  v
Review
  |
  v
Mock Checkout
  |
  v
Create Product
  |
  v
Leaderboard
```

---

## 10. Local Storage

Use:

```text
localStorage
│
├── outbid_products
├── outbid_activities
├── outbid_user_submissions
└── outbid_preferences
```

On application startup:

```text
Default mock data
      +
localStorage data
      ↓
Application state
```

---

## 11. UI Design Layers

```text
Design System
│
├── Colors
├── Typography
├── Spacing
├── Border Radius
├── Shadows
├── Buttons
├── Inputs
├── Cards
├── Badges
└── Motion
      |
      v
Reusable Components
      |
      v
Pages
```

---

## 12. Responsive Structure

```text
Desktop
├── Full navbar
├── Multi-column hero
├── Leaderboard table
├── Grid cards
└── Side-by-side sections

Tablet
├── Compact navbar
├── 2-column grids
└── Responsive leaderboard

Mobile
├── Mobile menu
├── Stacked hero
├── Leaderboard cards
├── 1-column grids
└── Full-width CTAs
```

---

## 13. Final Frontend Architecture

```text
                         React App
                             |
          +------------------+------------------+
          |                  |                  |
          v                  v                  v
        Pages           Components          Context
          |                  |                  |
          v                  v                  v
      User Flows        Reusable UI        App State
          |                  |                  |
          +------------------+------------------+
                             |
                             v
                         Utilities
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
           Ranking       Validation     Formatting
              |
              v
                         Mock Data
                             |
                             v
                       localStorage
```

## 14. Build Priority

```text
1. Foundation
       ↓
2. Design System
       ↓
3. Navbar + Layout
       ↓
4. Homepage
       ↓
5. Leaderboard
       ↓
6. Product Detail
       ↓
7. Outbid Flow
       ↓
8. Submit Flow
       ↓
9. Categories
       ↓
10. Daily
       ↓
11. Activity
       ↓
12. Info Pages
       ↓
13. Responsive
       ↓
14. Animation
       ↓
15. Final Polish
```
