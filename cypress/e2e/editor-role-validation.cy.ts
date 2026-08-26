// Implements TEST_PLAN.md Section E: Editor Role Validation
import { generateDateHash } from '../support/utils';

describe('Editor Role Validation (Section E)', () => {
  it('allows Editor to login and verify reads & diffs on Lesson 1 (Test Case 8)', () => {
    // Nothing in this read-only flow should prompt; capturing lets us assert that.
    cy.captureConfirms().as('confirms');

    // 1. Visit login and authenticate as Editor
    cy.visit('/login');
    const passwordKey = 'NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD';
    cy.env([passwordKey]).then((passwords) => {
      const password =
        typeof passwords === 'object' && passwords !== null ? passwords[passwordKey] : passwords;

      cy.get('#role-select').select('editor');
      cy.get('#password-input').type(password);
      cy.get('button[type="submit"]').click();

      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('h1').should('contain', 'Choose a Curriculum Track');
    });

    // 2. Navigate to CS -> Scratch 1A -> Lesson 1
    cy.contains('Explore CS').click();
    cy.contains('.card', 'Scratch 1A').contains('Start Teaching').click();
    cy.contains('.lesson-link', /^Lesson 1:/).click();
    cy.url().should('include', '/cs/scratch1A/lesson/1');

    // Assert Lesson detail page elements
    cy.get('h1').should('be.visible').and('not.be.empty');
    cy.contains('p, div', 'Lesson 1').should('be.visible');
    cy.get('.curriculum-content').should('be.visible').and('not.be.empty');
    cy.get('.alert-danger').should('not.exist');

    // 3. Open Version History & Diff View
    cy.contains('button', 'Version History').click();
    cy.get('.modal-dialog').first().should('be.visible');

    // Open Diff Modal for the first historical version (index 1)
    cy.get('.modal-dialog').first().find('tbody tr').eq(1).contains('Diff').click();
    cy.get('.modal-dialog').last().should('be.visible');
    cy.contains('.modal-title', 'Diff:').should('be.visible');

    // Close modals
    cy.get('.modal-dialog').last().contains('Close').click();
    cy.get('.modal-dialog').first().contains('Close').click();
    cy.get('.modal-dialog').should('not.exist');

    cy.get('@confirms').should('have.length', 0);
  });

  it('verifies Editor create, edit, restore, and delete loop for Lesson 1000 (Test Case 9)', () => {
    cy.signedInSession('editor');
    cy.deleteLessonIfExists('/cs/scratch1A', '1000');

    // Capture after the cleanup helper so only this test's own prompts are counted.
    // The answer is a function because this test both dismisses and accepts prompts,
    // and a confirm handler can't be swapped out once registered.
    let confirmVal = true;
    cy.captureConfirms(() => confirmVal).as('confirms');

    cy.visit('/cs/scratch1A');

    // Define unique test content using generateDateHash
    const lessonTitle = generateDateHash('Test Lesson 1000');
    const initialContent = generateDateHash('Initial content of Lesson 1000.');
    const updatedContent = generateDateHash('Updated content of Lesson 1000.');
    const cancelledContent = 'Will cancel content of Lesson 1000.';

    // 1. Add New Lesson
    cy.contains('button', 'Add New Lesson').click();
    cy.get('.modal-dialog').first().should('be.visible');

    cy.get('.modal-dialog').first().find('input[type="number"]').type('1000');
    cy.get('.modal-dialog').first().find('input[placeholder="Lesson title"]').type(lessonTitle);
    cy.get('#content-textarea').type(initialContent);
    cy.get('.modal-dialog').first().contains('button', 'Save').click();

    // Verify button exists and click it
    cy.contains('.lesson-link', `Lesson 1000: ${lessonTitle}`).should('be.visible').click();
    cy.url().should('include', '/cs/scratch1A/lesson/1000');
    cy.get('.curriculum-content').should('contain', initialContent);

    // 2. Edit & Cancel edit
    cy.contains('button', 'Edit Lesson').click();
    cy.get('#content-textarea').clear().type(cancelledContent);
    cy.get('.modal-dialog').first().contains('button', 'Cancel').click();
    cy.get('.curriculum-content').should('contain', initialContent);

    // 3. Edit & Save edit
    cy.contains('button', 'Edit Lesson').click();
    cy.get('#content-textarea').clear().type(updatedContent);
    cy.get('.modal-dialog').first().contains('button', 'Save').click();
    cy.get('.curriculum-content').should('contain', updatedContent);

    // 4. Verify Persistence
    cy.get('.lesson-navigation').contains('Curriculum').click();
    cy.contains('.lesson-link', `Lesson 1000: ${lessonTitle}`).click();
    cy.get('.curriculum-content').should('contain', updatedContent);

    // 5. Version History & Cancel Restore
    cy.contains('button', 'Version History').click();
    cy.get('.modal-dialog').first().should('be.visible');
    cy.get('.modal-dialog').first().find('tbody tr').should('have.length.at.least', 2);

    // Diff validation
    cy.get('.modal-dialog').first().find('tbody tr').eq(1).contains('Diff').click();
    cy.get('.modal-dialog').last().should('be.visible');
    cy.get('.modal-dialog').last().contains('Close').click();

    // Trigger Restore but cancel
    cy.then(() => {
      confirmVal = false;
    });
    cy.get('.modal-dialog').first().find('tbody tr').eq(1).contains('Restore').click();
    cy.get('@confirms').should('have.length', 1);
    cy.get('@confirms').its(0).should('contain', 'revert to an older version');
    cy.get('.curriculum-content').should('contain', updatedContent);

    // 6. Confirm Restore
    cy.then(() => {
      confirmVal = true;
    });
    cy.get('.modal-dialog').first().find('tbody tr').eq(1).contains('Restore').click();
    cy.get('@confirms').should('have.length', 2);
    cy.get('@confirms').its(1).should('contain', 'revert to an older version');
    // Modal closes automatically on successful restore reload
    cy.get('.curriculum-content').should('contain', initialContent);

    // 7. Verify Restored Content Persistence
    cy.get('.lesson-navigation').contains('Curriculum').click();
    cy.contains('.lesson-link', `Lesson 1000: ${lessonTitle}`).click();
    cy.get('.curriculum-content').should('contain', initialContent);

    // 8. Edit & Cancel Delete
    cy.contains('button', 'Edit Lesson').click();
    cy.then(() => {
      confirmVal = false;
    });
    cy.get('.modal-dialog').first().contains('button', 'Delete').click();
    cy.get('@confirms').should('have.length', 3);
    cy.get('@confirms').its(2).should('contain', 'delete this lesson');
    cy.get('.modal-dialog').first().contains('button', 'Cancel').click();
    cy.get('.curriculum-content').should('contain', initialContent);

    // 9. Confirm Delete
    cy.contains('button', 'Edit Lesson').click();
    cy.then(() => {
      confirmVal = true;
    });
    cy.get('.modal-dialog').first().contains('button', 'Delete').click();
    cy.get('@confirms').should('have.length', 4);
    cy.get('@confirms').its(3).should('contain', 'delete this lesson');

    // URL redirects to curriculum listing page
    cy.url().should('eq', Cypress.config().baseUrl + '/cs/scratch1A');
    cy.contains('.lesson-link', `Lesson 1000: ${lessonTitle}`).should('not.exist');
  });

  it('verifies real-time preview and toolbar formatting helpers (Test Case 13)', () => {
    cy.signedInSession('editor');
    cy.captureConfirms().as('confirms');
    cy.visit('/cs/scratch1A');

    // 1. Open Editor Modal
    cy.contains('button', 'Add New Lesson').click();
    cy.get('.modal-dialog').first().should('be.visible');

    // Assert split preview pane layout
    cy.get('.editor-col').should('be.visible');
    cy.get('.preview-col').should('be.visible');

    // 2. Bold helper formatting test
    cy.get('#content-textarea').type('bold');
    cy.get('#content-textarea').then(($el) => {
      const el = $el[0] as HTMLTextAreaElement;
      el.setSelectionRange(0, 4); // select "bold"
    });
    cy.get('button[data-name="bold"], button[title="Bold"]').first().click();
    cy.get('#content-textarea').should('have.value', '**bold**');
    cy.get('.preview-col').find('strong').should('contain', 'bold');

    // 3. Italic helper formatting test
    cy.get('#content-textarea').clear().type('italic');
    cy.get('#content-textarea').then(($el) => {
      const el = $el[0] as HTMLTextAreaElement;
      el.setSelectionRange(0, 6); // select "italic"
    });
    cy.get('button[data-name="italic"], button[title="Italic"]').first().click();
    cy.get('#content-textarea').should('have.value', '*italic*');
    cy.get('.preview-col').find('em').should('contain', 'italic');

    // 4. List helper formatting tests
    cy.get('#content-textarea').clear();
    cy.get('button[data-name="unordered-list"], button[title="Bullet List"]').first().click();
    cy.get('#content-textarea').type('{rightArrow}Item 1\n');
    cy.get('button[data-name="ordered-list"], button[title="Numbered List"]').first().click();
    cy.get('#content-textarea').type('{rightArrow}Item 2');

    cy.get('#content-textarea').should('contain', '- Item 1').and('contain', '1. Item 2');

    // Verify live preview of list formatting
    cy.get('.preview-col').find('ul li').should('contain', 'Item 1');
    cy.get('.preview-col').find('ol li').should('contain', 'Item 2');

    // 5. Code Block insertion helper
    cy.get('button[title="Insert Code Block"]').click();
    cy.get('.modal-dialog').last().should('be.visible');
    cy.get('.modal-dialog').last().find('select').select('python');
    cy.get('.modal-dialog').last().find('textarea').type('print("Hello from code helper!")');
    cy.get('.modal-dialog').last().contains('button', 'Insert Code Block').click();

    // Verify insertion into textarea in addition to the text above
    cy.get('#content-textarea').should(
      'contain',
      '```python\nprint("Hello from code helper!")\n```'
    );

    // Verify live preview updates in real-time
    cy.get('.preview-col').contains('Hello from code helper!').should('be.visible');

    // 6. Cancel to discard changes
    cy.get('.modal-dialog').first().contains('button', 'Cancel').click();
    cy.get('.modal-dialog').should('not.exist');

    cy.get('@confirms').should('have.length', 0);
  });

  it('discards unsaved edits when closing the modal and reopening (Test Case 13b)', () => {
    cy.signedInSession('editor');
    cy.captureConfirms().as('confirms');
    cy.visit('/cs/scratch1A/lesson/1');

    // Open editor and type unsaved draft content
    cy.contains('button', 'Edit Lesson').click();
    cy.get('#content-textarea').type('\n\n[Unsaved Draft Content]');
    cy.contains('.modal-dialog button', 'Cancel').click();

    // Reopen editor and verify unsaved draft content was discarded
    cy.contains('button', 'Edit Lesson').click();
    cy.get('#content-textarea').should('not.contain', '[Unsaved Draft Content]');
    cy.contains('.modal-dialog button', 'Cancel').click();

    cy.get('@confirms').should('have.length', 0);
  });

  it('verifies draggable center divider resizes columns (Test Case 13c)', () => {
    cy.signedInSession('editor');
    cy.captureConfirms().as('confirms');
    cy.visit('/cs/scratch1A');

    cy.contains('button', 'Add New Lesson').click();
    cy.get('.w-md-editor-drag-divider', { timeout: 10000 }).should('be.visible');

    // Simulate drag action on the splitter
    cy.get('.w-md-editor-drag-divider')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 300, clientY: 300 })
      .trigger('mouseup', { force: true });

    // Verify custom split variable was applied
    cy.get('.w-md-editor-content').should('have.attr', 'style').and('include', '--split-percent');

    cy.contains('.modal-dialog button', 'Cancel').click();

    cy.get('@confirms').should('have.length', 0);
  });

  it('uses almost-fullscreen layout for editor dialog (Test Case 13d)', () => {
    cy.signedInSession('editor');
    cy.captureConfirms().as('confirms');
    cy.visit('/cs/scratch1A');

    cy.contains('button', 'Add New Lesson').click();
    cy.get('.modal-dialog').first().should('have.class', 'modal-almost-fullscreen');

    cy.contains('.modal-dialog button', 'Cancel').click();

    cy.get('@confirms').should('have.length', 0);
  });
});
