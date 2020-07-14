import { loginRoute } from '../../../src/components/navigation/routerConstants';

describe('settings', () => {
  beforeEach(() => {
    cy.enterAnApp();
    cy.gqlRoute('fx:settings/userData').as('userData');
    cy.getCy('toolbar').contains('Ustawienia').click();
  });

  it('should properly logout user', () => {
    cy.wait('@userData');

    cy.gqlRoute('fx:settings/logout').as('logout');

    cy.contains('Wyloguj').click();

    cy.waitAndExpectQueryName('logOut', '@logout');
    cy.url().should('contain', loginRoute);
  });

  it('should open a modal and modify a field', () => {
    cy.wait('@userData');

    cy.get('#name > .ant-btn').click();
    cy.get('#rcDialogTitle0').should('contain', 'Imie: persistent user test name');
    cy.get('.ant-modal-body input').should('have.value', 'persistent user test name');
    cy.get('.ant-modal-footer > .ant-btn-primary').click();
    // not should sent a request

    cy.get('#bankAccount > .ant-btn').click();
    cy.get('#rcDialogTitle0').should('contain', 'Numer konta');
    cy.get('.ant-modal-footer > :nth-child(1)').click();
    // should not send a request

    cy.get('#email > .ant-btn').click();
    cy.get('#rcDialogTitle0').should('contain', 'Email');
    cy.get('.ant-modal-body input').clear();
    cy.get('.ant-modal-footer > .ant-btn-primary').click();
    cy.contains('Podaj swój email');
    cy.get('.ant-modal-body input').type('jarekGmail.com');
    cy.contains('Podaj prawidłowy email');
    cy.get('.ant-modal-body input').clear().type('jarek@gmail.com');
    cy.get('.ant-modal-footer > .ant-btn-primary').click();
    // should send a request
  });
});

export {};
