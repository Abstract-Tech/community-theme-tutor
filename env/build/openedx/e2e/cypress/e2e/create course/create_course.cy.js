describe("create a course", () => {
    beforeEach(() => {
        cy.login_staff();
      cy.visit(`${Cypress.env("STUDIO_URL")}`, {

      });
      

    cy.get("body")
    cy.get(".action-signup").click({ force: true });
    cy.get('a.button.new-button.new-course-button').click({ force: true });
    });

    it("check if course can be created with section/subsection and unit", function () {

    cy.intercept('GET', '/organizations').as('xhrRequest');

    // Click the link
    cy.get('a.new-course-button').click({ force: true });

    // Wait for the XHR and fetch requests to be made
    cy.wait('@xhrRequest').its('response.statusCode').should('eq', 200); // Check XHR request
    
       cy.get('.new-course-name').type('Test course');
        cy.get('.new-course-org').type('Testorganisation');
        cy.get('.new-course-number').type('101');
        cy.get('.new-course-run').type('2024');

        cy.get('.new-course-save').click()


        cy.get('article.outline-course a.button-new').should('be.visible').click()
        cy.get('article.outline-course a.button-new').should('be.visible').click();
        cy.get('.add-subsection a.button-new').should('be.visible').click();
        cy.get('.add-unit a.button-new').should('be.visible').click({force: true});
        cy.get('.action-publish').should('be.visible').click({force: true});
    }) 
 
  });
  