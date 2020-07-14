export const graphqlSpy = () => {
  cy.route({ method: 'POST', url: 'http://localhost:8080/graphql' }).as('graphql');
};

export const expectQueryName = (queryName) => {
  cy.get('@graphql').should((xhr) => {
    expect(xhr.request.body.query).to.contain(queryName);
  });
};

export const waitAndExpectQueryName = (queryName, routeAlias = '@graphql') => {
  cy.wait(routeAlias);
  cy.get(routeAlias).should((xhr) => {
    expect(xhr.request.body.query).to.contain(queryName);
  });
};

export const gqlRoute = (operations) => {
  if (typeof operations === 'string') {
    return cy.route({
      method: 'POST',
      url: 'http://localhost:8080/graphql',
      response: operations,
    });
  }

  return cy.route({
    method: 'POST',
    url: 'http://localhost:8080/graphql',
    ...operations,
  });
};
