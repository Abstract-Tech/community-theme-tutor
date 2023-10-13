describe("Register user test", () => {
    beforeEach(() => {
     
  
      cy.visit(`${Cypress.env("LMS_URL")}`);

      cy.on("uncaught:exception", (err) => {
        if (err.message.includes("ResizeObserver loop limit exceeded")) {
          // This error is expected, so suppress it and continue the test
          return false;
        }
      }); 

      
  cy.on('uncaught:exception', (e) => {
    if (e.message.includes('Things went bad')) {
      // We expected this error, so let's ignore it and let the test continue
      return false;
    }
  });


      cy.get("body");
      cy.get(".global-header .nav-links .secondary a.register-btn").click({ force: true });
  
     
    });
  
    it("test the registration page", function() {
      cy.get('#name').type('test_name');
      cy.get('#email').type('123@gmail.com');
      cy.get('#username').type('test_username', { force: true } );
      cy.get('#password').type('test_password12');
      cy.get("#country").type('Italy');
      cy.get('.dropdown-container button[name="countryItem"][value="Italy"]').click({ force: true });

      cy.get("#register-user").click({ force: true });
    });
  });
  