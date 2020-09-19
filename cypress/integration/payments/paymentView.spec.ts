describe('expenses test', () => {
  beforeEach(() => {
    cy.enterAnApp();
  });

  function getCollapseBody(index: number, query?: string) {
    return cy.get(
      `.ant-collapse .ant-collapse-item:eq(${index}) .ant-collapse-content ${query || ''}`,
    );
  }

  it('should correctly act when interacting with modal', () => {
    cy.gqlRoute('fx:expenses/singleExpense').as('singleExpense');
    cy.get('.ant-card-body').first().click();
    cy.wait('@singleExpense');

    cy.gqlRoute('fx:payments/singlePayment').as('singlePayment');
    getCollapseBody(0, 'li').eq(0).click();
    cy.wait('@singlePayment');
    cy.url().should('contain', 'payments/15');

    cy.contains('Platność oczekująca.');

    cy.getCy('main-pay-button');
    cy.getCy('main-pay-button').click();
    cy.get('.ant-modal-confirm-btns > :nth-child(1)').click();

    cy.contains('Platność oczekująca.');

    cy.getCy('main-pay-button');
    cy.getCy('main-pay-button').click();

    cy.gqlRoute('fx:payments/singlePaymentPaid').as('singlePayment');
    cy.get('.ant-modal-body').contains('Rozlicz się');
    cy.get('.ant-modal-body').find('.ant-btn-primary').click();
    // cy.wait('@payment');
    cy.wait('@singlePayment');

    cy.contains('Platność opłacona.');
  });
});
