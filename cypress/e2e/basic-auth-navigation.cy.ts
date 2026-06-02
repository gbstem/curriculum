// Implements TEST_PLAN.md Section A: Authentication and Basic Navigation

describe('Authentication and Basic Navigation (Section A)', () => {
  it('redirects unauthenticated users to the login page', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.contains('gbSTEM Curriculum Access').should('be.visible');
    cy.get('.navbar').should('not.exist');
  });

  it('allows logging in as a Viewer and navigates the home page', () => {
    cy.visit('/login');

    const passwordKey = 'NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD';
    cy.env([passwordKey]).then((passwords) => {
      const password =
        typeof passwords === 'object' && passwords !== null ? passwords[passwordKey] : passwords;

      cy.get('#role-select').select('viewer');
      cy.get('#password-input').type(password);
      cy.get('button[type="submit"]').click();

      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('h1').should('contain', 'Choose a Curriculum Track');

      cy.contains('Explore CS').should('be.visible');
      cy.contains('Explore Math').should('be.visible');
      cy.contains('Explore Engineering').should('be.visible');
      cy.contains('Explore Science').should('be.visible');

      cy.get('.navbar-brand').should('be.visible');
      cy.get('#cs-dropdown').should('be.visible');
      cy.get('#math-dropdown').should('be.visible');
      cy.get('#engineering-dropdown').should('be.visible');
      cy.get('#science-dropdown').should('be.visible');
      cy.contains('.nav-link, a', 'Logout').should('be.visible');
    });
  });

  it('displays an error for incorrect password and allows trying again', () => {
    cy.visit('/login');

    // Try to login with incorrect password
    cy.get('#role-select').select('viewer');
    cy.get('#password-input').type('a');
    cy.get('button[type="submit"]').click();

    // Assert login failed and remains on /login with error message
    cy.url().should('include', '/login');
    cy.contains('Incorrect password').should('be.visible');

    // Try again with correct password
    const passwordKey = 'NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD';
    cy.env([passwordKey]).then((passwords) => {
      const password =
        typeof passwords === 'object' && passwords !== null ? passwords[passwordKey] : passwords;

      cy.get('#password-input').clear().type(password);
      cy.get('button[type="submit"]').click();

      // Assert successful login
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('h1').should('contain', 'Choose a Curriculum Track');
    });
  });

  it('navigates back to home using the gbSTEM logo and logs out', () => {
    cy.signedInSession('viewer');

    cy.visit('/cs');
    cy.url().should('include', '/cs');

    cy.get('.navbar-brand').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('h1').should('contain', 'Choose a Curriculum Track');

    cy.signOutViaUi();
  });
});
