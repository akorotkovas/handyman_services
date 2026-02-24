import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

// Lazy proxy — avoids instantiation at build time
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Platform fee percentage (from env or default 7%)
export const PLATFORM_FEE_RATE = parseFloat(
  process.env.STRIPE_PLATFORM_FEE_PERCENT ?? "7"
) / 100;

export function calculatePlatformFee(amount: number): number {
  return Math.round(amount * PLATFORM_FEE_RATE * 100) / 100;
}

export function calculateProviderAmount(amount: number): number {
  return Math.round((amount - calculatePlatformFee(amount)) * 100) / 100;
}
