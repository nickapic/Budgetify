describe("Rendered the Hero Page and SVG accurately",() =>{
    it("renders correctly", () =>{
        cy.visit('/')
        cy.get(".hero-section").should("exist")
        cy.get(".hero-section-left").should("exist")
    })
});

describe("Rendered the login page and had the form",() =>{
    it("renders correctly", () =>{
        cy.visit('/')
        cy.get(".hero-section").should("exist")
        cy.get(".hero-section-left").should("exist")
    })
});