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
          cy.get("div.main-cta a.register").click();
        }
        
      });
    
    });

    it("Check if bookmarks are present on the index page", function () {
        cy.get('ul.list-unstyled li.small a').should('be.visible').each(($element) => {
            cy.wrap($element).contains('a');
          });
    })

    it("Check if the course dates are present on the index page", function () {
      cy.get(".course-outline-tab").contains("Important dates");
    })


  
    it("Landing to the course index page ", function () {
      cy.get("nav.nav-underline-tabs").children("a").eq(0).should("have.class", "active");
      cy.get(".course-outline-tab")
        .should("be.visible")
        .should("be.exist");
    });
  
    it("navigate to a course progress tab, and check the section inside the page if visible and exist", function () {
      cy.get("nav.nav-underline-tabs a").contains("Progress").click();
      cy.get("nav.nav-underline-tabs").children("a").eq(1).should("have.class", "active");
    });
  
  
    it("navigate to a course Dates tab, and check the section inside the page if visible and exist", function () {
        cy.get("nav.nav-underline-tabs").children("a").eq(2).click();
        cy.get("nav.nav-underline-tabs").children("a").eq(2).should("have.class", "active");
        
    });
  
    it("navigate to a course Discussion tab, and check the section inside the page if visible and exist", function () {
        cy.get("nav.nav-underline-tabs a").contains("Discussion").click();
        cy.get("nav.nav-underline-tabs").children("a").eq(3).should("have.class", "active");
        cy.get(".header-action-bar").find("button").should('be.visible');

    });

    it("navigate to a course Instructor tab, and check the section inside the page if visible and exist", function () {
        cy.get("nav.nav-underline-tabs").children("a").eq(4).click();
        cy.get('ol.tabs.course-tabs li.tab:last-child a').should("have.class", "active");

    });
    
  });
  