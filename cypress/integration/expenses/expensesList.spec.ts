import schema from '../../../schema.json';
import { expensesRoute } from '../../../src/components/navigation/routerConstants';
import { OwsType } from '../../../src/components/expenses/ExpensesContext';

describe('login test', () => {
  // before(() => {
  //   cy.exec('yarn db:clear');
  // });

  beforeEach(() => {
    cy.server();
    cy.gqlRoute('fx:refresh').as('refresh');
    cy.visit('/login');
  });

  it('should refresh token 1 minute before invalidation', () => {
    cy.gqlRoute('fx:expenses/expenses').as('expenses');
    cy.wait('@refresh');
    cy.wait('@expenses');

    cy.getCy('expenses-list').should('have.css', 'opacity', '1');
    // cy.matchImageSnapshot('1');

    cy.getCy(`ows-${OwsType.USER_OWS}`).click();

    cy.getCy('expenses-list', {}).should('have.css', 'opacity', '1');
    // cy.matchImageSnapshot('2');

    cy.getCy('title').first().trigger('mouseover');
    cy.getCy('tooltip').contains('Platność czeka');
  });
});
