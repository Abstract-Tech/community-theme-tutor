describe("navigate to a course tabs", () => {
    beforeEach(() => {
        cy.login_staff();
      cy.visit(`${Cypress.env("DASHBOARD_URL")}`, {

      });
      

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


    it("navigate to a course Instructor tab, and check the section inside the page if visible and exist", function () {
        cy.get("nav.nav-underline-tabs").children("a").eq(3).click();
        cy.get('ol.tabs.course-tabs li.tab:last-child a').should("have.class", "active");
        cy.get('.instructor-nav').should('be.visible');

        const buttons = cy.get('ul.instructor-nav button');

        // Iterate over each button and click it
        buttons.each(($button) => {
          // Click the button
          cy.wrap($button).click({ force: true });
    
          // Assert that the clicked button has the 'active' class
          cy.wrap($button).should('have.class', 'active-section');
        });

    });
    
  });
  