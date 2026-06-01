// Add all new commands to index.d.ts as well.

Cypress.Commands.add('signedInSession', (role: string) => {
  cy.session(`signedIn-${role}`, () => {
    cy.visit('/login');
    const passwordKey =
      role === 'editor'
        ? 'NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD'
        : 'NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD';

    cy.env([passwordKey]).then((passwords) => {
      // Handle when cy.env resolves directly to the value or an object
      const password =
        typeof passwords === 'object' && passwords !== null ? passwords[passwordKey] : passwords;
      if (!password) {
        throw new Error(`Password not found for key: ${passwordKey}`);
      }

      cy.get('#role-select').select(role);
      cy.get('#password-input').type(password);
      cy.get('button[type="submit"]').click();

      // Ensure we see some expected header element that confirms we're signed in
      cy.url().should('not.include', '/login');
      cy.get('h1').should('contain', 'Choose a Curriculum Track');
    });
  });
});

Cypress.Commands.add('signOutViaUi', () => {
  cy.contains('.nav-link, a', 'Logout').click();
  cy.url().should('include', '/login');
  cy.get('#role-select').should('be.visible');
});

Cypress.Commands.add('deleteLessonIfExists', (coursePath: string, lessonNumber: string) => {
  cy.on('window:confirm', () => true);

  const checkAndDelete = () => {
    cy.visit(coursePath);
    cy.get('[role="status"]').should('not.exist');
    cy.get('body').then(($body) => {
      if ($body.find(`.lesson-link:contains("Lesson ${lessonNumber}:")`).length > 0) {
        cy.contains('.lesson-link', `Lesson ${lessonNumber}:`).first().click();
        cy.contains('button', 'Edit Lesson').click();
        cy.get('.modal-dialog').first().should('be.visible');
        cy.get('.modal-dialog').first().contains('button', 'Delete').click();
        cy.url().should('eq', Cypress.config().baseUrl + coursePath);
        checkAndDelete();
      }
    });
  };

  checkAndDelete();
});
