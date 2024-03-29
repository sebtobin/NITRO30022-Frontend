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
    })

})

describe('Nitrus Page Navigation', () => {
  beforeEach(() => {
    // At the start of all our tests, visit the home page and log in
    cy.visit('/')

    cy.get('#login_username').type('test')
    cy.get('#login_password').type('test123')
    cy.get('#login_button').click()
    cy.url().should('include', '/dashboard')
  })

  it('Should log the user out in the dashboard when user presses on logout button', () => {
    cy.get('#logout_button').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Should log the user out in the profile page when user presses on logout button', () => {
    cy.get('#profile_button').click()
    cy.url().should('include', '/profile')
    cy.contains('Save')

    cy.get('#logout_button').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Should be able to stay on the dashboard when My Collection button is pressed while on dashboard', () => {
    cy.get('#collection_button').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome back to Nitrus')
  })

  it('Should be able to navigate from the profile page to the collection page', () => {
    cy.get('#profile_button').click()
    cy.url().should('include', '/profile')
    cy.contains('Save')

    cy.get('#collection_button').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome back to Nitrus')
  })
})

describe('Nitrus Files and Collections', () => {
  beforeEach(() => {
    // At the start of all our tests, visit the home page and log in
    cy.visit('/')

    cy.get('#login_username').type('test')
    cy.get('#login_password').type('test123')
    cy.get('#login_button').click()
    cy.url().should('include', '/dashboard')
  })

  it('Should be able to close the create collection modal', () => {
    cy.get('#create_collection_button').click()
    // Force a click on the top left of the modal background.
    // This needs to be done because the modal is rendered above the background and
    // Cypress determines that the background is not visible that way.
    cy.get('#create_collection_modal_background').click('topLeft', { force: true })

    cy.contains('Create Collection').should('not.exist')
  })

  it('Should be able to create a collection and upload a file to it', () => {
    cy.get('#create_collection_button').click()
    cy.get('#create_collection_modal_input').type('Test')
    cy.get('#create_collection_modal_button').click()
    cy.wait(2000)

    cy.contains('Test')

    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')

    cy.get('#choose_file_button').click()
    cy.get('input[type=file]').selectFile({ contents: 'test_utils/WOREEE.png' }, { force: true })
    cy.get('#upload_file_button').click()

    cy.wait(3000)
    cy.contains('WOREEE')
  })

  it('Should be able to log out from a collection', () => {
    cy.get("#logout_button").click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Should not be able to upload when a file is not given', () => {
    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')

    cy.get('#upload_file_button').click()

    // Nothing happens in the case, might need to add a text prompt in the future.
  })

  it('Should not be able to create a collection with the same name', () => {
    cy.wait(3000)
    cy.get('#create_collection_button').click()
    cy.get('#create_collection_modal_input').type('Test')
    cy.get('#create_collection_modal_button').click()

    cy.get('#collections_select').should('have.length', 1)
  })

  it('Should be able to navigate from a collection to the dashboard', () => {
    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')

    cy.wait(500)
    cy.get('#collection_button').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome back to Nitrus')
  })

  it('Should be able to navigate from a collection to Profile page', () => {
    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')

    cy.wait(500)
    cy.get('#profile_button').click()
    cy.url().should('include', '/profile')
    cy.contains('Save')
  })

  it('Should be able to download a file from a collection', () => {
    cy.deleteDownloadsFolder();
    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')

    cy.get('#file_view_button0').click()
    cy.verifyDownload('WOREEE', {contains: true})
    cy.deleteDownloadsFolder();
  })

  it('Should be able to delete a file from a collection', () => {
    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')

    cy.get('#file_delete_button0').click()
    cy.contains('WOREEE').should('not.exist')
  })


  it('Should be able to rename a collection', () => {
    // Ignore the uncaught exception if there is one. Renaming a collection
    // just pushes the dashboard so the exception is irrelevant.
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.contains('Test')
    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')
    
    cy.get("#rename_collection_field").type('Updated')
    cy.get('#rename_collection_save').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Updated')

    cy.get('#collection_view_button0').click()
    cy.url().should('include', '/collection')
    cy.contains('Updated')
  })

  it('Should be able to set the visibility of a collection', () => {
    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')
    cy.wait(500)
    cy.get("#private_visibility_button").should('have.css', 'text-decoration', 'underline solid rgb(66, 79, 64)')
    cy.get("#public_visibility_button").should('not.have.css', 'text-decoration', 'underline solid rgb(66, 79, 64)')

    cy.get("#public_visibility_button").click()
    cy.url().should('include', '/dashboard')

    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')
    cy.wait(500)
    cy.get("#private_visibility_button").should('not.have.css', 'text-decoration', 'underline solid rgb(66, 79, 64)')
    cy.get("#public_visibility_button").should('have.css', 'text-decoration', 'underline solid rgb(66, 79, 64)')
  })

  it('Should be able to search for public collections and download files from it', () => {

    cy.get("#search_field").type("public_1").should('have.value', "public_1")

    cy.get("#search_go_button").click()
    cy.contains("public_1")

    cy.get("#search_clear_button").click()
    cy.contains("public_1").should('not.exist')


    cy.get("#search_go_button").click()
    cy.get("#search_result0").click()

    cy.wait(2000)
    cy.contains("public_1")
    cy.contains("Owned by: isaac_newish")

    cy.get('#file_view_button0').click()
    cy.verifyDownload('cat1', {contains: true})
    cy.deleteDownloadsFolder();
  })

  it('Should be able to search for your own collections', () => {
    cy.wait(2000)

    cy.get("#search_field").type("Updated").should('have.value', "Updated")
    cy.get("#search_go_button").click()
    cy.contains("Updated")

    cy.get("#search_result0").click()
    cy.contains("Updated")
  })

  it('Should be able to delete an existing collection', () => {
    cy.get("#collection_view_button0").click()
    cy.url().should('include', '/collection')

    cy.get('#delete_collection_button').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Test').should('not.exist')
  })

})


describe('Nitrus Change User Details and Profile', () => {
  beforeEach(() => {
    // At the start of all our tests, visit the home page and log in
    cy.visit('/')

    cy.get('#login_username').type('update123')
    cy.get('#login_password').type('update123')
    cy.get('#login_button').click()
    cy.url().should('include', '/dashboard')
  })

  it('Should be able to update email and password and use the new credentials to login', () => {
    cy.get('#profile_button').click()
    
    // Changing email doesn't really matter in this case as it's not 
    // used for logging on. 
    cy.get('#change_details_email').type("update12345@gmail.com")
    cy.get('#change_details_password').type("update12345")
    cy.get('#change_details_password_confirm').type("update12345")
    cy.get('#update_details_save_button').click()
    cy.contains('Details updated successfully. Empty fields were ignored.')

    cy.get('#logout_button').click()
    cy.url().should('eq', 'http://localhost:3000/')

    // Test that the user can't use the old password to login
    cy.get('#login_username').type('update123')
    cy.get('#login_password').type('update123')
    cy.get('#login_button').click()
    cy.contains('Incorrect username or password. Please try again.')

    // Then log in using the new password
    cy.get('#login_password').clear().type('update12345')
    cy.get('#login_button').click()
    cy.url().should('include', '/dashboard')

    // Change back to the old password so this test can be used on the CI Pipeline
    cy.get('#profile_button').click()
    cy.get('#change_details_email').type("update123@gmail.com")
    cy.get('#change_details_password').type("update123")
    cy.get('#change_details_password_confirm').type("update123")
    cy.get('#update_details_save_button').click()
    cy.contains('Details updated successfully. Empty fields were ignored.')

    cy.get('#logout_button').click()
    cy.url().should('eq', 'http://localhost:3000/')
    

    cy.get('#login_username').type('update123')
    cy.get('#login_password').type('update123')
    cy.get('#login_button').click()
    cy.url().should('include', '/dashboard')
  })

})