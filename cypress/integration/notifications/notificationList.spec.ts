describe('notifications test', () => {
  beforeEach(() => {
    cy.setCookie('disableNotifications', 'true');
    cy.enterAnApp();
    cy.setCookie('disableNotifications', '');
  });

  it('should display correct notifications list', () => {
    cy.gqlRoute('fx:notifications/notificationList').as('notifications');
    cy.getCy('toolbar').contains('Aktywność').click();
    cy.contains('Odśwież').click();
    cy.wait('@notifications');

    cy.get('.ant-layout-header').contains('Aktywność');
    cy.getCy('dropdown-trigger').first().click();

    // cy.contains('Usuń powiadomienie').should('be.visible').click();

    cy.gqlRoute('fx:payments/singlePayment');
    cy.get('.ant-list-items > :nth-child(1)').click();
    cy.url().should('contain', 'payments');

    cy.gqlRoute('fx:expenses/singleExpense').as('expenses');
    cy.go('back');
    cy.get('.ant-list-items > :nth-child(2)').click();
    cy.wait('@expenses');
    cy.url().should('contain', 'expenses');

    cy.go('back');
    cy.get('.ant-list-items > :nth-child(3)').click();
    cy.url().should('contain', 'events');
  });
});

export {};
