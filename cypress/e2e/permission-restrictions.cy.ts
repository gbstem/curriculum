// Implements TEST_PLAN.md Section F: Permission and Mutation Restrictions

describe('Permission and Mutation Restrictions (Section F)', () => {
  beforeEach(() => {
    // Authenticate as a Viewer
    cy.signedInSession('viewer');
  });

  it('restricts Viewer role from performing writes, edits, and restores (Test Case 10)', () => {
    // 1. Visit class page and click Add New Lesson
    cy.visit('/cs/scratch1A');
    cy.contains('button', 'Add New Lesson').click();

    // Verify Access Denied modal
    cy.get('.modal-dialog').first().should('be.visible');
    cy.contains('.modal-title', 'Curriculum Editor Access').should('be.visible');
    cy.get('.modal-dialog')
      .first()
      .find('.alert-danger')
      .should('contain', 'You need to login as an editor to make edits.');
    cy.get('.modal-dialog').first().contains('button', 'Close').click();
    cy.get('.modal-dialog').should('not.exist');

    // 2. Visit Lesson 1 page and click Edit Lesson
    cy.contains('.lesson-link', /^Lesson 1:/).click();
    cy.url().should('include', '/cs/scratch1A/lesson/1');
    cy.contains('button', 'Edit Lesson').click();

    // Verify Access Denied modal
    cy.get('.modal-dialog').first().should('be.visible');
    cy.contains('.modal-title', 'Curriculum Editor Access').should('be.visible');
    cy.get('.modal-dialog')
      .first()
      .find('.alert-danger')
      .should('contain', 'You need to login as an editor to make edits.');
    cy.get('.modal-dialog').first().contains('button', 'Close').click();
    cy.get('.modal-dialog').should('not.exist');

    // 3. Open Version History and attempt Restore
    cy.contains('button', 'Version History').click();
    cy.get('.modal-dialog').first().should('be.visible');

    // Click Restore button on the first historical version (index 1)
    cy.get('.modal-dialog').first().find('tbody tr').eq(1).contains('Restore').click();

    // Verify Restore Blocked modal
    cy.get('.modal-dialog').last().should('be.visible');
    cy.contains('.modal-title', 'Restore Blocked').should('be.visible');
    cy.get('.modal-dialog')
      .last()
      .should('contain', 'You need to login as an editor to make edits.');

    // Close the Restore Blocked modal
    cy.get('.modal-dialog').last().contains('Close').click();

    // Close the Version History modal
    cy.get('.modal-dialog').first().contains('Close').click();
    cy.get('.modal-dialog').should('not.exist');
  });
});
