const { defineConfig } = require("cypress");

// Define a constant for the courseId
const COURSE_ID = "course-v1:test+test+test";

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://local.overhang.io:8000/",
    chromeWebSecurity: false,
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
      // Use string template literals to inject the COURSE_ID value into the URLs
      DISCUSSION_URL: `http://apps.local.overhang.io:2002/discussions/${COURSE_ID}/posts`,
      REGISTRATION_URL:"http://apps.local.overhang.io:1999/authn/register?next=%2F",
      ENROLLMENT_URL: `http://local.overhang.io:8000/courses/${COURSE_ID}/about`,
      staff_user: {
        username: "admin",
        email: "admin@example.com",
        password: "admin",
      },
      user: {
          name: "learner",
          email: "learner@example.com",
          username: "learner",
          password: "Test123$",
          country: "Germany"
        },
      test_course: {
          name: "test",
          org: "test",
          number: "test",
          run: "101",
      },
    },
    projectId: "6yfi94",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
