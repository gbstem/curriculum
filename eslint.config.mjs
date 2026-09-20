import { fixupPluginRules } from '@eslint/compat';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import cypress from 'eslint-plugin-cypress';
import tailwindcss from 'eslint-plugin-tailwindcss';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import { defineConfig, globalIgnores } from 'eslint/config';

// Fix plugins that are incompatible with ESLint v10
const fixedNextVitals = nextVitals.map((config) => {
  if (config.plugins && config.plugins.react) {
    return {
      ...config,
      plugins: {
        ...config.plugins,
        react: fixupPluginRules(config.plugins.react),
      },
    };
  }
  return config;
});

const eslintConfig = defineConfig([
  ...fixedNextVitals,
  ...nextTs,
  eslintPluginPrettierRecommended,
  tailwindcss.configs.recommended,
  {
    settings: {
      tailwindcss: {
        cssConfigPath: './app/globals.css',
      },
    },
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'prefer-const': 'warn',
      '@next/next/no-img-element': 'off',
      // prettier-plugin-tailwindcss already sorts classnames on format; a lint
      // rule for the same thing just fights the formatter over ordering it
      // doesn't actually control.
      'tailwindcss/classnames-order': 'off',
      // Bootstrap and react-bootstrap classnames (d-flex, fw-semibold, ...)
      // are used alongside Tailwind throughout this codebase, and the rule
      // can't tell those from an actual typo'd Tailwind class.
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  // Scoped to the Cypress tree on purpose: the plugin's own `recommended` config
  // ships no `files` key, so spreading it unscoped would apply the Cypress rules
  // to app code and leak ~1200 browser globals into every file.
  {
    ...cypress.configs.recommended,
    files: ['cypress/**/*.ts'],
    rules: {
      ...cypress.configs.recommended.rules,
      'cypress/no-debug': 'error',
      'cypress/no-pause': 'error',
    },
  },
  // Scoped to __tests__ for the same reason as the Cypress block above: both
  // configs' rules assume their respective globals/APIs are in scope, which
  // is only true under this tree.
  {
    ...jest.configs['flat/recommended'],
    files: ['__tests__/**/*.ts', '__tests__/**/*.tsx'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      // The rule only recognizes literal `expect(...)` calls, so it can't see
      // into this codebase's local assertion helpers.
      'jest/expect-expect': ['warn', { assertFunctionNames: ['expect', 'expect*', 'assert*'] }],
    },
  },
  {
    ...testingLibrary.configs['flat/react'],
    files: ['__tests__/**/*.ts', '__tests__/**/*.tsx'],
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
