# Handyman Services — Claude Code Rules

## Project Overview
Lithuanian trades & home services marketplace (Checkatrade-style) with milestone escrow, messaging, and quote system.

## Architecture
- **Monorepo**: Turborepo + pnpm workspaces
- **Apps**: `apps/web` (customer site), `apps/admin` (admin panel)
- **Packages**: `packages/db`, `packages/auth`, `packages/types`, `packages/services`, `packages/ui`, `packages/config`

## Tech Stack
- Next.js 15 (App Router, React 19, TypeScript strict)
- Prisma 6+ (PrismaPg adapter, PostgreSQL 16)
- NextAuth v5 (Credentials + Google, database sessions)
- Stripe Connect (milestone escrow, manual capture)
- Tailwind v4 (@tailwindcss/postcss)
- Zod (runtime validation)
- next-intl (Lithuanian default + English)
- Pusher (real-time messaging)
- Resend (transactional email)
- Leaflet (maps, OSM tiles)
- sharp (image optimization → WebP)
- Lucide React (icons)

## Conventions

### File Naming
- Files: kebab-case (`tradesperson-profile.tsx`)
- Components: PascalCase (`TradespersonProfile`)
- Server actions: camelCase verbs (`createBooking`, `submitMilestone`)
- Zod schemas: camelCase + "Schema" (`createQuoteSchema`)
- Types: PascalCase (`QuoteRequest`, `MilestoneStatus`)

### Component Patterns
- **Default**: Server Components (no "use client" unless needed)
- **Client**: Only when using hooks, state, or browser APIs
- **Server Actions**: All mutations go through `packages/services` or app-level `lib/actions/`
- **ActionResult**: `{ success: boolean; error?: string; data?: T }`

### Database
- Schema lives in `packages/db/prisma/schema.prisma`
- Use `prisma.$transaction()` for multi-step operations
- Add composite indexes for common query patterns
- Use `@default(cuid())` for all IDs

### Validation
- Zod schemas in `packages/types/src/`
- `.safeParse()` at the start of every server action
- Return human-readable error messages

### Auth
- NextAuth v5 with database sessions
- Auth config in `packages/auth/`
- Role-based middleware in each app
- `requireAuth()` helper for server actions

### Payments
- Stripe Connect Express for tradespeople
- PaymentIntent with `capture_method: "manual"` for escrow
- Platform fee: 7% on milestone payments
- Capture on milestone approval → Transfer to connected account

### i18n
- Lithuanian (`lt`) is default locale
- English (`en`) secondary
- All UI strings in `messages/*.json`
- Use `getTranslations` (server) / `useTranslations` (client)
- Admin panel: Lithuanian or English (configurable)

### Styling
- Tailwind v4 utilities only (no inline styles)
- Design tokens as CSS custom properties
- Mobile-first responsive design
- Max content width: 1200px

### Security
- Rate limit auth endpoints (5/15min)
- Rate limit messaging (30/min)
- Sanitize all user-generated content
- Never expose raw Prisma errors to clients
- Validate file uploads (type, size)
- GDPR: cookie consent, data deletion, privacy policy

## Key Patterns (Reference PawSpace)
- Server Components first
- Server Actions for mutations with Zod validation
- Prisma transactions for atomicity
- ActionResult pattern for consistent error handling
- Domain-organized server actions (`lib/actions/booking.ts`, `lib/actions/quote.ts`)
- Query files for read operations (`lib/queries/`)
- Email templates as HTML string functions
- Rate limiting with in-memory store

## Do NOT
- Use `any` type — use `unknown` and narrow
- Skip Zod validation on server actions
- Expose database errors to clients
- Use `dangerouslySetInnerHTML` without sanitization
- Store secrets in code — use environment variables
- Add packages without checking if existing tools suffice
- Create separate API routes when Server Actions work
- Use client-side data fetching when Server Components can
