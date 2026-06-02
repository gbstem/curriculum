declare namespace Cypress {
  interface Chainable<_Subject = any> {
    signedInSession(role: string): Chainable<any>;
    signOutViaUi(): Chainable<any>;
    deleteLessonIfExists(coursePath: string, lessonNumber: string): Chainable<any>;
  }
}
