import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (email,pass)=>{
    
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(pass)
    cy.findByRole('button', {  name: /submit/i}).click()
})