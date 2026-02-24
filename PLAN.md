# Handyman Services — Lithuanian Trades & Home Services Marketplace

> A Checkatrade-inspired platform for the Lithuanian market with milestone-based escrow payments, messaging, quotes, and verified tradespeople.

**Brand**: Handyman Services

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Architecture & Tech Stack](#2-architecture--tech-stack)
3. [Monorepo Structure](#3-monorepo-structure)
4. [Database Schema Design](#4-database-schema-design)
5. [Core Features](#5-core-features)
6. [Milestone Escrow System](#6-milestone-escrow-system)
7. [Messaging System](#7-messaging-system)
8. [Quote System](#8-quote-system)
9. [Verification & Trust](#9-verification--trust)
10. [Payment & Billing](#10-payment--billing)
11. [Admin Panel](#11-admin-panel)
12. [SEO & Marketing](#12-seo--marketing)
13. [Internationalization](#13-internationalization)
14. [Security & Compliance](#14-security--compliance)
15. [Development Phases](#15-development-phases)
16. [Deployment & Infrastructure](#16-deployment--infrastructure)

---

## 1. Platform Overview

### What It Is
A two-sided marketplace connecting Lithuanian homeowners with verified tradespeople (plumbers, electricians, builders, painters, etc.) — similar to Checkatrade.com but with:
- **Milestone-based escrow** — pay per completed stage, not upfront
- **Built-in messaging** — real-time chat between customers and tradespeople
- **Quote request system** — post a job, receive competing quotes
- **Lithuanian-first** — language, cities, business registration (Rekvizitai.lt integration)

### User Roles

| Role | Description | Dashboard |
|------|-------------|-----------|
| **CUSTOMER** | Homeowner seeking services | `/account/*` |
| **TRADESPERSON** | Individual tradesperson or company | `/tradesperson/*` |
| **ADMIN** | Platform administration | `admin.handymanservices.com` |

### Revenue Model (Checkatrade-adapted for Lithuania)

| Stream | Description | Pricing |
|--------|-------------|---------|
| **Subscription** | Monthly membership for tradespeople | €29/€59/€99/mo (3 tiers) |
| **Lead fees** | Pay-per-quote-request (alternative to subscription) | €3-15 per lead |
| **Platform fee** | Commission on escrow payments | 5-8% of transaction |
| **Featured listings** | Premium placement in search | €15-30/month |
| **Verification badge** | Enhanced vetting package | One-time €49 |

---

## 2. Architecture & Tech Stack

### Why Monorepo (Turborepo)

Instead of fully separate repos, we use a **Turborepo monorepo** — the modern standard for multi-app projects:

- **Shared types**: Change a Prisma model → both apps get it instantly
- **Shared auth**: Single NextAuth config with shared domain cookie
- **Independent deploys**: Admin and web deploy separately
- **Single CI/CD**: One pipeline, Turborepo only rebuilds what changed
- **No API layer needed initially**: Both apps query Prisma directly via Server Components

### Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Monorepo** | Turborepo + pnpm workspaces | Industry standard, Vercel-native |
| **Customer site** | Next.js 15 (App Router) | SSR for SEO, Server Components |
| **Admin panel** | Next.js 15 (App Router) | Same patterns, Server Components for dashboards |
| **Database** | PostgreSQL 16 | Proven, JSONB for flexible data |
| **ORM** | Prisma 6+ | Type-safe, migrations, shared package |
| **Auth** | NextAuth v5 (Auth.js) | Shared sessions via domain cookie |
| **Payments** | Stripe Connect + Custom Escrow | Milestone payments, provider payouts |
| **Email** | Resend | Transactional emails |
| **Real-time** | Pusher or Ably (or WebSockets via Socket.io) | Messaging, notifications |
| **Maps** | Google Maps API + Leaflet | Address autocomplete + map display |
| **File upload** | Local disk + sharp (WebP) | Cost-effective, Nginx serving |
| **Styling** | Tailwind v4 | Utility-first, shared preset |
| **Validation** | Zod | Shared schemas across apps |
| **i18n** | next-intl | Lithuanian (default) + English |
| **Search** | PostgreSQL full-text + trigram | Good enough to start, upgrade to Meilisearch later |
| **Background jobs** | node-cron / BullMQ | Reminders, payout processing |
| **Monitoring** | Sentry | Error tracking |

---

## 3. Monorepo Structure

```
meistrai/
├── apps/
│   ├── web/                          # Customer-facing website
│   │   ├── src/
│   │   │   ├── app/[locale]/
│   │   │   │   ├── (public)/         # Home, search, profiles, blog
│   │   │   │   ├── (auth)/           # Login, register, forgot password
│   │   │   │   ├── (account)/        # Customer dashboard
│   │   │   │   ├── (tradesperson)/   # Tradesperson dashboard
│   │   │   │   └── api/              # Webhooks (Stripe, etc.)
│   │   │   ├── components/           # Web-specific components
│   │   │   └── lib/                  # Web-specific logic
│   │   ├── messages/                 # lt.json, en.json
│   │   ├── public/
│   │   ├── next.config.ts
│   │   └── package.json
│   │
│   └── admin/                        # Admin panel
│       ├── src/
│       │   ├── app/
│       │   │   ├── (dashboard)/      # Admin dashboard, analytics
│       │   │   ├── users/            # User management
│       │   │   ├── tradespeople/     # Tradesperson verification
│       │   │   ├── bookings/         # Booking oversight
│       │   │   ├── disputes/         # Dispute resolution
│       │   │   ├── categories/       # Trade categories management
│       │   │   ├── payments/         # Payment monitoring
│       │   │   ├── quotes/           # Quote monitoring
│       │   │   ├── reviews/          # Review moderation
│       │   │   ├── settings/         # Platform settings
│       │   │   └── api/              # Admin-specific endpoints
│       │   ├── components/           # Admin-specific components
│       │   └── lib/                  # Admin-specific logic
│       ├── next.config.ts
│       └── package.json
│
├── packages/
│   ├── db/                           # Shared database layer
│   │   ├── prisma/
│   │   │   ├── schema.prisma         # Single source of truth
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   ├── client.ts            # PrismaClient singleton
│   │   │   └── index.ts             # Re-exports
│   │   └── package.json
│   │
│   ├── auth/                         # Shared auth config
│   │   ├── src/
│   │   │   ├── config.ts            # NextAuth providers, callbacks
│   │   │   ├── middleware.ts         # Auth middleware helpers
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── types/                        # Shared Zod schemas & TS types
│   │   ├── src/
│   │   │   ├── user.ts
│   │   │   ├── booking.ts
│   │   │   ├── quote.ts
│   │   │   ├── milestone.ts
│   │   │   ├── message.ts
│   │   │   ├── review.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── services/                     # Shared business logic
│   │   ├── src/
│   │   │   ├── stripe.ts            # Stripe helpers (Connect, escrow)
│   │   │   ├── email.ts             # Resend email service
│   │   │   ├── email-templates.ts   # HTML email templates
│   │   │   ├── push.ts              # Web Push notifications
│   │   │   ├── sms.ts              # SMS (optional, Twilio)
│   │   │   ├── storage.ts           # File upload + sharp
│   │   │   ├── rate-limit.ts        # Rate limiting
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── ui/                           # Shared UI components (optional)
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── DataTable.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── config/                       # Shared configs
│       ├── tailwind/                 # Shared Tailwind preset
│       ├── typescript/               # Shared tsconfig base
│       └── eslint/                   # Shared ESLint config
│
├── turbo.json                        # Turborepo pipeline config
├── pnpm-workspace.yaml               # Workspace definition
├── package.json                      # Root package.json
├── CLAUDE.md                         # AI assistant rules
├── PLAN.md                           # This file
└── PROGRESS.md                       # Phase tracking
```

### Domain Setup

| Subdomain | App | Purpose |
|-----------|-----|---------|
| `handymanservices.com` | `apps/web` | Customer-facing website |
| `admin.handymanservices.com` | `apps/admin` | Admin panel |
| `api.handymanservices.com` | Future | REST API (when mobile app needed) |

### Auth Cookie Sharing

Both apps share auth via a cookie set on `.handymanservices.com`:
- Customer logs into `handymanservices.com` → cookie on `.handymanservices.com`
- Admin logs into `admin.handymanservices.com` → same cookie domain
- Admin panel checks `roles.includes("ADMIN")` in middleware

---

## 4. Database Schema Design

### Core Models

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│    User      │────▶│ TradespersonProfile│────▶│ TradeCategory   │
│ (all roles)  │     │ (bio, photos,    │     │ (Plumber, etc.) │
│              │     │  location, etc.) │     │                 │
└─────────────┘     └──────────────────┘     └─────────────────┘
       │                     │                        │
       │                     │                        │
       ▼                     ▼                        ▼
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  QuoteReq   │────▶│    Quote         │────▶│   TradeService  │
│ (job post)  │     │ (tradesperson's  │     │ (specific skill)│
│             │     │  response/bid)   │     │                 │
└─────────────┘     └──────────────────┘     └─────────────────┘
       │                     │
       │                     │
       ▼                     ▼
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Booking   │────▶│   Milestone      │────▶│    Payment      │
│ (accepted   │     │ (stages of work) │     │ (Stripe intent  │
│  quote)     │     │                  │     │  per milestone) │
└─────────────┘     └──────────────────┘     └─────────────────┘
       │                     │
       ▼                     ▼
┌─────────────┐     ┌──────────────────┐
│   Review    │     │   Dispute        │
│ (after job) │     │ (if disagreement)│
└─────────────┘     └──────────────────┘

┌─────────────┐     ┌──────────────────┐
│Conversation │────▶│    Message       │
│ (thread)    │     │ (text + files)   │
└─────────────┘     └──────────────────┘
```

### Key Models (Prisma)

```prisma
// === USERS ===

enum UserRole {
  CUSTOMER
  TRADESPERSON
  ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  BANNED
  PENDING_VERIFICATION
}

model User {
  id             String      @id @default(cuid())
  email          String      @unique
  passwordHash   String?
  firstName      String
  lastName       String
  phone          String?
  avatar         String?
  roles          UserRole[]
  status         UserStatus  @default(ACTIVE)
  emailVerified  DateTime?
  lastLoginAt    DateTime?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  // Relations
  tradespersonProfile  TradespersonProfile?
  quoteRequests        QuoteRequest[]
  bookingsAsCustomer   Booking[]        @relation("CustomerBookings")
  reviewsWritten       Review[]         @relation("ReviewAuthor")
  reviewsReceived      Review[]         @relation("ReviewTarget")
  conversations        ConversationParticipant[]
  messages             Message[]
  notifications        Notification[]
  accounts             Account[]        // OAuth
}

// === TRADE CATEGORIES & SERVICES ===

model TradeCategory {
  id          String    @id @default(cuid())
  name        String                           // "Santechnika" (Plumbing)
  nameEn      String                           // "Plumbing"
  slug        String    @unique
  icon        String?
  description String?
  sortOrder   Int       @default(0)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())

  services            TradeService[]
  tradespersonProfiles TradespersonProfileCategory[]
}

model TradeService {
  id          String        @id @default(cuid())
  categoryId  String
  name        String                           // "Vamzdžių keitimas" (Pipe replacement)
  nameEn      String
  slug        String        @unique
  isActive    Boolean       @default(true)

  category    TradeCategory @relation(fields: [categoryId], references: [id])
  tradespersonServices TradespersonService[]
  quoteRequests        QuoteRequest[]
}

// === TRADESPERSON PROFILES ===

enum TradespersonType {
  INDIVIDUAL       // Self-employed
  COMPANY          // Registered company (UAB, MB, IĮ)
}

enum VerificationStatus {
  UNVERIFIED
  PENDING
  VERIFIED
  REJECTED
}

model TradespersonProfile {
  id                String             @id @default(cuid())
  userId            String             @unique
  type              TradespersonType
  companyName       String?
  companyCode       String?            // Įmonės kodas (Lithuanian business code)
  vatCode           String?            // PVM kodas
  slug              String             @unique
  bio               String?
  experience        Int?               // Years of experience
  city              String
  municipality      String?            // Savivaldybė
  address           String?
  latitude          Float?
  longitude         Float?
  serviceRadius     Int                @default(30)   // km
  phone             String
  website           String?
  verificationStatus VerificationStatus @default(UNVERIFIED)
  verifiedAt        DateTime?
  insuranceExpiry   DateTime?
  subscriptionTier  SubscriptionTier?
  subscriptionEnd   DateTime?
  responseTime      Int?               // Average in hours
  completedJobs     Int                @default(0)
  rating            Float              @default(0)
  reviewCount       Int                @default(0)
  isActive          Boolean            @default(true)
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  user              User               @relation(fields: [userId], references: [id])
  categories        TradespersonProfileCategory[]
  services          TradespersonService[]
  photos            TradespersonPhoto[]
  qualifications    Qualification[]
  quotes            Quote[]
  bookings          Booking[]
  availability      TradespersonAvailability[]

  @@index([city, verificationStatus, isActive])
  @@index([rating])
}

enum SubscriptionTier {
  BASIC          // €29/mo — Directory listing, 10 leads/mo
  PROFESSIONAL   // €59/mo — Featured, 30 leads/mo, badge
  PREMIUM        // €99/mo — Top placement, unlimited leads, priority support
}

model TradespersonProfileCategory {
  id            String              @id @default(cuid())
  profileId     String
  categoryId    String

  profile       TradespersonProfile @relation(fields: [profileId], references: [id])
  category      TradeCategory       @relation(fields: [categoryId], references: [id])

  @@unique([profileId, categoryId])
}

model TradespersonService {
  id            String              @id @default(cuid())
  profileId     String
  serviceId     String
  priceFrom     Float?
  priceTo       Float?
  priceUnit     PriceUnit           @default(PER_JOB)
  description   String?

  profile       TradespersonProfile @relation(fields: [profileId], references: [id])
  service       TradeService        @relation(fields: [serviceId], references: [id])

  @@unique([profileId, serviceId])
}

enum PriceUnit {
  PER_HOUR
  PER_DAY
  PER_METER
  PER_UNIT
  PER_JOB
}

model TradespersonPhoto {
  id          String              @id @default(cuid())
  profileId   String
  url         String
  caption     String?
  isBefore    Boolean             @default(false)
  isAfter     Boolean             @default(false)
  sortOrder   Int                 @default(0)
  createdAt   DateTime            @default(now())

  profile     TradespersonProfile @relation(fields: [profileId], references: [id])
}

model Qualification {
  id          String              @id @default(cuid())
  profileId   String
  name        String              // "Elektriko pažymėjimas" (Electrician certificate)
  issuer      String?
  issueDate   DateTime?
  expiryDate  DateTime?
  documentUrl String?             // Uploaded scan
  verified    Boolean             @default(false)

  profile     TradespersonProfile @relation(fields: [profileId], references: [id])
}

model TradespersonAvailability {
  id          String              @id @default(cuid())
  profileId   String
  dayOfWeek   Int                 // 0=Sunday, 6=Saturday
  startTime   String              // "08:00"
  endTime     String              // "18:00"
  isAvailable Boolean             @default(true)

  profile     TradespersonProfile @relation(fields: [profileId], references: [id])

  @@unique([profileId, dayOfWeek])
}

// === QUOTE SYSTEM ===

enum QuoteRequestStatus {
  OPEN              // Accepting quotes
  CLOSED            // Customer chose a tradesperson
  EXPIRED           // No quotes accepted within timeframe
  CANCELLED         // Customer cancelled
}

model QuoteRequest {
  id            String              @id @default(cuid())
  customerId    String
  serviceId     String
  title         String              // "Reikia pakeisti vamzdžius virtuvėje"
  description   String              // Detailed job description
  city          String
  address       String?
  latitude      Float?
  longitude     Float?
  budgetMin     Float?
  budgetMax     Float?
  preferredDate DateTime?
  urgency       Urgency             @default(FLEXIBLE)
  status        QuoteRequestStatus  @default(OPEN)
  expiresAt     DateTime            // Auto-close after 14 days
  photos        QuoteRequestPhoto[]
  createdAt     DateTime            @default(now())
  updatedAt     DateTime            @updatedAt

  customer      User                @relation(fields: [customerId], references: [id])
  service       TradeService        @relation(fields: [serviceId], references: [id])
  quotes        Quote[]

  @@index([serviceId, city, status])
  @@index([customerId, status])
}

enum Urgency {
  EMERGENCY      // Within 24 hours
  URGENT         // Within a week
  FLEXIBLE       // No rush
  PLANNED        // Specific date
}

model QuoteRequestPhoto {
  id              String        @id @default(cuid())
  quoteRequestId  String
  url             String
  caption         String?

  quoteRequest    QuoteRequest  @relation(fields: [quoteRequestId], references: [id])
}

model Quote {
  id              String              @id @default(cuid())
  quoteRequestId  String
  tradespersonId  String
  totalPrice      Float
  description     String              // How they'd approach the work
  estimatedDays   Int?                // Estimated duration
  validUntil      DateTime            // Quote expiry
  status          QuoteStatus         @default(PENDING)
  milestones      QuoteMilestone[]    // Proposed payment stages
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt

  quoteRequest    QuoteRequest        @relation(fields: [quoteRequestId], references: [id])
  tradesperson    TradespersonProfile @relation(fields: [tradespersonId], references: [id])
  booking         Booking?

  @@unique([quoteRequestId, tradespersonId]) // One quote per tradesperson per request
  @@index([tradespersonId, status])
}

enum QuoteStatus {
  PENDING         // Submitted, awaiting customer review
  ACCEPTED        // Customer accepted → becomes a Booking
  DECLINED        // Customer declined
  WITHDRAWN       // Tradesperson withdrew
  EXPIRED         // Past validUntil date
}

model QuoteMilestone {
  id          String    @id @default(cuid())
  quoteId     String
  title       String    // "Griovimas" (Demolition), "Vamzdžių montavimas" (Pipe installation)
  description String?
  amount      Float     // Amount for this stage
  percentage  Float     // Percentage of total (for display)
  sortOrder   Int

  quote       Quote     @relation(fields: [quoteId], references: [id])
}

// === BOOKINGS & MILESTONES (ESCROW) ===

enum BookingStatus {
  PENDING           // Awaiting confirmation
  CONFIRMED         // Both parties agreed
  IN_PROGRESS       // Work started
  COMPLETED         // All milestones done
  CANCELLED         // Cancelled before completion
  DISPUTED          // Under dispute resolution
}

model Booking {
  id              String              @id @default(cuid())
  quoteId         String              @unique
  customerId      String
  tradespersonId  String
  totalPrice      Float
  platformFee     Float               // 5-8% of totalPrice
  status          BookingStatus       @default(PENDING)
  startDate       DateTime?
  endDate         DateTime?
  notes           String?
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt

  quote           Quote               @relation(fields: [quoteId], references: [id])
  customer        User                @relation("CustomerBookings", fields: [customerId], references: [id])
  tradesperson    TradespersonProfile @relation(fields: [tradespersonId], references: [id])
  milestones      Milestone[]
  review          Review?
  dispute         Dispute?

  @@index([customerId, status])
  @@index([tradespersonId, status])
}

enum MilestoneStatus {
  PENDING           // Not started
  IN_PROGRESS       // Work underway
  SUBMITTED         // Tradesperson marked complete, awaiting approval
  APPROVED          // Customer approved → payment released
  DISPUTED          // Customer disputes this milestone
  RELEASED          // Payment transferred to tradesperson
}

model Milestone {
  id              String            @id @default(cuid())
  bookingId       String
  title           String
  description     String?
  amount          Float             // Amount held in escrow for this stage
  sortOrder       Int
  status          MilestoneStatus   @default(PENDING)
  submittedAt     DateTime?         // When tradesperson submitted
  approvedAt      DateTime?         // When customer approved
  releasedAt      DateTime?         // When payment was released
  evidence        MilestoneEvidence[]
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  booking         Booking           @relation(fields: [bookingId], references: [id])
  payment         Payment?

  @@index([bookingId, status])
}

model MilestoneEvidence {
  id            String      @id @default(cuid())
  milestoneId   String
  type          EvidenceType
  url           String      // Photo or document URL
  caption       String?
  uploadedBy    String      // userId
  createdAt     DateTime    @default(now())

  milestone     Milestone   @relation(fields: [milestoneId], references: [id])
}

enum EvidenceType {
  PHOTO
  VIDEO
  DOCUMENT
}

// === PAYMENTS ===

model Payment {
  id                    String        @id @default(cuid())
  milestoneId           String        @unique
  stripePaymentIntentId String?       @unique
  amount                Float
  platformFee           Float
  providerAmount        Float         // amount - platformFee
  currency              String        @default("EUR")
  status                PaymentStatus @default(PENDING)
  capturedAt            DateTime?
  transferredAt         DateTime?     // When sent to tradesperson
  stripeTransferId      String?
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  milestone             Milestone     @relation(fields: [milestoneId], references: [id])
}

enum PaymentStatus {
  PENDING             // Not yet paid
  HELD                // Money captured, held in escrow
  RELEASED            // Released to tradesperson
  REFUNDED            // Refunded to customer
  FAILED              // Payment failed
}

// === MESSAGING ===

model Conversation {
  id            String                      @id @default(cuid())
  bookingId     String?                     // Optional link to booking
  quoteRequestId String?                    // Optional link to quote request
  createdAt     DateTime                    @default(now())
  updatedAt     DateTime                    @updatedAt

  participants  ConversationParticipant[]
  messages      Message[]

  @@index([bookingId])
  @@index([quoteRequestId])
}

model ConversationParticipant {
  id              String        @id @default(cuid())
  conversationId  String
  userId          String
  lastReadAt      DateTime?
  isMuted         Boolean       @default(false)

  conversation    Conversation  @relation(fields: [conversationId], references: [id])
  user            User          @relation(fields: [userId], references: [id])

  @@unique([conversationId, userId])
}

model Message {
  id              String        @id @default(cuid())
  conversationId  String
  senderId        String
  content         String
  type            MessageType   @default(TEXT)
  attachments     MessageAttachment[]
  isRead          Boolean       @default(false)
  createdAt       DateTime      @default(now())

  conversation    Conversation  @relation(fields: [conversationId], references: [id])
  sender          User          @relation(fields: [senderId], references: [id])

  @@index([conversationId, createdAt])
}

enum MessageType {
  TEXT
  SYSTEM          // "Milestone 1 approved", "Quote accepted"
  QUOTE_SENT
  MILESTONE_UPDATE
}

model MessageAttachment {
  id          String    @id @default(cuid())
  messageId   String
  url         String
  fileName    String
  fileSize    Int
  mimeType    String

  message     Message   @relation(fields: [messageId], references: [id])
}

// === REVIEWS ===

model Review {
  id              String    @id @default(cuid())
  bookingId       String    @unique
  authorId        String
  targetUserId    String    // Tradesperson's userId
  overall         Int       // 1-5
  quality         Int       // 1-5 workmanship
  reliability     Int       // 1-5 punctuality
  communication   Int       // 1-5
  value           Int       // 1-5 value for money
  comment         String?
  response        String?   // Tradesperson can respond
  photos          ReviewPhoto[]
  isPublished     Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  booking         Booking   @relation(fields: [bookingId], references: [id])
  author          User      @relation("ReviewAuthor", fields: [authorId], references: [id])
  target          User      @relation("ReviewTarget", fields: [targetUserId], references: [id])

  @@index([targetUserId, isPublished])
}

model ReviewPhoto {
  id        String  @id @default(cuid())
  reviewId  String
  url       String
  caption   String?

  review    Review  @relation(fields: [reviewId], references: [id])
}

// === DISPUTES ===

enum DisputeStatus {
  OPEN
  UNDER_REVIEW
  RESOLVED_CUSTOMER    // In favor of customer
  RESOLVED_TRADESPERSON // In favor of tradesperson
  RESOLVED_COMPROMISE   // Partial resolution
  CLOSED
}

enum DisputeReason {
  POOR_QUALITY
  INCOMPLETE_WORK
  LATE_DELIVERY
  OVERCHARGED
  NO_SHOW
  DAMAGE
  SAFETY_CONCERN
  OTHER
}

model Dispute {
  id            String          @id @default(cuid())
  bookingId     String          @unique
  milestoneId   String?         // Specific milestone disputed
  raisedById    String
  reason        DisputeReason
  description   String
  evidence      DisputeEvidence[]
  status        DisputeStatus   @default(OPEN)
  resolution    String?         // Admin's resolution notes
  resolvedAt    DateTime?
  resolvedById  String?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  booking       Booking         @relation(fields: [bookingId], references: [id])
}

model DisputeEvidence {
  id          String    @id @default(cuid())
  disputeId   String
  uploadedBy  String
  type        EvidenceType
  url         String
  description String?
  createdAt   DateTime  @default(now())

  dispute     Dispute   @relation(fields: [disputeId], references: [id])
}

// === NOTIFICATIONS ===

model Notification {
  id          String            @id @default(cuid())
  userId      String
  type        NotificationType
  title       String
  body        String
  data        Json?             // { bookingId, milestoneId, etc. }
  isRead      Boolean           @default(false)
  createdAt   DateTime          @default(now())

  user        User              @relation(fields: [userId], references: [id])

  @@index([userId, isRead, createdAt])
}

enum NotificationType {
  QUOTE_RECEIVED
  QUOTE_ACCEPTED
  QUOTE_DECLINED
  BOOKING_CONFIRMED
  MILESTONE_SUBMITTED
  MILESTONE_APPROVED
  MILESTONE_DISPUTED
  PAYMENT_RECEIVED
  PAYMENT_RELEASED
  NEW_MESSAGE
  NEW_REVIEW
  DISPUTE_OPENED
  DISPUTE_RESOLVED
  VERIFICATION_APPROVED
  VERIFICATION_REJECTED
  SUBSCRIPTION_EXPIRING
}

// === ADMIN / PLATFORM ===

model PlatformSetting {
  id    String @id @default(cuid())
  key   String @unique
  value String
}

model ActivityLog {
  id          String    @id @default(cuid())
  userId      String?
  action      String
  entity      String    // "User", "Booking", "Milestone"
  entityId    String
  details     Json?
  ipAddress   String?
  createdAt   DateTime  @default(now())

  @@index([entity, entityId])
  @@index([userId, createdAt])
}
```

---

## 5. Core Features

### 5.1 Customer Features

| Feature | Description |
|---------|-------------|
| **Search tradespeople** | By category, city, service, rating, availability |
| **View profiles** | Photos, reviews, qualifications, completed jobs |
| **Request quotes** | Post a job with photos, receive competing bids |
| **Compare quotes** | Side-by-side comparison with milestones |
| **Book & pay** | Accept quote → milestone-based escrow payments |
| **Track progress** | View milestone status, approve completed stages |
| **Message** | Real-time chat with tradesperson |
| **Review** | Multi-dimensional review after job completion |
| **Disputes** | Open dispute if milestone quality unsatisfactory |
| **Notifications** | Email + push + in-app for all key events |
| **Favorites** | Save tradespeople for later |

### 5.2 Tradesperson Features

| Feature | Description |
|---------|-------------|
| **Profile management** | Bio, photos (before/after), services, pricing |
| **Quote management** | Browse open requests, submit quotes with milestones |
| **Calendar** | Availability management |
| **Job management** | Active bookings, milestone progress, evidence upload |
| **Earnings dashboard** | Revenue, pending payouts, payment history |
| **Stripe Connect** | Onboarding for direct payouts |
| **Review responses** | Respond to customer reviews |
| **Subscription** | Choose and manage membership tier |
| **Verification** | Upload qualifications, insurance, business docs |
| **Analytics** | Profile views, quote conversion rate, avg rating |

### 5.3 Admin Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Revenue, users, bookings, disputes overview |
| **User management** | View, suspend, ban customers/tradespeople |
| **Verification queue** | Review tradesperson applications & documents |
| **Category management** | CRUD trade categories & services |
| **Booking oversight** | Monitor all active bookings & milestones |
| **Dispute resolution** | Review evidence, make rulings, release/refund |
| **Payment monitoring** | Escrow balances, payout tracking |
| **Review moderation** | Flag/remove inappropriate reviews |
| **Quote monitoring** | Track quote activity, conversion rates |
| **Platform settings** | Fee percentages, subscription prices |
| **Activity logs** | Full audit trail |
| **Reports** | Revenue, growth, category performance |

---

## 6. Milestone Escrow System

This is the **key differentiator** — the feature that sets this platform apart from Checkatrade.

### How It Works

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MILESTONE ESCROW FLOW                              │
│                                                                      │
│  1. Quote accepted → Booking created with milestones                 │
│                                                                      │
│  2. Customer pays for Milestone 1 → Money held in Stripe escrow      │
│     (capture_method: "manual" or Stripe Connect with delayed capture) │
│                                                                      │
│  3. Tradesperson works on Milestone 1                                │
│     └── Uploads progress photos/evidence                             │
│                                                                      │
│  4. Tradesperson marks Milestone 1 as "Submitted"                    │
│     └── Customer gets notification                                   │
│                                                                      │
│  5. Customer reviews evidence and either:                            │
│     ├── APPROVES → Payment released to tradesperson                  │
│     │              Next milestone payment is requested               │
│     │                                                                │
│     └── DISPUTES → Dispute process starts                            │
│                    Money stays in escrow until resolved               │
│                                                                      │
│  6. Repeat for each milestone until job complete                     │
│                                                                      │
│  7. Auto-approval: If customer doesn't respond within 72h            │
│     after submission, milestone auto-approves                        │
│                                                                      │
│  8. After final milestone → Review prompt sent                       │
└──────────────────────────────────────────────────────────────────────┘
```

### Example: Window Installation (10 windows, €3,000 total)

```
Milestone 1: "Install first 4 windows"     — €1,200 (40%)
  → Tradesperson installs, uploads photos
  → Customer inspects & approves
  → €1,200 released (minus 7% = €84 platform fee → €1,116 to tradesperson)

Milestone 2: "Install next 4 windows"      — €1,200 (40%)
  → Same flow

Milestone 3: "Install last 2 + cleanup"    — €600 (20%)
  → Final milestone includes cleanup
  → Customer approves
  → Review prompt sent
```

### Stripe Implementation

**Option A: Separate PaymentIntents per milestone (Recommended)**
- Each milestone gets its own PaymentIntent with `capture_method: "manual"`
- Customer authorizes payment when milestone starts
- Platform captures when customer approves
- Transfer to tradesperson's Connect account after capture

**Option B: Single PaymentIntent, partial captures**
- One large PaymentIntent for the full booking
- Partial captures as milestones complete
- More complex but fewer payment flows for customer

**We'll use Option A** — simpler, more transparent, each milestone is an independent payment event.

### Auto-Approval Safety Net

- 72 hours after tradesperson submits milestone → auto-approve if customer doesn't respond
- Customer gets reminders at 24h and 48h
- Prevents tradesperson from being blocked by unresponsive customers
- Customer can still dispute within 14 days after auto-approval

---

## 7. Messaging System

### Architecture

| Component | Technology |
|-----------|-----------|
| **Message storage** | PostgreSQL (Conversation + Message models) |
| **Real-time delivery** | Pusher / Ably (WebSocket-as-a-service) |
| **Notifications** | Push + Email for offline users |
| **File attachments** | Local disk + sharp (same as profile photos) |

### Flow

1. Customer or tradesperson opens a conversation (from quote request or booking)
2. Messages sent via Server Action → saved to DB → broadcast via Pusher
3. Recipient gets real-time message if online, push notification if offline
4. System messages auto-posted on key events (quote accepted, milestone approved, etc.)
5. File attachments uploaded via `/api/upload` → URL saved in MessageAttachment

### Safety Features

- **No phone/email sharing before booking** — mask contact details in messages
- **Profanity filter** — basic word filter
- **Rate limiting** — 30 messages/minute
- **Report abuse** — flag inappropriate messages to admin
- **Conversation history** — retained for dispute evidence

---

## 8. Quote System

### Customer Posts a Quote Request

1. Select trade category + service type
2. Describe the job (title + detailed description)
3. Upload photos of the work needed (up to 10)
4. Set budget range (optional)
5. Set preferred dates and urgency level
6. Enter location (city + address)
7. Submit → Matching tradespeople notified

### Tradesperson Responds with Quote

1. Review job details and photos
2. Write approach description (how they'd do the work)
3. Set total price
4. **Define milestones** — break the work into stages with amounts
5. Set estimated duration
6. Set quote validity period
7. Submit → Customer notified

### Customer Compares and Accepts

1. View all quotes side-by-side
2. See milestone breakdowns
3. Check tradesperson profiles, reviews, verification status
4. Message tradespeople for clarification
5. Accept one quote → Booking created with milestones
6. Other quotes auto-declined (tradespeople notified)

### Matching Algorithm

Tradespeople see relevant quote requests based on:
- **Category/service match** — must offer the requested service
- **Location radius** — within their service area
- **Subscription tier** — higher tiers see more requests earlier
- **Availability** — not fully booked
- **Sort by**: proximity, rating, response time

---

## 9. Verification & Trust

### Tradesperson Verification Tiers

| Level | Checks | Badge |
|-------|--------|-------|
| **Basic** (free) | Email + phone verified, profile complete | None |
| **Verified** (€49) | + ID check, business registration (Rekvizitai.lt), insurance proof | ✓ Verified |
| **Premium Verified** | + Qualification certificates verified, 5+ reviews, 90%+ rating | ★ Premium |

### Verification Process

1. Tradesperson uploads documents (ID, business certificate, insurance, qualifications)
2. Admin reviews documents in verification queue
3. Business code checked against Rekvizitai.lt (Lithuanian business registry)
4. Admin approves/rejects with notes
5. Tradesperson notified of result
6. Verified badge displayed on profile

### Trust Signals on Profile

- Verification badge level
- Number of completed jobs
- Average response time
- Member since date
- Review score + count
- Insurance status (valid/expired)
- Qualification list (verified/unverified)

---

## 10. Payment & Billing

### Stripe Connect Setup

```
Platform: handymanservices.com (Stripe account)
    │
    ├── Customer pays → PaymentIntent (manual capture)
    │                    → Money held by Stripe
    │
    ├── Milestone approved → Platform captures payment
    │                        → Calculates platform fee (7%)
    │                        → Creates Transfer to tradesperson
    │
    └── Tradesperson: Connected Account (Express)
        → Receives transfer
        → Stripe handles payout to their bank
```

### Fee Structure

| Item | Amount |
|------|--------|
| Platform fee on escrow payments | 7% |
| Stripe processing fee | ~1.5% + €0.25 (EU) |
| Tradesperson receives | ~91.5% of milestone amount |
| Subscription (Basic) | €29/month |
| Subscription (Professional) | €59/month |
| Subscription (Premium) | €99/month |
| Lead fee (alternative) | €3-15 per quote request |

### Customer Payment Flow

1. Accept quote → Redirected to pay first milestone
2. Stripe Elements card form → PaymentIntent created (manual capture)
3. Customer authorizes → Money held (not captured yet)
4. Tradesperson works → Submits milestone → Customer approves
5. Platform captures payment → Transfer to tradesperson
6. Prompt to pay next milestone
7. Repeat until job complete

### Tradesperson Payout

- Onboard via Stripe Connect Express (during registration)
- Payouts processed within 2-3 business days after milestone release
- Earnings dashboard shows: pending, available, paid out
- Weekly summary emails

---

## 11. Admin Panel

### Pages

| Page | Key Features |
|------|-------------|
| `/` (Dashboard) | Revenue chart, new users, active bookings, pending verifications, disputes |
| `/users` | List all users, search, filter by role/status, suspend/ban |
| `/users/[id]` | User detail, activity, bookings, reviews |
| `/tradespeople` | All tradespeople, filter by verification/subscription/city |
| `/tradespeople/[id]` | Full profile, documents, approve/reject verification |
| `/verification-queue` | Pending verification applications |
| `/categories` | CRUD trade categories and services |
| `/bookings` | All bookings with milestone progress |
| `/bookings/[id]` | Booking detail, milestone timeline, payment status |
| `/quotes` | Quote request activity, conversion funnel |
| `/disputes` | Open disputes, evidence review, resolution tools |
| `/disputes/[id]` | Dispute detail with both parties' evidence |
| `/payments` | Escrow balances, payout history, revenue breakdown |
| `/reviews` | Review moderation, flagged reviews |
| `/subscriptions` | Active subscriptions, revenue by tier |
| `/settings` | Platform fees, auto-approval timer, email templates |
| `/activity-log` | Full audit trail |
| `/reports` | Export-ready analytics and reports |

---

## 12. SEO & Marketing

### SEO Strategy

| Page Type | SEO Approach |
|-----------|-------------|
| Home page | SSR, H1: "Raskite patikimus meistrus Lietuvoje" |
| Category pages | `/santechnika-vilnius` — SSR, structured data |
| Service pages | `/langu-montavimas-kaune` — long-tail keywords |
| Tradesperson profiles | `/meistras/jonas-jonaitis` — ISR (revalidate 1h) |
| Blog/guides | `/patarimai/kaip-pasirinkti-elektriska` — content marketing |
| City landing pages | `/meistrai-vilniuje`, `/meistrai-kaune` — local SEO |

### Structured Data (JSON-LD)

- LocalBusiness for tradesperson profiles
- Service for trade services
- Review + AggregateRating for reviews
- FAQPage for guide articles

---

## 13. Internationalization

### Languages

| Language | Code | Status |
|----------|------|--------|
| Lithuanian | `lt` | Primary (default) |
| English | `en` | Secondary |
| Russian | `ru` | Future (significant minority) |

### Implementation

- next-intl with locale-prefixed routing (`/lt/`, `/en/`)
- Database content stored in Lithuanian (primary)
- Admin panel: Lithuanian only (or English, configurable)
- All UI strings in `messages/lt.json` and `messages/en.json`

---

## 14. Security & Compliance

### Security Measures

| Measure | Implementation |
|---------|---------------|
| **Authentication** | NextAuth v5, bcrypt (12 rounds), JWT + DB sessions |
| **Rate limiting** | Per-IP for auth (5/15min), per-user for messaging |
| **Input validation** | Zod on every server action |
| **SQL injection** | Prisma parameterized queries (built-in) |
| **XSS** | React auto-escaping + sanitize-html for UGC |
| **CSRF** | NextAuth built-in CSRF protection |
| **File uploads** | Type validation, size limits, sharp processing |
| **Payment security** | Stripe handles PCI compliance |
| **Secrets** | Environment variables, never in code |

### GDPR Compliance (Required for Lithuania/EU)

| Requirement | Implementation |
|-------------|---------------|
| **Consent** | Cookie banner, privacy policy acceptance at registration |
| **Right to access** | Account settings → "Download my data" |
| **Right to deletion** | Account settings → "Delete my account" (DataDeletionRequest model) |
| **Data processing agreement** | Stripe, Resend, hosting provider DPAs |
| **Privacy policy** | `/privatumo-politika` — Lithuanian and English |
| **Terms of service** | `/naudojimo-salygos` |

---

## 15. Development Phases

### Phase 1: Foundation (Weeks 1-3)
**Goal**: Monorepo setup, auth, database, basic UI

- [ ] Initialize Turborepo + pnpm workspaces
- [ ] Set up `packages/db` with Prisma schema (User, TradeCategory, TradeService)
- [ ] Set up `packages/auth` with NextAuth v5 (Credentials + Google)
- [ ] Set up `packages/types` with core Zod schemas
- [ ] Set up `packages/config` (Tailwind, TSConfig, ESLint)
- [ ] Set up `apps/web` — Next.js 15 with next-intl (lt/en)
- [ ] Set up `apps/admin` — Next.js 15 basic scaffold
- [ ] Design system: colors, typography, component tokens
- [ ] Shared layout: Navbar, Footer, Sidebar (admin)
- [ ] Auth pages: Login, Register, Forgot Password, Email Verification
- [ ] Homepage: Hero, category grid, how-it-works, CTA sections
- [ ] Seed data: categories, services, test users
- [ ] Development environment: local PostgreSQL, env vars

### Phase 2: Tradesperson Profiles (Weeks 4-5)
**Goal**: Complete tradesperson registration and profile system

- [ ] Registration flow for tradespeople (multi-step)
- [ ] TradespersonProfile model + CRUD actions
- [ ] Profile page (`/meistras/[slug]`) — SSR with ISR
- [ ] Photo gallery with before/after support
- [ ] Service listing with pricing
- [ ] Availability calendar management
- [ ] Qualification upload
- [ ] Public profile: reviews tab, gallery tab, services tab
- [ ] Edit profile dashboard pages
- [ ] Profile completeness indicator

### Phase 3: Search & Discovery (Weeks 6-7)
**Goal**: Customers can find tradespeople

- [ ] Search page with filters (category, city, rating, price range)
- [ ] PostgreSQL full-text search + trigram indexes
- [ ] Map view with Leaflet (tradespeople locations)
- [ ] Category landing pages (SEO-optimized)
- [ ] City landing pages (`/meistrai-vilniuje`)
- [ ] Service landing pages (`/langu-montavimas-kaune`)
- [ ] Sorting: rating, reviews, distance, response time
- [ ] Search results cards with key info
- [ ] Favorites (save tradesperson)
- [ ] Recently viewed tradespeople

### Phase 4: Quote System (Weeks 8-10)
**Goal**: Full quote request → response → acceptance flow

- [ ] Quote request form (multi-step with photo upload)
- [ ] Quote request listing for tradespeople (filtered by match)
- [ ] Quote response form with milestone definition
- [ ] Customer quote comparison view
- [ ] Quote acceptance → Booking creation
- [ ] Auto-decline other quotes
- [ ] Quote expiry (cron job)
- [ ] Notifications: new request, new quote, accepted, declined
- [ ] Email notifications for quote events

### Phase 5: Messaging System (Weeks 11-12)
**Goal**: Real-time chat between customers and tradespeople

- [ ] Conversation model + CRUD
- [ ] Message sending via server actions
- [ ] Real-time delivery (Pusher/Ably integration)
- [ ] Chat UI with message list + input
- [ ] File attachments (photos, documents)
- [ ] System messages (auto-posted on events)
- [ ] Unread count badges
- [ ] Conversation list page
- [ ] Contact detail masking (before booking)
- [ ] Rate limiting + abuse reporting

### Phase 6: Milestone Escrow & Payments (Weeks 13-16)
**Goal**: Complete payment system with milestone-based escrow

- [ ] Stripe Connect onboarding for tradespeople
- [ ] Milestone payment flow (PaymentIntent per milestone)
- [ ] Payment UI (Stripe Elements)
- [ ] Milestone progress tracker (visual timeline)
- [ ] Tradesperson: mark milestone as submitted + upload evidence
- [ ] Customer: review evidence, approve/dispute milestone
- [ ] Auto-approval after 72 hours (cron job)
- [ ] Payment capture on approval → Transfer to Connect account
- [ ] Earnings dashboard for tradespeople
- [ ] Payment history for customers
- [ ] Refund flow (dispute-related)
- [ ] Platform fee calculation and tracking
- [ ] Payout reports

### Phase 7: Reviews & Trust (Weeks 17-18)
**Goal**: Review system and verification process

- [ ] Review form (multi-dimensional: quality, reliability, communication, value)
- [ ] Review display on profiles
- [ ] Review photo uploads
- [ ] Tradesperson response to reviews
- [ ] Overall rating calculation (weighted average)
- [ ] Review request emails (after job completion)
- [ ] Admin: review moderation queue
- [ ] Verification queue (admin side)
- [ ] Document review workflow
- [ ] Verification badge display
- [ ] Trust indicators on profiles

### Phase 8: Disputes (Weeks 19-20)
**Goal**: Dispute resolution system

- [ ] Dispute creation (from milestone or booking)
- [ ] Evidence upload (both parties)
- [ ] Admin dispute dashboard
- [ ] Resolution tools: refund, partial refund, release payment
- [ ] Status tracking and notifications
- [ ] Dispute history on profiles (admin-only)
- [ ] Automatic escalation (if unresolved after 7 days)
- [ ] Resolution emails to both parties

### Phase 9: Subscriptions & Monetization (Weeks 21-22)
**Goal**: Tradesperson subscription system

- [ ] Subscription tiers (Basic, Professional, Premium)
- [ ] Stripe Billing integration (recurring payments)
- [ ] Subscription management (upgrade, downgrade, cancel)
- [ ] Lead access based on tier
- [ ] Featured/sponsored listings
- [ ] Subscription analytics (admin)
- [ ] Expiry notifications
- [ ] Free trial period (optional)

### Phase 10: Admin Panel Completion (Weeks 23-24)
**Goal**: Full admin functionality

- [ ] Dashboard with charts (revenue, users, bookings)
- [ ] User management (search, filter, bulk actions)
- [ ] Tradesperson management
- [ ] Booking oversight with milestone detail
- [ ] Payment monitoring (escrow balances, payouts)
- [ ] Category/service management
- [ ] Platform settings (fees, timers, email templates)
- [ ] Activity log viewer
- [ ] Export/reports (CSV, PDF)
- [ ] Admin notifications

### Phase 11: Notifications & Email (Weeks 25-26)
**Goal**: Complete notification system

- [ ] Email templates for all events (15+ templates)
- [ ] In-app notifications (real-time via Pusher)
- [ ] Push notifications (Web Push API)
- [ ] Notification preferences (per-event toggles)
- [ ] Email verification flow
- [ ] Password reset flow
- [ ] Unsubscribe links
- [ ] Notification center UI

### Phase 12: SEO & Content (Weeks 27-28)
**Goal**: SEO optimization and content pages

- [ ] Meta tags for all pages
- [ ] JSON-LD structured data (LocalBusiness, Service, Review)
- [ ] Sitemap generation (dynamic)
- [ ] Category landing pages with descriptions
- [ ] City landing pages
- [ ] Blog/guides system (admin-managed)
- [ ] Static pages (About, How it works, FAQ)
- [ ] Legal pages (Privacy, Terms, Cookie policy)

### Phase 13: Polish & Launch Prep (Weeks 29-32)
**Goal**: Production readiness

- [ ] Performance optimization (ISR, image optimization, lazy loading)
- [ ] Mobile responsiveness audit
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Error handling & error pages (404, 500)
- [ ] Loading states and skeleton screens
- [ ] Cookie consent banner (GDPR)
- [ ] Data deletion request flow
- [ ] Rate limiting audit
- [ ] Security audit (OWASP top 10)
- [ ] Load testing
- [ ] Seed production data (real categories for Lithuania)
- [ ] VPS deployment setup (PM2, Nginx, SSL)
- [ ] Monitoring (Sentry, uptime)
- [ ] Backup strategy (PostgreSQL)
- [ ] Soft launch with beta testers

---

## 16. Deployment & Infrastructure

### Production Setup

| Component | Details |
|-----------|---------|
| **VPS** | Ubuntu 24.04 (same provider as VouDigital) |
| **Process** | PM2 — web on port 3000, admin on port 3001 |
| **Reverse proxy** | Nginx — handymanservices.com → :3000, admin.handymanservices.com → :3001 |
| **SSL** | Certbot (Let's Encrypt) |
| **Database** | PostgreSQL 16 on same VPS (separate DB) |
| **Uploads** | Local disk, Nginx `/uploads/` location |
| **Domain** | handymanservices.com (placeholder) |
| **Email** | Resend (or similar EU provider) |
| **Real-time** | Pusher (free tier: 200k msgs/day) |

### Nginx Config (Simplified)

```nginx
# Customer site
server {
    server_name handymanservices.com www.handymanservices.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
    }
    location /uploads/ {
        alias /var/www/meistrai/uploads/;
    }
}

# Admin panel
server {
    server_name admin.handymanservices.com;
    location / {
        proxy_pass http://127.0.0.1:3001;
    }
}
```

---

## Summary

### What Makes This Different from Checkatrade

| Feature | Checkatrade | Handyman Services |
|---------|-------------|-------------|
| Market | UK | Lithuania |
| Payment | Basic (Checkatrade Pay, 1%) | **Milestone escrow** (staged releases) |
| Quotes | Up to 3 matched | Unlimited, customer-initiated |
| Messaging | Basic contact | **Real-time chat** with system messages |
| Business model | Subscription-heavy (£85-216/mo) | Lower subscriptions (€29-99) + transaction fee |
| Verification | Extensive (12 checks) | Lighter but with Rekvizitai.lt integration |
| Language | English only | **Lithuanian + English** |
| Guarantee | £1,000 workmanship guarantee | Milestone escrow = built-in guarantee |
| Architecture | Monolith | **Turborepo monorepo** (web + admin) |

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Monorepo tool | Turborepo | Simpler than Nx, sufficient for 2 apps |
| Package manager | pnpm | Fast, disk-efficient, workspace support |
| Separate API | No (initially) | Both Next.js apps query DB directly |
| Real-time | Pusher | Managed WebSocket, generous free tier |
| Search | PostgreSQL FTS | Good enough to start, avoid premature optimization |
| Maps | Leaflet (OSM) | Free, no API key limits |
| Admin framework | Custom Next.js | Same patterns as web, no new dependency |

### Estimated Timeline

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Foundation | 3 weeks | Week 3 |
| Tradesperson Profiles | 2 weeks | Week 5 |
| Search & Discovery | 2 weeks | Week 7 |
| Quote System | 3 weeks | Week 10 |
| Messaging | 2 weeks | Week 12 |
| Milestone Escrow | 4 weeks | Week 16 |
| Reviews & Trust | 2 weeks | Week 18 |
| Disputes | 2 weeks | Week 20 |
| Subscriptions | 2 weeks | Week 22 |
| Admin Completion | 2 weeks | Week 24 |
| Notifications | 2 weeks | Week 26 |
| SEO & Content | 2 weeks | Week 28 |
| Polish & Launch | 4 weeks | Week 32 |

**Total: ~32 weeks (8 months) for full platform**

MVP (Phases 1-6): ~16 weeks (4 months) — search, quotes, messaging, milestone payments
