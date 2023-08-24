///<reference types="Cypress" />

describe('bigBrain web visit', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('Bigbrain', () => {
  let email = '1user1@1234567.com'
  let name = 'user1'
  let password = 'password1'
  let gameName = 'game'

  it('register', () => {
    //visit web
    cy.visit('http://localhost:3000/');
    //sign up
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#name').type(name)
    cy.get("#signUserUp").click()
    cy.url().should("include", "dashboard")
  })

  it('happy path', () => {
    //visit web
    cy.visit('http://localhost:3000/')
    //go sign in
    cy.get("#signIn").click()
    // assert
    cy.url().should("include", "signin")
    // sign in and go to dashboard
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get("#signUserIn").click()
    cy.url().should("include", "dashboard")
    //create a new game
    cy.get("#showCreateGame").click()
    cy.get('#quizName').type(gameName)
    cy.get('#createGame').click()
    cy.get('#startQuiz:first').click()
    // cy.get('#copyUrl').click()
    //end a game
    cy.get('#endQuiz:first').click()
    cy.get('#viewResult').click()
    cy.url().should("include", "Admin")
    //logout
    cy.get('#logout').click()
    cy.url().should("equal", "http://localhost:3000/")
    //log back
    cy.get("#signIn").click()
    cy.url().should("include", "signin")
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get("#signUserIn").click()
    cy.url().should("include", "dashboard")
  })

  it('another path', () => {
    //visit web
    cy.visit('http://localhost:3000/')
    //go sign in
    cy.get("#signIn").click()
    assert
    cy.url().should("include", "signin")
    // sign in and go to dashboard
    cy.get("#signUserIn").click()
    cy.url().should("include", "dashboard")
    //create a game
    cy.get("#showCreateGame").click()
    cy.get('#quizName').type(gameName)
    cy.get('#createGame').click()
    //edit the game
    cy.get('#quizEdit').click()
    cy.url().should("include", "QuizEdit")
    cy.get('#nameEdit').click()
    cy.get('#inputName').clear()
    cy.get('#inputName').type('quiz1')
    cy.get('#updateName').click()
    cy.get('#editContainer').should('contain', 'quiz1')
    //add questions
    cy.get('#addQ').click()
    cy.get('#question').type('question1')
    cy.get('#time').type('10')
    cy.get('#points').type('2')
    cy.get('#choice').type('a')
    cy.get('#check').click()
    cy.get('#addChoice').click()
    cy.get('#choice').type('b')
    cy.get('#addChoice').click()
    cy.get('#choice').type('c')
    cy.get('#addChoice').click()
    cy.get('#submitQ').click()
    //back to dashboard
    cy.get('#backDash').click()
    //delete quiz
    cy.get('#quizDelete').click()
  })

})
