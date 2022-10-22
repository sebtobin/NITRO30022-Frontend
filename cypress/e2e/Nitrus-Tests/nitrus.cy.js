describe('Nitrus Login and Register', () => {
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
        cy.contains('Login')
        
        cy.get('#login_username').type('isaac-parsons')
          .should('have.value', 'isaac-parsons')
          .clear()
          .should('have.value', '');

        cy.get('#login_password').type('gnocci123')
          .should('have.value', 'gnocci123')
          .clear()
          .should('have.value', '');
    })

    it('Should not allow a registered user to register again', () => {
      // Register with username "test", email "test123@gmail.com" and password "test123".
      cy.get('#register_username').type('test')
      cy.get('#register_email').type('test123@gmail.com')
      cy.get('#register_password').type('test123')
      cy.get('#register_button').click()

      // The registration should fail.
      cy.contains('An unexpected error occurred. Please try again.')
      cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Should not allow an unregistered user to login', () => {
      // Attempt to login with username "doesnotexist" and password "doesnotexist123"
      cy.get('#login_username').type('doesnotexist')
      cy.get('#login_password').type('doesnotexist123')
      cy.get('#login_button').click()

      // The login should fail.
      cy.contains('Incorrect username or password. Please try again.')
      cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Should allow a registered user to login, and go to their dashboard', () => {
      // Attempt to login with username "test" and password "test123"
      cy.get('#login_username').type('test')
      cy.get('#login_password').type('test123')
      cy.get('#login_button').click()

      // The login should be successful and Nitrus should navigate to the dashboard
      cy.url().should('include', '/dashboard')
      cy.contains('Welcome back to Nitrus')
      cy.contains('My Collection')
      cy.contains('Friends')
    })

})

describe('Nitrus Logout', () => {
  beforeEach(() => {
    // At the start of all our tests, visit the home page and log in
    cy.visit('/')

    cy.get('#login_username').type('test')
    cy.get('#login_password').type('test123')
    cy.get('#login_button').click()
  })

  it('Should log the user out in the dashboard when user presses on logout button', () => {
    cy.get('#dashboard_logout_button').click()
    cy.url().should('eq', 'http://localhost:3000/');
  })

  // it('Should log the user out in the profile page when user presses on logout button', () => {
  //   cy.get('#dashboard_profile_button').click()
  //   cy.get('#profile_logout_button').click()
  //   cy.url().should('eq', 'http://localhost:3000/');
  // })
})

describe('Nitrus Files and Collections', () => {
  beforeEach(() => {
    // At the start of all our tests, visit the home page and log in
    cy.visit('/')

    cy.get('#login_username').type('test')
    cy.get('#login_password').type('test123')
    cy.get('#login_button').click()
  })

  it('Should be able to create a collection, upload a file to it, delete a file, then delete the collection', () => {
    cy.get('#create_collection_button').click()
    cy.get('#create_collection_modal_input').type('TestCollection')
    cy.get('#create_collection_modal_button').click()

    cy.contains('TestCollection')

    cy.get("#\\#collection_view_button0").click()
    cy.url().should('include', '/collection')

    cy.get('input[type=file]').selectFile({ contents: 'test_utils/WOREEE.png' }, { force: true })
    cy.get('#upload_file_button').click()

    cy.contains('WOREEE')
  })

})

