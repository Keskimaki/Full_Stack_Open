describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('salasana')
      cy.contains('login').click()

      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('incorrect')
      cy.contains('login').click()

      cy.contains('wrong credentials')
      cy.get('html').should('not.contain', 'root logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('.title').type('testblog')
      cy.get('.author').type('Tester')
      cy.get('.url').type('test.com')

      cy.get('#create').click()

      cy.contains('testblog Tester')
      cy.contains('view')
    })

    describe('After a blog is created', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('.title').type('testblog')
        cy.get('.author').type('Tester')
        cy.get('.url').type('test.com')

        cy.get('#create').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('view').click()
        cy.get('#detailed').contains('1')
      })

      it('User can delete blogs added by them', function() {
        cy.reload()
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('removed testblog')
        cy.get('html').should('not.contain', 'testblog tester')
      })

      it('Multiple blogs are shown ordered by likes', function() {
        cy.contains('create new blog').click()
        cy.get('.title').type('second_testblog')
        cy.get('.author').type('Tester')
        cy.get('.url').type('second.com')
        cy.get('#create').click()
        cy.contains('second_testblog Tester').click()
        cy.contains('second.com').contains('like').click()

        cy.contains('second_testblog Tester').click()
        cy.wait(1000)
        cy.get('#detailed').contains('1')
      })
    })
  })
})
