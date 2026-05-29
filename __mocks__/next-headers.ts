console.log('--- __mocks__/next-headers.ts EVALUATED ---');

const mockCookieStoreMap = new Map<string, { value: string }>();

const mockCookieStore: any = {
  get: (key: string) => {
    const map = (global as any).mockCookieStoreMap || mockCookieStoreMap;
    return map.get(key);
  },
  set: jest.fn((key: string, value: string) => {
    const map = (global as any).mockCookieStoreMap || mockCookieStoreMap;
    map.set(key, { value });
    return mockCookieStore;
  }),
  delete: jest.fn((key: string) => {
    const map = (global as any).mockCookieStoreMap || mockCookieStoreMap;
    map.delete(key);
    return mockCookieStore;
  }),
};

// Ensure they are attached to global for tests to access/clear
(global as any).mockCookieStoreMap = (global as any).mockCookieStoreMap || mockCookieStoreMap;
(global as any).mockCookieStore = (global as any).mockCookieStore || mockCookieStore;

export const cookies = jest.fn(() => {
  console.log(
    '--- __mocks__/next-headers.ts cookies() called, returning:',
    (global as any).mockCookieStore
  );
  return Promise.resolve((global as any).mockCookieStore);
});
