describe("navigate to a course tabs", () => {
    beforeEach(() => {
        cy.login_staff();
      cy.visit(`${Cypress.env("DASHBOARD_URL")}`, {

      });
      

    cy.get("body")

      cy.get(".toggle-user-dropdown").click({ force: true });
      cy.get('.dropdown-user-menu a') // Select all <a> tags within the dropdown
      .eq(2) // Select the third <a> tag (index 2, since indexing starts at 0)
      .click({force: true}); // Click on the selected <a> tag
    
    });

    it("Check if profile page loads", function () {
      cy.get('.btn-link').each(($btnLink) => {
        // Check if the individual .btn-link element is visible
        cy.wrap($btnLink).should('be.visible');
      });

      cy.get('header .logo').should('be.visible');
      cy.get('footer .d-block').should('be.visible');
    })

   


    
  });
  