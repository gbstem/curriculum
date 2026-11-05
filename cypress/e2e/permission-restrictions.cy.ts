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
    cy.get('[data-testid="editor-access-modal"]').should('be.visible');
    cy.get('[data-testid="editor-access-modal"]').should('contain', 'Curriculum Editor Access');
    cy.get('[data-testid="editor-access-modal"]')
      .find('[data-testid="error-alert"]')
      .should('contain', 'You need to login as an editor to make edits.');
    cy.get('[data-testid="editor-access-modal"]').contains('button', 'Close').click();
    cy.get('[data-testid$="-modal"]').should('not.exist');

    // 2. Visit Lesson 1 page and click Edit Lesson
    cy.contains('[data-testid="lesson-link"]', /^Lesson 1:/).click();
    cy.url().should('include', '/cs/scratch1A/lesson/1');
    cy.contains('button', 'Edit Lesson').click();

    // Verify Access Denied modal
    cy.get('[data-testid="editor-access-modal"]').should('be.visible');
    cy.get('[data-testid="editor-access-modal"]').should('contain', 'Curriculum Editor Access');
    cy.get('[data-testid="editor-access-modal"]')
      .find('[data-testid="error-alert"]')
      .should('contain', 'You need to login as an editor to make edits.');
    cy.get('[data-testid="editor-access-modal"]').contains('button', 'Close').click();
    cy.get('[data-testid$="-modal"]').should('not.exist');

    // 3. Open Version History and attempt Restore
    cy.contains('button', 'Version History').click();
    cy.get('[data-testid="version-history-modal"]').should('be.visible');

    // Click Restore button on the first historical version (index 1)
    cy.get('[data-testid="version-history-modal"]')
      .find('tbody tr')
      .eq(1)
      .contains('Restore')
      .click();

    // Verify Restore Blocked modal
    cy.get('[data-testid="restore-blocked-modal"]').should('be.visible');
    cy.get('[data-testid="restore-blocked-modal"]').should('contain', 'Restore Blocked');
    cy.get('[data-testid="restore-blocked-modal"]').should(
      'contain',
      'You need to login as an editor to make edits.'
    );

    // Close the Restore Blocked modal
    cy.get('[data-testid="restore-blocked-modal"]').contains('Close').click();

    // Close the Version History modal
    cy.get('[data-testid="version-history-modal"]').contains('Close').click();
    cy.get('[data-testid$="-modal"]').should('not.exist');
  });
});
