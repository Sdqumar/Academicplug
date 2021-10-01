import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (email,pass)=>{
    
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(pass)
    cy.findByRole('button', {  name: /submit/i}).click()
})

Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
  });
  
  Cypress.Commands.add("getBySelLike", (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args);
  });
  
  
  Cypress.Commands.add("header",()=> {
   return(
     cy.get('header').within(()=>{
       cy.contains(/academicplug/i).should('be.visible')
       cy.contains(/login/i).should('be.visible')
       cy.contains(/sign up/i).should('be.visible')
   })

   )
  });
 
  Cypress.Commands.add("footer",()=> {
   return(
     cy.get('footer').within(()=>{
       cy.contains(/academic plug 2021/i).should('be.visible')

   })

   )
  });

