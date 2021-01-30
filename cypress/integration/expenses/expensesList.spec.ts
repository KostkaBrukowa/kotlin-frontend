import { OwsType } from '../../../src/components/app-context/AppContext';

function changeToUserOwsTab() {
  cy.getCy(`ows-${OwsType.USER_OWS}`).click();
}

function changeToOwsUserTab() {
  cy.getCy(`ows-${OwsType.OWS_USER}`).click();
}

describe('expenses list test', () => {
  beforeEach(() => {
    cy.server();
    cy.setCookie('disableNotifications', 'true');
    cy.gqlRoute('fx:refresh').as('refresh');
    cy.visit('/login');
  });

  it('should display correct expenses and payment lists', () => {
    cy.gqlRoute('fx:expenses/expenses').as('expenses');
    cy.wait('@expenses');

    cy.get('.ant-card-body').should('have.css', 'opacity', '1');
    cy.matchImageSnapshot('expensesList/1');
    cy.get('.ant-card-body').should('have.length', 2);

    changeToUserOwsTab();

    cy.get('.ant-card-body').should('have.css', 'opacity', '1');
    cy.get('.ant-card-body').should('have.length', 3);

    cy.matchImageSnapshot('expensesList/2');

    cy.getCy('title').first().trigger('mouseover');
    cy.getCy('tooltip').contains('Płatność czeka');

    changeToOwsUserTab();
    cy.get('.ant-card-body').should('have.css', 'opacity', '1');

    cy.getCy('show-finished').click();
    cy.getCy('show-finished input[type=checkbox]').should('be.checked');

    cy.get('.ant-card-body').should('have.length', 4);

    changeToUserOwsTab();

    cy.getCy('show-finished input[type=checkbox]').should('be.checked');
    cy.get('.ant-card-body').should('have.length', 6);

    cy.wait(500);
    cy.getCy('show-finished').click();
    cy.getCy('show-finished').click();
    cy.getCy('show-finished input[type=checkbox]').should('not.be.checked');
  });

  it('should display empty expenses list', () => {
    cy.gqlRoute('fx:expenses/empty-expenses').as('expenses');
    cy.wait('@refresh');
    cy.wait('@expenses');

    cy.contains('Wszystko ogarnięte');
    cy.contains('Pokaż historyczne wydatki').should('not.exist');

    changeToUserOwsTab();

    cy.contains('Wszystko ogarnięte');
    cy.contains('Pokaż historyczne wydatki').should('not.exist');
  });

  it('should display button when only finished expenses are present', () => {
    cy.gqlRoute('fx:expenses/finished-expenses').as('expenses');
    cy.wait('@refresh');
    cy.wait('@expenses');

    cy.contains('Wszystko ogarnięte');
    cy.contains('Pokaż historyczne wydatki');

    changeToUserOwsTab();

    cy.contains('Wszystko ogarnięte');
    cy.contains('Pokaż historyczne wydatki');

    changeToOwsUserTab();

    cy.wait(700);
    cy.contains('Pokaż historyczne wydatki').should('have.css', 'opacity', '1').click();
    cy.getCy('show-finished input[type=checkbox]').should('be.checked');

    cy.contains('Wszystko ogarnięte').should('not.exist');
    cy.contains('Pokaż historyczne wydatki').should('not.exist');

    changeToUserOwsTab();

    cy.contains('Wszystko ogarnięte').should('not.exist');
    cy.contains('Pokaż historyczne wydatki').should('not.exist');
  });
});
