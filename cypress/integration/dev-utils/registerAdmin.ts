describe('login test', () => {
  beforeEach(() => {
    cy.server();
    cy.route({ method: 'POST', url: 'http://localhost:8080/graphql' }).as('graphql');
  });

  it('register admin', () => {
    cy.register();
  });
});

export {};
