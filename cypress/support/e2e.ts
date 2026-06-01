// Import commands.js using ES2015 syntax:
import './commands';

import installLogsCollector from 'cypress-terminal-report/src/installLogsCollector';
installLogsCollector();

beforeEach(() => {
  // Ensure we're testing against an emulator, not the live site.
  const firestoreHost = Cypress.expose('FIRESTORE_EMULATOR_HOST');
  if (!firestoreHost) {
    throw new Error(
      'Cypress tests use an emulator, but FIRESTORE_EMULATOR_HOST is not defined in your environment'
    );
  }
});
