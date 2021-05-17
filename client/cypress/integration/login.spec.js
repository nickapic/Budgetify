describe("Rendered Login Page",() =>{
    it("renders correctly", () =>{
        cy.visit('/login')
        cy.get(".form-section_form").should("exist")
    })
});

describe("Rendered the login page and had the form",() =>{
    it("Login forms exist", () =>{
        cy.visit('/login')
        cy.get(".authentication-page").should("exist")
        cy.get(".form-control").should("exist")
        cy.get(".form-label").should("exist")
        cy.get(".form-input").should("exist")
        cy.get(".form-section-login").should("exist")
    })
});

describe("Form Items are Usable",() =>{
    it("Login is usable", () =>{
        cy.visit('/login')
        cy.get('.form-section_form > :nth-child(1)').click();
        cy.get('#email').clear();
        cy.get('#email').type('test3@email.com');
        cy.get('#password').clear();
        cy.get('#password').type('test123');
        cy.get('.form-input-btn').click();
    })
});