# Handyman Services — Progress Tracker

## Status: Planning Phase

---

### Phase 1: Foundation (Weeks 1-3)
- [ ] Initialize Turborepo + pnpm workspaces
- [ ] Set up `packages/db` with Prisma schema
- [ ] Set up `packages/auth` with NextAuth v5
- [ ] Set up `packages/types` with core Zod schemas
- [ ] Set up `packages/config` (Tailwind, TSConfig, ESLint)
- [ ] Set up `apps/web` — Next.js 15 with next-intl
- [ ] Set up `apps/admin` — Next.js 15 scaffold
- [ ] Design system: colors, typography, tokens
- [ ] Shared layout: Navbar, Footer, Sidebar
- [ ] Auth pages: Login, Register, Forgot Password, Email Verification
- [ ] Homepage: Hero, categories, how-it-works, CTA
- [ ] Seed data: categories, services, test users
- [ ] Dev environment: local PostgreSQL, env vars

### Phase 2: Tradesperson Profiles (Weeks 4-5)
- [ ] Registration flow (multi-step)
- [ ] TradespersonProfile CRUD actions
- [ ] Profile page (`/meistras/[slug]`) — SSR + ISR
- [ ] Photo gallery (before/after)
- [ ] Service listing with pricing
- [ ] Availability calendar
- [ ] Qualification upload
- [ ] Public profile tabs
- [ ] Edit profile dashboard
- [ ] Profile completeness indicator

### Phase 3: Search & Discovery (Weeks 6-7)
- [ ] Search page with filters
- [ ] PostgreSQL FTS + trigram indexes
- [ ] Map view (Leaflet)
- [ ] Category landing pages
- [ ] City landing pages
- [ ] Service landing pages
- [ ] Sorting options
- [ ] Search result cards
- [ ] Favorites
- [ ] Recently viewed

### Phase 4: Quote System (Weeks 8-10)
- [ ] Quote request form
- [ ] Quote request listing for tradespeople
- [ ] Quote response with milestones
- [ ] Quote comparison view
- [ ] Quote acceptance → Booking
- [ ] Auto-decline other quotes
- [ ] Quote expiry (cron)
- [ ] Notifications
- [ ] Email notifications

### Phase 5: Messaging System (Weeks 11-12)
- [ ] Conversation model + CRUD
- [ ] Message server actions
- [ ] Real-time delivery (Pusher)
- [ ] Chat UI
- [ ] File attachments
- [ ] System messages
- [ ] Unread counts
- [ ] Conversation list
- [ ] Contact masking
- [ ] Rate limiting + abuse reporting

### Phase 6: Milestone Escrow & Payments (Weeks 13-16)
- [ ] Stripe Connect onboarding
- [ ] Milestone PaymentIntent flow
- [ ] Payment UI (Stripe Elements)
- [ ] Milestone progress tracker
- [ ] Submit milestone + evidence
- [ ] Approve/dispute milestone
- [ ] Auto-approval (72h cron)
- [ ] Payment capture + transfer
- [ ] Earnings dashboard
- [ ] Payment history
- [ ] Refund flow
- [ ] Platform fee tracking
- [ ] Payout reports

### Phase 7: Reviews & Trust (Weeks 17-18)
- [ ] Review form (multi-dimensional)
- [ ] Review display
- [ ] Review photos
- [ ] Tradesperson responses
- [ ] Rating calculation
- [ ] Review request emails
- [ ] Admin moderation
- [ ] Verification queue
- [ ] Document review
- [ ] Verification badges
- [ ] Trust indicators

### Phase 8: Disputes (Weeks 19-20)
- [ ] Dispute creation
- [ ] Evidence upload
- [ ] Admin dispute dashboard
- [ ] Resolution tools
- [ ] Status tracking
- [ ] Dispute history
- [ ] Auto-escalation
- [ ] Resolution emails

### Phase 9: Subscriptions & Monetization (Weeks 21-22)
- [ ] Subscription tiers
- [ ] Stripe Billing
- [ ] Subscription management
- [ ] Lead access by tier
- [ ] Featured listings
- [ ] Subscription analytics
- [ ] Expiry notifications
- [ ] Free trial

### Phase 10: Admin Panel Completion (Weeks 23-24)
- [ ] Dashboard with charts
- [ ] User management
- [ ] Tradesperson management
- [ ] Booking oversight
- [ ] Payment monitoring
- [ ] Category management
- [ ] Platform settings
- [ ] Activity log
- [ ] Export/reports
- [ ] Admin notifications

### Phase 11: Notifications & Email (Weeks 25-26)
- [ ] Email templates (15+)
- [ ] In-app notifications
- [ ] Push notifications
- [ ] Notification preferences
- [ ] Email verification
- [ ] Password reset
- [ ] Unsubscribe links
- [ ] Notification center

### Phase 12: SEO & Content (Weeks 27-28)
- [ ] Meta tags
- [ ] JSON-LD structured data
- [ ] Dynamic sitemap
- [ ] Category landing pages
- [ ] City landing pages
- [ ] Blog/guides system
- [ ] Static pages
- [ ] Legal pages

### Phase 13: Polish & Launch (Weeks 29-32)
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Error pages
- [ ] Loading states
- [ ] Cookie consent (GDPR)
- [ ] Data deletion flow
- [ ] Rate limiting audit
- [ ] Security audit
- [ ] Load testing
- [ ] Production seed data
- [ ] VPS deployment
- [ ] Monitoring (Sentry)
- [ ] Backups
- [ ] Soft launch
