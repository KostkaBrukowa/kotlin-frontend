import { OwsType } from '../../../src/components/app-context/AppContext';

describe('expenses test', () => {
  beforeEach(() => {
    cy.enterAnApp();
  });

  function getCollapseBody(index: number, query?: string) {
    return cy.get(
      `.ant-collapse .ant-collapse-item:eq(${index}) .ant-collapse-content ${query || ''}`,
    );
  }

  function getCollapseHeader(index: number, query?: string) {
    return cy.get('.ant-collapse .ant-collapse-header').eq(index);
  }

  it('should correctly display singe expense view', () => {
    cy.gqlRoute({ response: 'fx:expenses/singleExpense', delay: 700 }).as('singleExpense');
    cy.get('.ant-card-body').first().click();
    cy.contains('Ładuję');
    cy.wait('@singleExpense');

    getCollapseHeader(0).contains('Płatności');
    getCollapseBody(0, 'li').should('have.length', 3).and('be.visible');
    getCollapseHeader(0).click();
    getCollapseBody(0, 'li').should('not.be.visible');

    getCollapseHeader(1).contains('Uczestnicy').click();
    getCollapseBody(1, '.data-cy-participant-wrapper').should('have.length', 3);
    getCollapseHeader(1).click();
    getCollapseBody(1, '.data-cy-participant-wrapper').should('not.be.visible');

    // todo messages
  });

  it('should correctly act with expense view', () => {
    cy.gqlRoute('fx:expenses/singleExpense').as('singleExpense');
    cy.get('.ant-card-body').first().click();
    cy.wait('@singleExpense');

    cy.gqlRoute('fx:payments/singlePayment').as('singlePayment');
    getCollapseBody(0, 'li').eq(0).click();
    cy.wait('@singlePayment');
    cy.url().should('contain', 'payments/15');
    cy.go('back');

    getCollapseHeader(1).contains('Uczestnicy').click();
    getCollapseBody(1, '.data-cy-participant-wrapper')
      .eq(0)
      .should('be.visible')
      .click({ force: true });
    cy.url().should('contain', 'users/4');
    cy.go('back');

    // todo messages
  });

  it('should redirect to payment payment when click button was clicked', () => {
    cy.gqlRoute('fx:expenses/singleExpense').as('singleExpense');
    cy.get('.ant-card-body').first().click();
    cy.wait('@singleExpense');

    getCollapseBody(0).contains('Opłać').click();
    cy.url().should('contain', 'payments/17/makePayment');
  });
});
