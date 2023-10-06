describe("Course overview page units test", () => {
    beforeEach(() => {
      cy.viewport(2000,1000)
  
      cy.login_staff();
      cy.visit(`${Cypress.env("COURSES_URL")}`, {
        auth: {
          username: Cypress.env("staff_user").username,
          password: Cypress.env("staff_user").password,
        },
      });
  
  
    });
  
    it("course overview units visible", function () {
      cy.get("#main")
        .find(".courses .courses-listing")
        .then((res) => {
          cy.get(res).find(".courses-listing-item").should("be.visible").should("be.exist");
        });
    });
  
    it("course overview font size", function () {
     cy.get(".course-title").should("have.css","font-size","18px");
     cy.get(".course-date").should("have.css","font-size","14px")
     cy.get(".cover-image").should("be.visible")
    });
  
  });
  