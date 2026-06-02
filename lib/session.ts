import { SessionOptions } from 'iron-session';

export interface SessionData {
  username: string;
  role: 'viewer' | 'editor';
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: '',
  role: 'viewer',
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password:
    process.env.NEXT_CURRICULUM_SESSION_PASSWORD ||
    'complex_password_at_least_32_characters_long_for_gbstem',
  cookieName: 'gbstem_session',
  ttl: 60 * 60 * 24 * 7, // 7 days
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
};
