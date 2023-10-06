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

    it("The footer logo should be the theme logo", function() {
        cy.get(".footer-logo").should("be.visible")
        cy.get(".footer-logo").should("have.css", "width", "100px")
        cy.get(".footer-logo").should(
            "have.attr",
            "src",
            `https://community.abzt.de/theming/asset/images/logo.png`
        );
       
    });

});