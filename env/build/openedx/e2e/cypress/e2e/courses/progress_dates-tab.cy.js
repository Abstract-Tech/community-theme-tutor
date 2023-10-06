describe("navigate to a course tabs", () => {
    beforeEach(() => {
        cy.login_staff();
      cy.visit(`${Cypress.env("DASHBOARD_URL")}`, {

      });
      
    //   Cypress.on("uncaught:exception", (err, runnable) => {
    //     if (err.message.includes("Failed Element Selection")) {
    //       return false;
    //     } else if (err.message.includes(" constructor is not a constructor")) {
    //       return false;
    //     }
    //     else if (err.message.includes("Script error.")) {
    //       return false;
    //     }
  
    //   });

    cy.get("body")
    cy.get(".discover-new-link").first().click();
      cy.get("li.courses-listing-item").first().click();

      cy.get("body").then(($body) => {
        // synchronously query for element
        if ($body.find("div.main-cta strong").length) {
          // do something
          cy.get("div.main-cta strong").click({force: true});
        } else {
          // do something else
          cy.get("div.main-cta a.register").click({force: true});
        }
        
      });
    
    });


  
    it("navigate to a course progress tab, and check the section inside the page if visible and exist", function () {
      cy.get("nav.nav-underline-tabs a").contains("Progress").click();
      cy.get("nav.nav-underline-tabs").children("a").eq(1).should("have.class", "active");
      

      //course completion donut percentage
      cy.get('.donut-segment-group').should('be.visible');
      cy.get('.grades').should('be.visible');
    });

    it("navigate to a course Dates tab, and check the section inside the page if visible and exist", function () {
      cy.get("nav.nav-underline-tabs").children("a").eq(2).click();
      cy.get("nav.nav-underline-tabs").children("a").eq(2).should("have.class", "active");
      cy.get(".dates-day").should('be.visible');
  });
  
    
  });
  