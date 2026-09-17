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

describe('Editor Modal Mobile Responsive Layout (Section E, mobile)', () => {
  // iPhone 12 Pro logical viewport - comfortably below the 768px breakpoint
  // where curriculum.css switches the editor/preview split from side-by-side
  // columns to a stacked, scrolling layout.
  beforeEach(() => {
    cy.viewport(390, 844);
  });

  it('stacks the preview below the editor without overlapping the footer buttons (Test Case 13e)', () => {
    cy.signedInSession('editor');
    cy.captureConfirms().as('confirms');
    cy.visit('/cs/scratch1A');

    cy.contains('button', 'Add New Lesson').click();
    cy.get('.modal-dialog').first().should('have.class', 'modal-almost-fullscreen');
    cy.get('.w-md-editor-drag-divider', { timeout: 10000 }).should('be.visible');

    // Real content is essential here: with an empty lesson the stacked
    // fields + editor + preview are short enough to fit within a single
    // 100dvh box even with the containment bug below, so the regression
    // never shows up. Typing enough content to push the form past one
    // screen's height is what actually exercises it.
    cy.get('#content-textarea').type(
      '# Heading\n\nSome sample paragraph content to fill the preview pane with real text so it is not empty.\n\n- item one\n- item two\n- item three'
    );

    // Editor, divider, and preview must stack top-to-bottom in that order,
    // and the preview must end before the footer's buttons begin. This is
    // the regression: the library positions the preview pane absolutely
    // (top/right/bottom: 0) for the desktop side-by-side layout, which, left
    // unset for the stacked mobile layout, has it float over the editor and
    // spill down over the Save/Cancel/Delete buttons.
    cy.get('.w-md-editor-area').then(($area) => {
      const areaRect = $area[0].getBoundingClientRect();

      cy.get('.w-md-editor-drag-divider').then(($divider) => {
        const dividerRect = $divider[0].getBoundingClientRect();
        expect(dividerRect.top, 'divider starts at/after the editor ends').to.be.at.least(
          areaRect.bottom - 1
        );

        cy.get('.w-md-editor-preview').then(($preview) => {
          const previewRect = $preview[0].getBoundingClientRect();
          expect(previewRect.top, 'preview starts at/after the divider ends').to.be.at.least(
            dividerRect.bottom - 1
          );

          cy.contains('.modal-dialog button', 'Cancel').then(($cancel) => {
            const cancelRect = $cancel[0].getBoundingClientRect();
            expect(
              previewRect.bottom,
              'preview ends before the footer buttons begin'
            ).to.be.at.most(cancelRect.top + 1);
          });
        });
      });
    });

    // The white dialog card itself must grow to contain the whole stacked
    // layout, footer included, rather than clipping at a fixed viewport
    // height with the overflow spilling onto the backdrop behind it. That
    // was the actual regression: the desktop rule sets modal-content's
    // `height` (not just `max-height`) to 96vh, and a mobile override that
    // only raised `min-height` couldn't grow the box past that - it can
    // only ever raise the floor, not override an explicit, smaller height.
    cy.get('.modal-footer').then(($footer) => {
      const footerRect = $footer[0].getBoundingClientRect();
      cy.get('.modal-content').then(($content) => {
        const contentRect = $content[0].getBoundingClientRect();
        expect(
          contentRect.bottom,
          'the dialog card contains the footer, not just the viewport'
        ).to.be.at.least(footerRect.bottom - 1);
      });
    });

    // Scrolling the dialog itself (not the page behind it, per the earlier
    // overscroll-behavior fix) must reach the footer, and the button must be
    // genuinely clickable there - not covered by the preview pane - without
    // forcing past Cypress's actionability check.
    cy.get('.modal').first().scrollTo('bottom');
    cy.get('.modal')
      .first()
      .then(($modal) => {
        expect($modal[0].scrollTop, 'the dialog actually scrolled').to.be.greaterThan(0);
      });

    cy.contains('.modal-dialog button', 'Cancel').then(($cancel) => {
      const rect = $cancel[0].getBoundingClientRect();
      expect(rect.bottom, 'button bottom is within the viewport').to.be.at.most(844);
      expect(rect.top, 'button top is within the viewport').to.be.at.least(0);
    });
    cy.contains('.modal-dialog button', 'Cancel').click();
    cy.get('.modal-dialog').should('not.exist');

    cy.get('@confirms').should('have.length', 0);
  });

  it('resizes editor vs. preview height by touch-dragging the horizontal divider (Test Case 13f)', () => {
    cy.signedInSession('editor');
    cy.captureConfirms().as('confirms');
    cy.visit('/cs/scratch1A');

    cy.contains('button', 'Add New Lesson').click();
    cy.get('.w-md-editor-drag-divider', { timeout: 10000 }).should('be.visible');

    // Simulate a touch drag on the divider, the same way Test Case 13c does
    // for a mouse drag on the desktop (vertical) divider.
    cy.get('.w-md-editor-drag-divider').then(($divider) => {
      const rect = $divider[0].getBoundingClientRect();
      const clientX = rect.left + rect.width / 2;
      const startClientY = rect.top + rect.height / 2;

      cy.wrap($divider)
        .trigger('touchstart', {
          touches: [{ clientX, clientY: startClientY }],
          bubbles: true,
          cancelable: true,
        })
        .trigger('touchmove', {
          touches: [{ clientX, clientY: startClientY + 150 }],
          bubbles: true,
          cancelable: true,
        })
        .trigger('touchend', { bubbles: true, cancelable: true, force: true });
    });

    // Verify the vertical split variable was applied (the horizontal one,
    // --split-percent, is what the desktop drag in Test Case 13c sets).
    cy.get('.w-md-editor-content').should('have.attr', 'style').and('include', '--split-percent-y');

    cy.contains('.modal-dialog button', 'Cancel').click();

    cy.get('@confirms').should('have.length', 0);
  });
});
