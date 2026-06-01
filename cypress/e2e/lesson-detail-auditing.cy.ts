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
    cy.contains('.lesson-link', /^Lesson 1:/).then(($btn) => {
      const fullText = $btn.text().trim();
      const expectedTitle = fullText.split('Lesson 1:')[1].trim();

      cy.wrap($btn).click();
      cy.url().should('include', '/cs/scratch1A/lesson/1');

      // Assertions
      cy.get('h1').should('contain', expectedTitle);
      cy.contains('p, div', 'Lesson 1').should('be.visible');
      cy.get('.curriculum-content').should('be.visible').and('not.be.empty');
      cy.get('.alert-danger').should('not.exist');
    });

    // Test Case 4: Verify Version History & Diff Viewer
    cy.contains('button', 'Version History').click();
    cy.get('.modal-dialog').first().should('be.visible');

    // Assert table is visible and has header + at least one historical version (meaning tbody has at least 2 rows)
    cy.get('.modal-dialog').first().find('table').should('be.visible');
    cy.get('.modal-dialog').first().find('tbody tr').should('have.length.at.least', 2);

    // Open Diff Modal for the first historical version (index 1)
    cy.get('.modal-dialog').first().find('tbody tr').eq(1).contains('Diff').click();
    cy.get('.modal-dialog').last().should('be.visible');
    cy.contains('.modal-title', 'Diff:').should('be.visible');

    // Close Diff Modal
    cy.get('.modal-dialog').last().contains('Close').click();
    cy.contains('.modal-title', 'Diff:').should('not.exist');

    // Close Version History Modal
    cy.get('.modal-dialog').first().contains('Close').click();
    cy.get('.modal-dialog').should('not.exist');

    // Test Case 5: Verify Footer Navigation
    cy.get('.lesson-navigation').should('be.visible');

    // Next button
    cy.get('.lesson-navigation').contains('Next').click();
    cy.url().should('include', '/cs/scratch1A/lesson/2');

    // Prev button
    cy.get('.lesson-navigation').contains('Prev').click();
    cy.url().should('include', '/cs/scratch1A/lesson/1');

    // Next again
    cy.get('.lesson-navigation').contains('Next').click();
    cy.url().should('include', '/cs/scratch1A/lesson/2');

    // Curriculum button
    cy.get('.lesson-navigation').contains('Curriculum').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cs/scratch1A');
  });
});
