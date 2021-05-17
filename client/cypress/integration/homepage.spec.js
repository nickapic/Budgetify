describe("Rendered the Hero Page and SVG accurately",() =>{
    it("renders correctly", () =>{
        cy.visit('/')
        cy.get(".hero-section").should("exist")
        cy.get(".hero-section-left").should("exist")
    })
});

