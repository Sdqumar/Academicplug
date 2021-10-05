

describe('full user happy path', ()=>{

    it('user should be able to signin', ()=>{
        cy.visit('https://www.academicplug.com/');
        cy.findByRole('button', {  name: /sign up/i})
        cy.findByRole('button', {  name: /login/i}).click()
        cy.login('Admintest@1.com','Admintest@1.com')
        cy.url().should('include', 'academicplug.com')
        cy.contains('Courses for Nigerian Students')

    })
    
    it('user should be able to view pdf', () => {
       cy.findByRole('link', {name: /federal university of technology minna/i})
       .click()
       cy.url().should('include', 'Futminna')
       cy.contains(/education/i).click()
       cy.contains(/health/i).click()
       cy.contains(/211/i).click()
      })

})