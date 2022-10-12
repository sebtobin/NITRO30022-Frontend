describe('example to-do app', () => {
    beforeEach(() => {
      // At the start of all our tests, visit the home page
      cy.visit('/')
    })

    it('Should land on the login page', () => {
        cy.contains('Nitrus')
        cy.contains('Login')
        cy.contains('Register')
    })

    Cypress.config('defaultCommandTimeout', 10000);

    it('Fields should contain input when typed in and clear properly', () => {
        cy.contains('Login')
        
        cy.get('.sc-kDDrLX > form > :nth-child(1) > .sc-bczRLJ > #username').type('isaac-parsons')
          .should('have.value', 'isaac-parsons')
          .clear()
          .should('have.value', '');

        cy.get(':nth-child(2) > .sc-bczRLJ > #password').type('gnocci123')
          .should('have.value', 'gnocci123')
          .clear()
          .should('have.value', '');
    })

    it('Should not allow a registered user to register again', () => {
      // Register with username "test", email "test123@gmail.com" and password "test123".
      cy.get('.sc-iqcoie > form > :nth-child(1) > .sc-bczRLJ > #username').type('test')
      cy.get('#email').type('test123@gmail.com')
      cy.get(':nth-child(3) > .sc-bczRLJ > #password').type('test123')
      cy.get('.sc-iqcoie > form > .sc-gKXOVf').click()

      // The registration should fail.
      cy.contains('An unexpected error occurred. Please try again.')
      cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Should not allow an unregistered user to login', () => {
      // Attempt to login with username "doesnotexist" and password "doesnotexist123"
      cy.get('.sc-kDDrLX > form > :nth-child(1) > .sc-bczRLJ > #username').type('doesnotexist')
      cy.get(':nth-child(2) > .sc-bczRLJ > #password').type('doesnotexist123')
      cy.get('.sc-kDDrLX > form > .sc-gKXOVf').click()

      // The login should fail.
      cy.contains('Incorrect username or password. Please try again.')
      cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Should allow a registered user to login, and go to their dashboard', () => {
      // Attempt to login with username "test" and password "test123"
      cy.get('.sc-kDDrLX > form > :nth-child(1) > .sc-bczRLJ > #username').type('test')
      cy.get(':nth-child(2) > .sc-bczRLJ > #password').type('test123')
      cy.get('.sc-kDDrLX > form > .sc-gKXOVf').click()

      // The login should be successful and Nitrus should navigate to the dashboard
      cy.url().should('include', '/dashboard')
      cy.contains('Welcome back to Nitrus')
      cy.contains('My Collection')
      cy.contains('Friends')
    })

})
  