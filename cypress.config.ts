/// <reference types="node" />
import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'cypress';
import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter';

const { combinedEnv } = loadEnvConfig(process.cwd());

export default defineConfig({
  // Public, non-sensitive configuration values
  expose: {
    FIRESTORE_EMULATOR_HOST: combinedEnv.FIRESTORE_EMULATOR_HOST,
  },
  // Sensitive values like API keys, passwords, tokens, or credentials
  env: {
    NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD: combinedEnv.NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD,
    NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD: combinedEnv.NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    // Don't allow using the deprecated, insecure Cypress environment setup.
    allowCypressEnv: false,
    setupNodeEvents(on, config) {
      installLogsPrinter(on, {
        printLogsToConsole: 'never',
        printLogsToFile: 'always',
        includeSuccessfulHookLogs: false,
        outputRoot: config.projectRoot + '/cypress/logs/',
        outputTarget: {
          'out.json': 'json',
        },
      });
      on('task', {
        log(message) {
          console.log(message); // Print to the terminal
          return null;
        },
      });
      return config;
    },
  },
});
