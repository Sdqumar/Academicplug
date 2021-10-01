///<reference types='cypress'/>


describe('e2e for signin', ()=>{

    beforeEach(() => {
        cy.visit('https://www.academicplug.com/Signin');
        cy.findByRole('heading', {  name: /sign in/i})
        cy.findByText(/forget password\?/i)

      })
    
    it('user should be able to signin', ()=>{
        cy.get('input[name=email]').type('Admintest@1.com')
        cy.get('input[name=password]').type('Admintest@1.com')
        cy.findByRole('button', {  name: /submit/i}).click()
        cy.contains('Login Sucessfully!')
        cy.url().should('eq', 'https://www.academicplug.com/') 
    })
    
    it('check for wrong Password or Email', () => {
        cy.get('input[name=email]').type('Admintest@1.c')
        cy.get('input[name=password]').type('Admintest@1.com')
        cy.findByRole('button', {  name: /submit/i}).click()
        cy.contains('Invalid Username or Password!')
        cy.url().should('eq', 'https://www.academicplug.com/Signin') 
        
    })

    it('check for disable button state on error field ', () => {
        cy.get('input[name=email]').click()
        cy.get('input[name=password]').click()
        cy.findByRole('button', {  name: /submit/i})
        .should('be.disabled')

        cy.get('input[name=email]').type('sdssd')
        cy.get('input[name=password]').type('sdsdd')
        cy.findByRole('button', {  name: /submit/i})
        .should('be.disabled')
        
    })
    it('forget password compontent ', () => {
        cy.findByText(/forget password\?/i).click()
        cy.contains(/please enter your emaill address/i)
        cy.contains(/close/i)
        cy.get('input[name=email]')
        cy.contains(/submit/i)
        .click()

       
    })

      
})