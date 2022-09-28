

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

    it('Fields should contain input when typed in and clear properly', () => {
        cy.get('.sc-kDDrLX > form > :nth-child(1) > .sc-bczRLJ > #username').type('isaac-parsons')
          .should('have.value', 'isaac-parsons')
          .clear()
          .should('have.value', '');

        cy.get(':nth-child(2) > .sc-bczRLJ > #password').type('gnocci123')
          .should('have.value', 'gnocci123')
          .clear()
          .should('have.value', '');
    })

    it('Should allow a registered user to login, and go to their dashboard', () => {
        cy.request('POST', 'http://ec2-3-104-104-155.ap-southeast-2.compute.amazonaws.com:8081/api/users/login/', {
            "username": "test",
            "password": "test123"
        })
          .then((response) => {
            expect(response).property('status').to.equal(200)
            expect(response.body).property('username').to.be.a('string')
            expect(response.body).property('token').to.be.a('string')
          })
        
          cy.get('.sc-kDDrLX > form > :nth-child(1) > .sc-bczRLJ > #username').type('test')
          cy.get(':nth-child(2) > .sc-bczRLJ > #password').type('test123')
          cy.get('.sc-kDDrLX > form > .sc-gKXOVf').click()
          cy.url().should('include', '/dashboard')
          cy.contains('Welcome back to Nitrus')
          cy.contains('My Collection')
          cy.contains('Friends')
    })

    it('Should not allow an unregistered user to login', () => {
      cy.request({
        method: 'POST', 
        url: 'http://ec2-3-104-104-155.ap-southeast-2.compute.amazonaws.com:8081/api/users/login/', 
        body: {
          "username": "doesnotexist",
          "password": "doesnotexist123"
        }, 
        failOnStatusCode: false})

        .then((response) => {
          expect(response).property('status').to.equal(401)
        })

          cy.url().should('eq', 'http://localhost:3000/')
        
    })
})
  