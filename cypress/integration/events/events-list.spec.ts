export {};

describe('', () => {
  // before(() => {
  //   cy.exec('yarn db:clear');
  // });

  beforeEach(() => {
    cy.server();
    cy.gqlRoute('fx:refresh').as('refresh');
    cy.visit('/login');
  });

  it('should display correct expenses and payment lists', () => {
    cy.gqlRoute('fx:events/events-list').as('events');
    cy.wait('@refresh');
    cy.wait('@events');

    cy.getCy('toolbar').contains('Wydarzenia').click();

    cy.get('.ant-layout-header').contains('Wydarzenia');
    cy.get('.ant-tabs-tab-active').contains('Wydarzenia');
    cy.get('.ant-list ul li').should('have.length', 2);

    cy.get('.ant-tabs-nav-list').contains('Grupy').click();
    cy.get('.ant-tabs-tab-active').contains('Grupy');
    cy.get('.ant-list ul li:visible').should('have.length', 2);

    cy.get('.ant-tabs-nav-list').contains('Znajomi').click();
    cy.get('.ant-tabs-tab-active').contains('Znajomi');
    cy.get('.ant-list ul li:visible').should('have.length', 2);

    cy.getCy('toolbar').contains('Nowy Wydatek').click();
    cy.getCy('toolbar').contains('Wydarzenia').click();
    cy.get('.ant-tabs-tab-active').contains('Znajomi');
  });
});
