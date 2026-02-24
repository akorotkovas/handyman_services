import NextAuth from "next-auth";
import { authConfig } from "@meistrai/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextAuth = NextAuth(authConfig) as any;

export const handlers: { GET: typeof nextAuth.handlers.GET; POST: typeof nextAuth.handlers.POST } = nextAuth.handlers;
export const auth: typeof nextAuth.auth = nextAuth.auth;
export const signIn: typeof nextAuth.signIn = nextAuth.signIn;
export const signOut: typeof nextAuth.signOut = nextAuth.signOut;
