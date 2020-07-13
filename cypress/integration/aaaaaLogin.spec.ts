import { JWT_TOKEN_EXPIRY_TIME } from '../../src/components/config/authentication/useAuthentication';

describe('login test', () => {
  before(() => {
    cy.exec('yarn db:clear');
  });

  beforeEach(() => {
    cy.server();
    cy.route({ method: 'POST', url: 'http://localhost:8080/graphql' }).as('graphql');
    cy.visit('/login');
    cy.wait('@graphql');
  });

  function loginAndPassword() {
    cy.getCy('login').clear().type('admin@gmail.com');
    cy.getCy('password input').clear().type('admin123');
  }

  it('should log in and sign in and redirect to login page when no cookie is presen after reload', () => {
    // cy.matchImageSnapshot('1');

    // register
    cy.clearCookies();
    cy.getCookies().should('be.empty');
    cy.getCy('login-register').click();
    cy.getCy('repeat-password').should('have.css', 'opacity', '1');

    // cy.matchImageSnapshot('2');

    loginAndPassword();
    cy.getCy('repeat-password input').clear().type('admin12');
    cy.getCy('submit').click();

    cy.contains('Hasła nie są identyczne');

    cy.getCy('repeat-password input').clear().type('admin123');
    cy.getCy('submit').click();

    cy.wait('@graphql');
    cy.getCookie('xppcreftkn').should('have.property', 'value');
    cy.url().should('include', '/expenses');
    cy.clearCookie('xppcreftkn');

    // login
    cy.reload();
    cy.url().should('include', '/login');

    loginAndPassword();
    cy.getCy('submit').click();

    cy.url().should('include', '/expenses');
  });

  it('should log in and after reload should still be logged in', () => {
    cy.login();

    cy.visit('/expenses');

    cy.url().should('include', '/expenses');
  });

  it('should redirect from /login when user is logged in', () => {
    cy.login();

    cy.visit('/login');

    cy.url().should('include', '/expenses');
  });

  it('should refresh token 1 minute before invalidation', () => {
    cy.clock();
    cy.login();

    cy.tick(JWT_TOKEN_EXPIRY_TIME - 60000);

    cy.waitAndExpectQueryName('refreshToken');
  });
});
