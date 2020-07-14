describe('', () => {
  beforeEach(() => {
    cy.enterAnApp();
  });

  it('should display correct expenses and payment lists', () => {
    cy.gqlRoute('fx:notifications/notificationList').as('notifications');
    cy.getCy('toolbar').contains('Aktywność').click();
    cy.wait('@notifications');

    cy.get('.ant-layout-header').contains('Aktywność');
    cy.getCy('dropdown-trigger').first().click();

    cy.contains('Usuń powiadomienie').should('be.visible').click();

    cy.get('.ant-list-items > :nth-child(1)').click();
    cy.url().should('contain', 'expenses');

    cy.go('back');
    cy.get('.ant-list-items > :nth-child(2)').click();
    cy.url().should('contain', 'payments');

    cy.go('back');
    cy.get('.ant-list-items > :nth-child(3)').click();
    cy.url().should('contain', 'events');
  });
});

export {};
