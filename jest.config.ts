/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/headers$': '<rootDir>/__mocks__/next-headers.ts',
  },
  testPathIgnorePatterns: ['/node_modules/', '/scripts/'],
  collectCoverage: false,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

const transformIgnorePatterns = [
  'node_modules/(?!(react-markdown|remark-.*|rehype-.*|mdast-.*|micromark.*|unist-.*|hast-util-.*|hastscript|unified|bail|trough|vfile.*|is-plain-obj|property-information|space-separated-tokens|comma-separated-tokens|decode-named-character-reference|character-entities.*|html-void-elements|zwitch|longest-streak|ccount|escape-string-regexp|markdown-table|trim-lines|devlop|estree-util-.*|html-url-attributes|web-namespaces)/)',
];

const asyncJestConfig = async () => {
  const fn = createJestConfig(config);
  const res = await fn();
  return {
    ...res,
    transformIgnorePatterns,
  };
};

export default asyncJestConfig;
