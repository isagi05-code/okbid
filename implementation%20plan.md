# Frontend Implementation Plan

## 1. Project Scope

Build a frontend-only website inspired by the core interaction model of outbid.lol:

- Public product leaderboard
- All-time and daily rankings
- Product/category discovery
- Product submission flow
- Outbid interaction
- Mock payment/confirmation
- Activity feed
- Product detail pages
- Responsive design
- Premium, competitive visual style

### Out of Scope

No real backend functionality in this phase:

- No real authentication
- No real database
- No real payment gateway
- No real API
- No persistent server-side ranking
- No production analytics
- No admin backend

Use mock data, React state, and localStorage where useful.

---

## 2. Recommended Stack

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- JavaScript/JSX
- Local mock data
- localStorage for frontend persistence

---

## 3. Development Phases

### Phase 0 — Project Foundation

Tasks:

- Create Vite React project
- Configure Tailwind CSS
- Configure React Router
- Add Framer Motion
- Set up global CSS
- Define typography
- Define spacing and design tokens
- Create reusable Button/Input/Card components

Deliverable:

A clean application shell with routing and the base design system.

---

### Phase 1 — Global UI

Build:

- Navbar
- Mobile navigation
- Footer
- Global buttons
- Inputs
- Badges
- Cards
- Modal
- Loading states
- Toast/notification component

Deliverable:

Reusable UI system used across every page.

---

### Phase 2 — Homepage

Sections:

1. Hero
2. Primary CTA
3. Live statistics
4. Current top leaderboard
5. Recent activity
6. How it works
7. Featured categories
8. Featured products
9. Footer

Interactions:

- CTA → Submit Product
- Product → Product Detail
- Leaderboard → Leaderboard page
- Category → Category page

---

### Phase 3 — Leaderboard

Build:

- All-time leaderboard
- Today leaderboard
- Daily leaderboard
- Search
- Category filter
- Ranking cards/rows
- Bid amount
- Click count
- Outbid CTA

Mock ranking logic:

```text
sort by bid DESC
if bids are equal:
    older listing ranks first
```

---

### Phase 4 — Product Detail

Build:

- Product logo
- Product name
- Description
- Website CTA
- Current bid
- Overall rank
- Category rank
- Click statistics
- Listing age
- Recent activity
- Outbid button

Route:

```text
/product/:slug
```

---

### Phase 5 — Outbid Flow

Flow:

```text
Click OUTBID
      ↓
Open modal
      ↓
Show current bid
      ↓
Calculate minimum bid
      ↓
Enter new bid
      ↓
Validate amount
      ↓
Mock checkout
      ↓
Success
      ↓
Update local state
      ↓
Recalculate ranking
      ↓
Create activity event
```

No real payment should be processed.

---

### Phase 6 — Product Submission

Create a multi-step flow:

```text
Step 1 → Product URL
Step 2 → Product Information
Step 3 → Bid Amount
Step 4 → Review
Step 5 → Mock Success
```

Validate:

- URL
- Product name
- Category
- Bid amount
- Required fields

---

### Phase 7 — Categories

Build:

- Category directory
- Category search
- Category cards
- Product count
- Category leaderboard

Route:

```text
/categories
/categories/:slug
```

---

### Phase 8 — Daily Rankings

Build:

- Today's rankings
- Historical daily rankings
- Date selector
- Daily leaderboard
- Top products

Frontend mock data can contain several historical dates.

---

### Phase 9 — Activity Feed

Display events such as:

```text
Product Alpha moved to #3
Product Beta was outbid
Product Gamma entered the board
Product Delta increased its bid
```

Use Framer Motion for live-looking transitions.

---

### Phase 10 — Information Pages

Build:

- About
- FAQ
- Rules
- Privacy
- Terms

These pages can be static frontend content.

---

### Phase 11 — Responsive Design

Support:

```text
Desktop  ≥ 1024px
Tablet   768–1023px
Mobile   < 768px
```

Mobile changes:

- Desktop table → cards
- Full navbar → mobile menu
- Multi-column layouts → stacked layouts
- Large hero → compact hero
- Modal → mobile bottom sheet/full-screen modal where appropriate

---

### Phase 12 — Animation & Polish

Add:

- Page transitions
- Card hover effects
- Rank movement animations
- Number counters
- Activity feed transitions
- Modal transitions
- Success animation
- Button micro-interactions
- Loading skeletons

Keep animations subtle and fast.

---

### Phase 13 — Frontend Persistence

Use localStorage for:

- Submitted products
- Updated bids
- User's recently viewed products
- Mock activity
- UI preferences if required

This makes the frontend feel persistent without a backend.

---

## 4. Core Frontend State

Recommended state:

```text
products
categories
activities
leaderboardMode
selectedCategory
searchQuery
selectedProduct
submissionData
bidData
modalState
```

---

## 5. Core User Flows

### Flow A — Discover

```text
Home
 ↓
Leaderboard
 ↓
Filter/Search
 ↓
Product
 ↓
Visit Website
```

### Flow B — Outbid

```text
Leaderboard
 ↓
Product
 ↓
Outbid
 ↓
Bid Modal
 ↓
Mock Checkout
 ↓
Success
 ↓
New Rank
```

### Flow C — Submit

```text
Home
 ↓
Submit Product
 ↓
Product Details
 ↓
Bid
 ↓
Review
 ↓
Mock Checkout
 ↓
Success
 ↓
Leaderboard
```

---

## 6. Completion Checklist

### Foundation
- [ ] React/Vite setup
- [ ] Tailwind
- [ ] Router
- [ ] Framer Motion
- [ ] Global styles

### UI
- [ ] Navbar
- [ ] Footer
- [ ] Buttons
- [ ] Cards
- [ ] Inputs
- [ ] Modals
- [ ] Badges

### Pages
- [ ] Home
- [ ] Leaderboard
- [ ] Product
- [ ] Submit
- [ ] Categories
- [ ] Daily
- [ ] Activity
- [ ] About
- [ ] FAQ
- [ ] Rules
- [ ] Privacy
- [ ] Terms

### Functionality
- [ ] Search
- [ ] Filtering
- [ ] Sorting
- [ ] Mock bidding
- [ ] Rank calculation
- [ ] Mock checkout
- [ ] Activity generation
- [ ] localStorage

### Quality
- [ ] Responsive
- [ ] Accessible
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Smooth animations
- [ ] SEO metadata
