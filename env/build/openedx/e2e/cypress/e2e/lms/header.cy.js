describe("Header Logo test", () => {
    beforeEach(() => {
        cy.login_staff()

        cy.visit(`${Cypress.env("DASHBOARD_URL")}`, {
            auth: {
               
                 username: Cypress.env("staff_user").username,
                password: Cypress.env("staff_user").password,
            },
        });
    });

    it("The header logo should be the theme logo", function() {
        cy.get(".logo").should("be.visible")
        cy.get("h1.header-logo > a > img").should("have.css", "height", "40px")
        cy.get("h1.header-logo > a > img").should(
            "have.attr",
            "src",
            `/static/community-theme/images/logo.png`
        );
       
    });

});