describe("Course overview page units test", () => {
    beforeEach(() => {
      cy.viewport(2000,1000)
  
      cy.login_staff();
      cy.visit(`${Cypress.env("DASHBOARD_URL")}`, {
        auth: {
          username: Cypress.env("staff_user").username,
          password: Cypress.env("staff_user").password,
        },
      });

      cy.get("body")
      cy.get(".discover-new-link").first().click();
        cy.get("li.courses-listing-item").first().click();
  
         cy.get("body").then(($body) => {
        // synchronously query for element
        if ($body.find("div.main-cta strong").length) {
          // do something
          cy.get("div.main-cta strong").click();
        } else {
          // do something else
          cy.get("div.main-cta a.register").click();
        }
        cy.get(".collapsible-icon button").first();
        cy.get(".collapsible-body a").first().click();
      });

  
    });
  
    it("course next/previous button units visible", function () {
      cy.get(".next-btn").should("be.visible");
      cy.get(".previous-btn").should("be.visible");
    });
  
 
  
  });
  