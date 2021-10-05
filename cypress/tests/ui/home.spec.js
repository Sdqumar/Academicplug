

describe('Index component', ()=>{

    it('home', ()=>{
        //cy.visit('https://www.academicplug.com/');
        cy.visit('/');
        
        cy.header()

        cy.getCookie('user')
        .should('exist')
        //banner
        cy.findByRole('img', {  name: /home\-banner/i}).should('be.visible')
        cy.findByRole('heading', {  name: /courses for nigerian students/i})
        .should('be.visible')
        
        //Schoolgrid
        
        
        cy.footer()
        
    
    })
    
   
})