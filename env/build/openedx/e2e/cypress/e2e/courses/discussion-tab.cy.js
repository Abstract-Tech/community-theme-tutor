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
          cy.get("div.main-cta strong").click();
        } else {
          // do something else
          cy.get("div.main-cta a.register").click();
        }
        
      });
    
    });



    it("navigate to a course Dates tab, and check the section inside the page if visible and exist", function () {

        cy.get("nav.nav-underline-tabs").children("a").eq(3).click();
        cy.get("nav.nav-underline-tabs").children("a").eq(3).should("have.class", "active");
        

        cy.get('.header-action-bar') // or use another suitable selector
      .find('.nav.nav-pills')
      .find('a') // Find all <a> tags within the container
      .each(($link) => {
        // Perform actions on each <a> tag
        cy.wrap($link) // Wrap the DOM element for Cypress commands
          .should('be.visible'); // Click on the <a> tag (you can replace this with any action you want)
      });

  });
  
    
  });
  