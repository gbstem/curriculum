import { defineConfig } from 'cypress';
import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
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
