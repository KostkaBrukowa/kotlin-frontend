export const graphqlSpy = () => {
  cy.route({ method: 'POST', url: 'http://localhost:8080/graphql' }).as('graphql');
};

export const expectQueryName = (queryName) => {
  cy.get('@graphql').should((xhr) => {
    expect(xhr.request.body.query).to.contain(queryName);
  });
};

export const waitAndExpectQueryName = (queryName) => {
  cy.wait('@graphql');
  cy.get('@graphql').should((xhr) => {
    expect(xhr.request.body.query).to.contain(queryName);
  });
};
