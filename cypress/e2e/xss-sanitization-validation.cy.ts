// Implements TEST_PLAN.md Section I: XSS Sanitization Validation
//
// Regression coverage for the F2 (javascript: URI markdown links) and F4
// (raw HTML before allowlist filtering) findings from the 2026-07-25 Claude
// Security scan. Lesson numbers 3001-3003 are used since 1000/2000/2001 are
// already used by other specs and 1 is a seeded lesson.
import { generateDateHash } from '../support/utils';

const COURSE_PATH = '/cs/scratch1A';
const LESSON_HTML_XSS = '3001';
const LESSON_LINK_XSS = '3002';
const LESSON_SAFE_CONTENT = '3003';

describe('XSS Sanitization Validation (Section I)', () => {
  let confirmVal = true;

  beforeEach(() => {
    confirmVal = true;
    cy.on('window:confirm', () => confirmVal);
    // Fail-safe net: if any payload in this spec manages to pop a native
    // alert (whether during live editor preview or on the saved lesson
    // page), this stub records the call so we can assert against it,
    // instead of the alert silently succeeding or blocking the test runner.
    cy.on('window:alert', cy.stub().as('alertStub'));
  });

  const createLesson = (lessonNumber: string, titlePrefix: string, content: string): string => {
    const lessonTitle = generateDateHash(titlePrefix);
    cy.contains('button', 'Add New Lesson').click();
    cy.get('.modal-dialog').first().should('be.visible');
    cy.get('.modal-dialog').first().find('input[type="number"]').type(lessonNumber);
    cy.get('.modal-dialog').first().find('input[placeholder="Lesson title"]').type(lessonTitle);
    // parseSpecialCharSequences: false so none of the payload's punctuation
    // is misread as a Cypress key sequence.
    cy.get('#content-textarea').type(content, { parseSpecialCharSequences: false });
    cy.get('.modal-dialog').first().contains('button', 'Save').click();
    return lessonTitle;
  };

  // Called from the lesson detail page (not the course list), matching the
  // pattern in scratchblocks-validation.cy.ts / syntax-highlighter-validation.cy.ts.
  const deleteLesson = (lessonNumber: string, lessonTitle: string) => {
    cy.contains('button', 'Edit Lesson').click();
    cy.get('.modal-dialog').first().should('be.visible');
    cy.get('.modal-dialog').first().contains('button', 'Delete').click();
    cy.url().should('eq', Cypress.config().baseUrl + COURSE_PATH);
    cy.contains('.lesson-link', `Lesson ${lessonNumber}: ${lessonTitle}`).should('not.exist');
  };

  it(`neutralizes raw HTML XSS payloads (img onerror, script, svg onload) on Lesson ${LESSON_HTML_XSS} (Test Case 14)`, () => {
    cy.signedInSession('editor');
    cy.deleteLessonIfExists(COURSE_PATH, LESSON_HTML_XSS);
    cy.visit(COURSE_PATH);

    const marker = generateDateHash('xss-html-marker');
    const content =
      `${marker}\n\n` +
      `<img src=x onerror="alert('XSS-F4-img')">\n\n` +
      `<script>alert('XSS-F4-script')</script>\n\n` +
      `<svg onload="alert('XSS-F4-svg')"></svg>`;

    const lessonTitle = createLesson(LESSON_HTML_XSS, 'XSS HTML Test', content);

    cy.contains('.lesson-link', `Lesson ${LESSON_HTML_XSS}: ${lessonTitle}`)
      .should('be.visible')
      .click();
    cy.url().should('include', `${COURSE_PATH}/lesson/${LESSON_HTML_XSS}`);

    // The benign marker proves the line-based content actually rendered...
    cy.get('.curriculum-content').should('contain', marker);
    // ...while none of the disallowed elements ever exist as live DOM nodes,
    // and no element carries a live onerror/onload handler attribute. (When
    // every top-level node in a line is stripped, the renderer falls back to
    // displaying that line's original source as plain, React-escaped text --
    // e.g. the literal characters "onerror" may still be visible on the page,
    // but never as an attribute on a real element, and never executed.)
    cy.get('.curriculum-content').find('img').should('not.exist');
    cy.get('.curriculum-content').find('script').should('not.exist');
    cy.get('.curriculum-content').find('svg').should('not.exist');
    cy.get('.curriculum-content').find('[onerror]').should('not.exist');
    cy.get('.curriculum-content').find('[onload]').should('not.exist');

    // No alert fired at any point: not while the editor's live preview
    // rendered the payload as it was typed, and not on the saved page.
    cy.get('@alertStub').should('not.have.been.called');

    deleteLesson(LESSON_HTML_XSS, lessonTitle);
  });

  it(`renders a javascript: URI markdown link as inert plain text on Lesson ${LESSON_LINK_XSS} (Test Case 14)`, () => {
    cy.signedInSession('editor');
    cy.deleteLessonIfExists(COURSE_PATH, LESSON_LINK_XSS);
    cy.visit(COURSE_PATH);

    const marker = generateDateHash('xss-link-marker');
    const linkText = `Suspicious Link ${marker}`;
    const content = `${marker}\n\n[${linkText}](javascript:alert('XSS-F2'))`;

    const lessonTitle = createLesson(LESSON_LINK_XSS, 'XSS Link Test', content);

    cy.contains('.lesson-link', `Lesson ${LESSON_LINK_XSS}: ${lessonTitle}`)
      .should('be.visible')
      .click();
    cy.url().should('include', `${COURSE_PATH}/lesson/${LESSON_LINK_XSS}`);

    // The link's display text still renders...
    cy.get('.curriculum-content').should('contain', linkText);
    // ...but never as a clickable anchor, and the javascript: scheme never
    // reaches the DOM at all.
    cy.get('.curriculum-content').contains('a', linkText).should('not.exist');
    cy.get('.curriculum-content').invoke('html').should('not.contain', 'javascript:');

    cy.get('@alertStub').should('not.have.been.called');

    deleteLesson(LESSON_LINK_XSS, lessonTitle);
  });

  it(`still renders legitimate HTML tags and links normally on Lesson ${LESSON_SAFE_CONTENT} (Test Case 14)`, () => {
    cy.signedInSession('editor');
    cy.deleteLessonIfExists(COURSE_PATH, LESSON_SAFE_CONTENT);
    cy.visit(COURSE_PATH);

    const marker = generateDateHash('xss-safe-marker');
    const headingText = `Safe Heading ${marker}`;
    const boldText = `Safe Bold ${marker}`;
    const content =
      `<h1>${headingText}</h1>\n\n` +
      `<strong>${boldText}</strong>\n\n` +
      `[Safe Google Link](https://www.google.com)`;

    const lessonTitle = createLesson(LESSON_SAFE_CONTENT, 'XSS Safe Content Test', content);

    cy.contains('.lesson-link', `Lesson ${LESSON_SAFE_CONTENT}: ${lessonTitle}`)
      .should('be.visible')
      .click();
    cy.url().should('include', `${COURSE_PATH}/lesson/${LESSON_SAFE_CONTENT}`);

    // Allow-listed tags still render as real elements, not stripped to text.
    cy.get('.curriculum-content').find('h1').should('contain', headingText);
    cy.get('.curriculum-content').find('strong').should('contain', boldText);
    // A legitimate https link still renders as a clickable anchor.
    cy.get('.curriculum-content')
      .contains('a', 'Safe Google Link')
      .should('have.attr', 'href', 'https://www.google.com');

    cy.get('@alertStub').should('not.have.been.called');

    deleteLesson(LESSON_SAFE_CONTENT, lessonTitle);
  });
});
