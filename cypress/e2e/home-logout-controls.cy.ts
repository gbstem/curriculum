// Implements TEST_PLAN.md Section D: Home and Logout Controls

describe('Home and Logout Controls (Section D)', () => {
  beforeEach(() => {
    // Authenticate as a Viewer
    cy.signedInSession('viewer');
  });

  it('navigates back to the home dashboard via the gbSTEM logo and successfully logs out', () => {
    cy.visit('/cs/scratch1A');

    // Test Case 6: Navigation Back to Home Dashboard
    cy.get('.navbar-brand').should('be.visible').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('h1').should('contain', 'Choose a Curriculum Track');

    // Test Case 7: Session Termination (Logout)
    cy.contains('.nav-link, a', 'Logout').click();

    // Assert session is terminated and redirected to login page
    cy.url().should('include', '/login');
    cy.contains('gbSTEM Curriculum Access').should('be.visible');
    cy.get('.navbar').should('not.exist');
  });
});
