describe("navigate to a course tabs", () => {
    beforeEach(() => {
        cy.login_staff();
      cy.visit(`${Cypress.env("STUDIO_URL")}`, {

      });
      

    cy.get("body")

      cy.get(".action-signup").click({ force: true });
      cy.get('.list-courses .course-item:nth-child(1) a.course-link').click();
      cy.get(".nav-course-tools").click();
      cy.get(".nav-course-tools-export").click();
    });

    it("check if download exported course is visible", function () {
        cy.get('.action-export').should('be.visible').click();
        cy.get('a.action-primary span.copy').click({ force: true });

        cy.wait(5000);
      cy.get('#download-exported-button').should('be.visible');
    }) 

   


    
  });
  