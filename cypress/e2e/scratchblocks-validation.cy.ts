// Implements TEST_PLAN.md Section H: Scratchblocks React Integration Validation
import { generateDateHash } from '../support/utils';

describe('Scratchblocks React Integration Validation (Section H)', () => {
  let confirmVal = true;

  beforeEach(() => {
    confirmVal = true;
    cy.on('window:confirm', () => {
      return confirmVal;
    });
  });

  it('renders Scratch blocks graphically and cleans up by deleting Lesson 2001 (Test Case 12)', () => {
    cy.signedInSession('editor');
    cy.deleteLessonIfExists('/cs/scratch1A', '2001');
    cy.visit('/cs/scratch1A');

    const lessonTitle = generateDateHash('Scratch Blocks Integration Test');
    const scratchHash = generateDateHash('scratch-hash');
    const scratchBlocksText = `
This is an integration test for Scratch blocks.

\`\`\`scratch
// Hash: ${scratchHash}
when green flag clicked
forever
  move (10) steps
  if on edge, bounce
end
\`\`\`
`;

    // 1. Add New Lesson
    cy.contains('button', 'Add New Lesson').click();
    cy.get('.modal-dialog').first().should('be.visible');

    cy.get('.modal-dialog').first().find('input[type="number"]').type('2001');
    cy.get('.modal-dialog').first().find('input[placeholder="Lesson title"]').type(lessonTitle);
    cy.get('#content-textarea').type(scratchBlocksText);
    cy.get('.modal-dialog').first().contains('button', 'Save').click();

    // 2. Click the Lesson 2001 link from the list
    cy.contains('.lesson-link', `Lesson 2001: ${lessonTitle}`).should('be.visible').click();
    cy.url().should('include', '/cs/scratch1A/lesson/2001');

    // 3. Assertions on Scratchblocks rendering
    // Verify that Scratchblocks renders as an SVG element containing block text
    cy.get('.curriculum-content').find('svg').should('be.visible');
    cy.get('.curriculum-content').find('svg').should('contain', 'when');
    cy.get('.curriculum-content').find('svg').should('contain', 'forever');
    cy.get('.curriculum-content').find('svg').should('contain', 'move');
    cy.get('.curriculum-content').find('svg').should('contain', 'steps');
    cy.get('.curriculum-content').find('svg').should('contain', 'if');
    cy.get('.curriculum-content').find('svg').should('contain', 'on');
    cy.get('.curriculum-content').find('svg').should('contain', 'edge,');
    cy.get('.curriculum-content').find('svg').should('contain', 'bounce');

    // 4. Cleanup: Delete Lesson 2001
    cy.contains('button', 'Edit Lesson').click();
    cy.get('.modal-dialog').first().should('be.visible');

    cy.then(() => {
      confirmVal = true;
    });
    cy.get('.modal-dialog').first().contains('button', 'Delete').click();

    // Verify redirection and removal
    cy.url().should('eq', Cypress.config().baseUrl + '/cs/scratch1A');
    cy.contains('.lesson-link', `Lesson 2001: ${lessonTitle}`).should('not.exist');
  });
});
