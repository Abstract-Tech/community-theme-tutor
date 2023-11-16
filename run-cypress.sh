

# Check if cypress.json exists in the cypress-tests folder
if [ -f "cypress-tests/cypress.config.js" ]; then
  # If cypress.json exists in the cypress-tests folder, override it with the one from the root directory
  cp cypress.config.js cypress-tests/
  echo "Overriding cypress.json in cypress-tests with the one from the root directory."
else
  # If cypress.json doesn't exist in the cypress-tests folder, check if it exists in the root directory
  if [ -f "cypress.config.js" ]; then
    # If cypress.json exists in the root directory, copy it to the cypress-tests folder
    cp cypress.config.js cypress-tests/
    echo "Using cypress.config.js from the root directory in cypress-tests."
  else
    echo "No cypress.config.js file found in the root directory or cypress-tests folder."
    exit 1
  fi
fi

# Add any other necessary commands or configurations for running Cypress tests
# npx cypress open