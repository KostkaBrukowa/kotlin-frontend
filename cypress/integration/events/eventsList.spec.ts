export {};

describe('events list', () => {
  beforeEach(() => {
    cy.enterAnApp();
  });

  it('should display correct events list', () => {
    cy.gqlRoute('fx:events/events-list').as('events');
    cy.getCy('toolbar').contains('Wydarzenia').click();
    cy.wait('@events');

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
