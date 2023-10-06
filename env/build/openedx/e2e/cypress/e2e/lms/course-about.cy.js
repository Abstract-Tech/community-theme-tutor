describe("Header Logo test", () => {
    beforeEach(() => {
        cy.login_staff()

        cy.visit(`${Cypress.env("DASHBOARD_URL")}`, {
            auth: {
               
                 username: Cypress.env("staff_user").username,
                password: Cypress.env("staff_user").password,
            },
        });

        cy.get("body")
        cy.get(".discover-new-link").first().click();
          cy.get("li.courses-listing-item").first().click();
    });

    

    it("test the course about page", function() {
        cy.get(".register").should("be.visible");
        cy.get(".social-sharing").should("be.visible");
       
       
    });

});