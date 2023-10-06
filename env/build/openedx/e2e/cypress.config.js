const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://local.overhang.io:8000/",
    chromeWebSecurity: true,
    trashAssetsBeforeRuns: true,
    failOnStatusCode: false,
    env: {
      type: "actual",
      STUDIO_URL: "http://studio.local.overhang.io:8001/",
      LMS_URL: "http://local.overhang.io:8000/",
      CMS_URL: "http://studio.local.overhang.io:8001/",
      LOGIN_URL: "http://local.overhang.io:8000/user_api/v1/account/login_session/",
      DASHBOARD_URL:"http://local.overhang.io:8000/dashboard",
      COURSES_URL:"http://local.overhang.io:8000/courses",
      staff_user: {
        username: "admin",
        email: "admin@example.com",
        password: "admin",
      },
    },
    projectId: "6yfi94",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
