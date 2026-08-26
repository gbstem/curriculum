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

/**
 * Records every `window.confirm` raised for the rest of the test and answers
 * them with `answer` (default: accept). Yields the recording array, so the
 * idiomatic use is to alias it:
 *
 * ```ts
 * cy.captureConfirms().as('confirms');
 * // ...do the thing...
 * cy.get('@confirms').should('have.length', 1);
 * cy.get('@confirms').its(0).should('contain', 'delete this lesson');
 * ```
 *
 * Prefer this over a bare `cy.on('window:confirm', () => true)`. Cypress
 * accepts confirms automatically, so that form asserts nothing: a prompt that
 * should never have appeared is accepted in silence and looks exactly like
 * correct behaviour, and a prompt whose wording has drifted still passes.
 * Capturing the text is what makes "no prompt appeared" and "this prompt
 * appeared" both assertable.
 *
 * Pass a function when a single test has to accept some prompts and dismiss
 * others (e.g. cancel-then-confirm loops) — it is re-evaluated per prompt, so
 * flipping a local `let` inside `cy.then()` steers the next answer. A handler
 * cannot be unregistered mid-test, and any handler returning `false` cancels
 * the confirm, so a second `cy.captureConfirms(false)` would not work here.
 *
 * The array is mutated in place, so `cy.get('@confirms')` re-yields live state
 * and Cypress retries length assertions against it.
 */
Cypress.Commands.add('captureConfirms', (answer: boolean | (() => boolean) = true) => {
  const seen: string[] = [];
  cy.on('window:confirm', (text: string) => {
    seen.push(text);
    return typeof answer === 'function' ? answer() : answer;
  });
  return cy.wrap(seen, { log: false });
});
