// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-graphql-mock';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

function logIn() {
  cy.clearCookies();
  cy.visit('/login');
  cy.wait('@graphql');

  cy.getCy('login').clear().type('admin@gmail.com');
  cy.getCy('password input').clear().type('admin123');
}

Cypress.Commands.add('register', () => {
  logIn();

  cy.getCy('login-register').click();

  cy.getCy('repeat-password input').clear().type('admin123');
  cy.getCy('submit').click();
  cy.wait('@graphql');
});

Cypress.Commands.add('login', () => {
  logIn();
  cy.getCy('submit').click();

  cy.wait('@graphql');
  cy.url().should('include', '/friends');
});

Cypress.Commands.add('getCy', (value) => cy.get(`.data-cy-${value}`));

Cypress.Commands.add('graphqlSpy', () =>
  cy.route({ method: 'POST', url: 'http://localhost:8080/graphql' }).as('graphql'),
);

Cypress.Commands.add('expectQueryName', (queryName) =>
  cy.get('@graphql').should((xhr) => {
    expect(xhr.request.body.query).to.contain(queryName);
  }),
);

Cypress.Commands.add('waitAndExpectQueryName', (queryName) => {
  cy.wait('@graphql');
  cy.get('@graphql').should((xhr) => {
    expect(xhr.request.body.query).to.contain(queryName);
  });
});

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
});
