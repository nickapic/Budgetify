describe("Rendered Register Page",() =>{
    it("renders correctly", () =>{
        cy.visit('/signup')
        
    })

    it('Click on Register and input feilds', function() {
        cy.visit('/');
        cy.get('[href="/signup"]').click();
        cy.get('#name').clear();
        cy.get('#name').type('Nickapic');
        cy.get('#email').clear();
        cy.get('#email').type('nickapic@test.co');
        cy.get('#password').clear();
        cy.get('#password').type('nickapic');
        cy.get('#confirmpassword').clear();
        cy.get('#confirmpassword').type('nickapic');
    });
});

