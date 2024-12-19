export {}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /** if the token exists, reuse ist 
       *  if no token exists, get a token
      */
      maybeGetToken(sessionName: string):Chainable<string>
     
      /** https://www.npmjs.com/package/@cypress/skip-test
       * `cy.skipOn('localhost')` */
      skipOn(
        nameOrFlag: string | boolean | (() => boolean),
        cb?: () => void
      ): Chainable<Subject>

      /** https://www.npmjs.com/package/@cypress/skip-test
       * `cy.onlyOn('localhost')` */
      onlyOn(
        nameOrFlag: string | boolean | (() => boolean),
        cb?: () => void
      ): Chainable<Subject>
    }
  }
}
