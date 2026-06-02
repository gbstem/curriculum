// Mock next/server to avoid importing real web spec extensions in Node environment
jest.mock('next/server', () => ({
  NextRequest: class {},
  NextResponse: {
    json: (body: any, init?: any) => {
      return {
        status: init?.status || 200,
        json: async () => body,
      };
    },
  },
}));

import { GET, POST, DELETE } from '../app/api/auth/route';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

// Mock iron-session
jest.mock('iron-session', () => ({
  getIronSession: jest.fn(),
}));

describe('Auth API Routes', () => {
  let mockSession: any;

  beforeEach(() => {
    jest.resetAllMocks();

    mockSession = {
      isLoggedIn: false,
      username: '',
      role: 'viewer',
      save: jest.fn(),
      destroy: jest.fn(),
    };

    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn(),
      set: jest.fn(),
    });

    (getIronSession as jest.Mock).mockResolvedValue(mockSession);

    process.env.NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD = 'viewer-password';
    process.env.NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD = 'editor-password';
  });

  describe('GET', () => {
    it('returns default session when not logged in', async () => {
      const response = await GET();
      const data = await response.json();
      expect(data.isLoggedIn).toBe(false);
    });

    it('returns session data when logged in', async () => {
      mockSession.isLoggedIn = true;
      mockSession.username = 'viewer';
      mockSession.role = 'viewer';

      const response = await GET();
      const data = await response.json();
      expect(data.isLoggedIn).toBe(true);
      expect(data.username).toBe('viewer');
      expect(data.role).toBe('viewer');
    });
  });

  describe('POST', () => {
    it('returns 400 for invalid username', async () => {
      const request = {
        json: async () => ({ username: 'invalid', password: 'password' }),
      } as any;

      const response = await POST(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Invalid input');
    });

    it('returns 401 for incorrect viewer password', async () => {
      const request = {
        json: async () => ({ username: 'viewer', password: 'wrong' }),
      } as any;

      const response = await POST(request);
      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBe('Incorrect password');
    });

    it('logs in successfully as viewer and saves session', async () => {
      const request = {
        json: async () => ({ username: 'viewer', password: 'viewer-password' }),
      } as any;

      const response = await POST(request);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.isLoggedIn).toBe(true);
      expect(data.username).toBe('viewer');
      expect(data.role).toBe('viewer');
      expect(mockSession.save).toHaveBeenCalled();
    });

    it('logs in successfully as editor and saves session', async () => {
      const request = {
        json: async () => ({ username: 'editor', password: 'editor-password' }),
      } as any;

      const response = await POST(request);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.isLoggedIn).toBe(true);
      expect(data.username).toBe('editor');
      expect(data.role).toBe('editor');
      expect(mockSession.save).toHaveBeenCalled();
    });
  });

  describe('DELETE', () => {
    it('destroys the session and returns default session', async () => {
      mockSession.isLoggedIn = true;
      mockSession.username = 'editor';
      mockSession.role = 'editor';

      const response = await DELETE();
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.isLoggedIn).toBe(false);
      expect(mockSession.destroy).toHaveBeenCalled();
    });
  });
});
