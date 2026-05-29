import '@testing-library/jest-dom';

// Store mocks on global to ensure they are always accessible to jest.mock factory closures
const mockCookieStoreMap = new Map<string, { value: string }>();

const mockCookieStore: any = {
  get: jest.fn((key: string) => mockCookieStoreMap.get(key)),
  set: jest.fn((key: string, value: string, _options?: any) => {
    mockCookieStoreMap.set(key, { value });
    return mockCookieStore;
  }),
  delete: jest.fn((key: string) => {
    mockCookieStoreMap.delete(key);
    return mockCookieStore;
  }),
  clear: () => mockCookieStoreMap.clear(),
};

export const mockCollection = jest.fn();

export const mockAdminDb = {
  collection: mockCollection,
};

// Assign to global
(global as any).mockCookieStore = mockCookieStore;
(global as any).mockCookieStoreMap = mockCookieStoreMap;
(global as any).mockCollection = mockCollection;
(global as any).mockAdminDb = mockAdminDb;

// Global mock for firebase-admin and its firestore components
jest.mock('firebase-admin', () => {
  const adminNamespace = {
    initializeApp: jest.fn(),
    apps: [] as any[],
    credential: {
      cert: jest.fn(),
    },
    firestore: jest.fn(() => (global as any).mockAdminDb),
  };
  (adminNamespace.firestore as any).FieldValue = {
    serverTimestamp: jest.fn(() => 'mock-server-timestamp'),
  };
  return adminNamespace;
});

// Mock firebase-admin/firestore to avoid import resolution issues in tests
jest.mock('firebase-admin/firestore', () => ({}));

// Global mock for firebase/app
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

// Global mock for firebase/firestore
jest.mock('firebase/firestore', () => {
  class MockTimestamp {
    constructor(
      public seconds: number,
      public nanoseconds: number
    ) {}
    static now() {
      return new MockTimestamp(Date.now() / 1000, 0);
    }
    toDate() {
      return new Date(this.seconds * 1000);
    }
  }
  return {
    getFirestore: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    getDocs: jest.fn(),
    getDoc: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    Timestamp: MockTimestamp,
  };
});

// Silence console methods during test runs to ensure clean test output
beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
