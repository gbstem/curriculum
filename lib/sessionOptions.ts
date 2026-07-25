import { SessionOptions } from 'iron-session';

// Server-only: reads a secret from process.env, so this must never be
// imported from client code. lib/session.ts holds the SessionData type and
// defaultSession constant that lib/useSession.tsx (a client hook) needs,
// specifically so client bundles never pull in this file and its
// env-var-dependent throw below.
const sessionPassword = process.env.NEXT_CURRICULUM_SESSION_PASSWORD;

if (!sessionPassword) {
  // Fail fast rather than silently falling back to a hardcoded secret baked
  // into the source tree, which would let anyone who has read this
  // (public/open-source) repo forge a valid session cookie.
  throw new Error(
    'NEXT_CURRICULUM_SESSION_PASSWORD environment variable must be set (at least 32 ' +
      'characters). See .env.example for details.'
  );
}

export const sessionOptions: SessionOptions = {
  password: sessionPassword,
  cookieName: 'gbstem_session',
  ttl: 60 * 60 * 24 * 7, // 7 days
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
};
