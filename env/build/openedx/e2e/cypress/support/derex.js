function login(email, password) {
    cy.request({
        url: Cypress.env("LOGIN_URL"),
        failOnStatusCode: false,
        // auth: {
        //     user: Cypress.env("http_auth_credentials").username,
        //     pass: Cypress.env("http_auth_credentials").password,
        // }, 
    });
    // Save CSRFtoken and use it in header to send login POST request
    cy.getCookie("csrftoken")
        .its("value")
        .then(($token) => {
            cy.request({
                method: "POST",
                url: Cypress.env("LOGIN_URL"),
                form: true,
                body: {
                    email: email,
                    password: password,
                    remember: false,
                },
                auth: {
                    user: Cypress.env("staff_user").username,
                    pass: Cypress.env("staff_user").password,
                },
                headers: {
                    Referer: Cypress.env("LOGIN_URL"),
                    "X-CSRFToken": $token,
                },
            });
        });
}

Cypress.Commands.add("login_staff", () => {
    login(Cypress.env("staff_user").email, Cypress.env("staff_user").password);
});

Cypress.Commands.add("login_learner", () => {
    login(
        Cypress.env("staff_user").email,
        Cypress.env("staff_user").password
    );
});
