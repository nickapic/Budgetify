describe("Create an Income item and see if it has.",() =>{
    it("Adding an item is usable", () =>{
        cy.visit('/login')
        cy.get('#email').clear();
        cy.get('#email').type('test3@email.com');
        cy.get('#password').clear();
        cy.get('#password').type('test123');
        cy.get('.form-input-btn').click();
        cy.get(':nth-child(1) > .addtransaction-input').clear();
        cy.get(':nth-child(1) > .addtransaction-input').type('New Item ');
        cy.get(':nth-child(2) > input.addtransaction-input').clear();
        cy.get(':nth-child(2) > input.addtransaction-input').type('100');
        cy.get('#categories').select('Shopping');
        cy.get('.btn').click().get(".transaction-list_item-text").contains("New Item")
    })
});

describe("Remove an Income item ",() =>{
    it("Remove an item is usable", () =>{
        cy.visit('/login')
        cy.get('#email').clear();
        cy.get('#email').type('test3@email.com');
        cy.get('#password').clear();
        cy.get('#password').type('test123');
        cy.get('.form-input-btn').click();
        cy.get(':nth-child(1) > .addtransaction-input').clear();
        cy.get(':nth-child(1) > .delete-btn > .fas').click();

    })
});