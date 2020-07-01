function logIn() {
  cy.clearCookies();
  cy.visit('/login');
  cy.wait('@graphql');

  cy.getCy('login').clear().type('admin@gmail.com');
  cy.getCy('password input').clear().type('admin123');
}

export const register = () => {
  logIn();

  cy.getCy('login-register').click();

  cy.getCy('repeat-password input').clear().type('admin123');
  cy.getCy('submit').click();
  cy.wait('@graphql');
};

export const login = () => {
  logIn();
  cy.getCy('submit').click();

  cy.wait('@graphql');
  cy.url().should('include', '/expenses');
};
