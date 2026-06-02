// Implements TEST_PLAN.md Section B: Curriculum & Lesson Page Interaction Loop

describe('Curriculum & Lesson Page Interaction Loop (Section B)', () => {
  beforeEach(() => {
    // Use Cypress session storage for authenticated state to keep tests fast and dry
    cy.signedInSession('viewer');
    cy.visit('/');
  });

  const testCurriculumFlow = (
    trackId: string,
    courseId: string,
    courseTitle: string,
    hasLearningPath: boolean
  ) => {
    // 1. Click Explore on Home dashboard
    const exploreBtnText = `Explore ${
      trackId.toUpperCase() === 'CS'
        ? 'CS'
        : trackId.toUpperCase() === 'MATH'
          ? 'Math'
          : trackId.charAt(0).toUpperCase() + trackId.slice(1)
    }`;
    cy.contains(exploreBtnText).click();

    // 2. Verify Track landing page and Track Hero
    cy.url().should('include', `/${trackId}`);
    cy.get('.track-hero').should('be.visible');

    // 3. Verify Learning Path if applicable
    if (hasLearningPath) {
      cy.get('.learning-path').should('be.visible');
      cy.get('.learning-path-step').should('have.length.at.least', 2);
    }

    // 4. Click target class card "Start Teaching" button
    cy.contains('.card', courseTitle).contains('Start Teaching').click();
    cy.url().should('include', `/${trackId}/${courseId}`);

    // 5. Assert class page curriculum header and lesson list
    cy.get('h1').should('contain', `${courseTitle} Curriculum`);
    cy.get('.lesson-link').should('have.length.at.least', 1);

    // 6. Click Lesson 1 link
    cy.contains('.lesson-link', /^Lesson 1:/).click();
    cy.url().should('include', `/${trackId}/${courseId}/lesson/1`);

    // 7. Assert Lesson detail page elements
    cy.get('h1').should('be.visible').and('not.be.empty');
    cy.contains('p, div', 'Lesson 1').should('be.visible');
    cy.get('.curriculum-content').should('be.visible').and('not.be.empty');
    cy.get('.alert-danger').should('not.exist'); // Ensure no error banner

    // 8. Verify Version History & Diff View
    cy.contains('button', 'Version History').click();
    cy.get('.modal-dialog').first().should('be.visible');

    // Assert table has header and at least one version row
    cy.get('.modal-dialog').first().find('table').should('be.visible');
    cy.get('.modal-dialog').first().find('tbody tr').should('have.length.at.least', 1);

    // Verify Diff view if there's a historical version (tr count > 1)
    cy.get('.modal-dialog')
      .first()
      .find('tbody tr')
      .then((rows) => {
        if (rows.length > 1) {
          // Open Diff modal
          cy.get('.modal-dialog').first().find('tbody tr').eq(1).contains('Diff').click();
          cy.get('.modal-dialog').last().should('be.visible');
          cy.contains('.modal-title', 'Diff:').should('be.visible');
          // Close Diff Modal
          cy.get('.modal-dialog').last().contains('Close').click();
        }
      });

    // Close Version History Modal
    cy.get('.modal-dialog').first().contains('Close').click();
    cy.get('.modal-dialog').should('not.exist');

    // 9. Verify Footer Navigation
    // Navigate to Next
    cy.get('.lesson-navigation').contains('Next').click();
    cy.url().should('include', `/${trackId}/${courseId}/lesson/2`);

    // Navigate to Prev
    cy.get('.lesson-navigation').contains('Prev').click();
    cy.url().should('include', `/${trackId}/${courseId}/lesson/1`);

    // Navigate to Next again
    cy.get('.lesson-navigation').contains('Next').click();
    cy.url().should('include', `/${trackId}/${courseId}/lesson/2`);

    // Go back to curriculum page
    cy.get('.lesson-navigation').contains('Curriculum').click();
    cy.url().should('eq', Cypress.config().baseUrl + `/${trackId}/${courseId}`);
  };

  it('navigates loop for Computer Science (CS - Scratch 1A)', () => {
    testCurriculumFlow('cs', 'scratch1A', 'Scratch 1A', true);
  });

  it('navigates loop for Mathematics (Math - Math 1A)', () => {
    testCurriculumFlow('math', 'math1A', 'Math 1A', false);
  });

  it('navigates loop for Science (Science - environmentalA)', () => {
    testCurriculumFlow('science', 'environmentalA', 'Environmental Science A', false);
  });

  it('navigates loop for Engineering (Engineering - engineering1A)', () => {
    testCurriculumFlow('engineering', 'engineering1A', 'Engineering 1A', false);
  });
});
