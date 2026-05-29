import { fixupPluginRules } from '@eslint/compat';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
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
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prefer-const': 'warn',
      '@next/next/no-img-element': 'off',
    },
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
