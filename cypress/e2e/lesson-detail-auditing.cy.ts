// Implements TEST_PLAN.md Section C: Detailed Lesson & Version History Auditing

describe('Detailed Lesson & Version History Auditing (Section C)', () => {
  beforeEach(() => {
    // Authenticate as a Viewer
    cy.signedInSession('viewer');
  });

  it('verifies lesson content rendering, version history table, diff viewer overlay, and prev/next curriculum footer navigation', () => {
    cy.visit('/cs/scratch1A');

    // Test Case 3: Verify Lesson Content
    // Get the title of Lesson 1 from its button to assert against the page heading
    cy.contains('[data-testid="lesson-link"]', /^Lesson 1:/).then(($btn) => {
      const fullText = $btn.text().trim();
      const expectedTitle = fullText.split('Lesson 1:')[1].trim();

      cy.wrap($btn).click();
      cy.url().should('include', '/cs/scratch1A/lesson/1');

      // Assertions
      cy.get('h1').should('contain', expectedTitle);
      cy.contains('p, div', 'Lesson 1').should('be.visible');
      cy.get('[data-testid="lesson-content"]').should('be.visible').and('not.be.empty');
      cy.get('[data-testid="error-alert"]').should('not.exist');
    });

    // Test Case 4: Verify Version History & Diff Viewer
    cy.contains('button', 'Version History').click();
    cy.get('[data-testid="version-history-modal"]').should('be.visible');

    // Assert table is visible and has header + at least one historical version (meaning tbody has at least 2 rows)
    cy.get('[data-testid="version-history-modal"]').find('table').should('be.visible');
    cy.get('[data-testid="version-history-modal"]')
      .find('tbody tr')
      .should('have.length.at.least', 2);

    // Open Diff Modal for the first historical version (index 1)
    cy.get('[data-testid="version-history-modal"]').find('tbody tr').eq(1).contains('Diff').click();
    cy.get('[data-testid="diff-modal"]').should('be.visible');
    cy.get('[data-testid="diff-modal"]').should('contain', 'Diff:');

    // Close Diff Modal
    cy.get('[data-testid="diff-modal"]').contains('Close').click();
    cy.get('[data-testid="diff-modal"]').should('not.exist');

    // Close Version History Modal
    cy.get('[data-testid="version-history-modal"]').contains('Close').click();
    cy.get('[data-testid$="-modal"]').should('not.exist');

    // Test Case 5: Verify Footer Navigation
    cy.get('[data-testid="lesson-navigation"]').should('be.visible');

    // Next button
    cy.get('[data-testid="lesson-navigation"]').contains('Next').click();
    cy.url().should('include', '/cs/scratch1A/lesson/2');

    // Prev button
    cy.get('[data-testid="lesson-navigation"]').contains('Prev').click();
    cy.url().should('include', '/cs/scratch1A/lesson/1');

    // Next again
    cy.get('[data-testid="lesson-navigation"]').contains('Next').click();
    cy.url().should('include', '/cs/scratch1A/lesson/2');

    // Curriculum button
    cy.get('[data-testid="lesson-navigation"]').contains('Curriculum').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cs/scratch1A');
  });
});
