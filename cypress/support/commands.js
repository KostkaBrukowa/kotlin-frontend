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
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import { login, register } from './loginCommands';
import { expectQueryName, gqlRoute, graphqlSpy, waitAndExpectQueryName } from './graphqlCommands';

Cypress.Commands.add('register', register);
Cypress.Commands.add('login', login);

Cypress.Commands.add('getCy', (value, options) => cy.get(`.data-cy-${value}`, options));

Cypress.Commands.add('graphqlSpy', graphqlSpy);
Cypress.Commands.add('gqlRoute', gqlRoute);
Cypress.Commands.add('expectQueryName', expectQueryName);
Cypress.Commands.add('waitAndExpectQueryName', waitAndExpectQueryName);

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.05 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
});
