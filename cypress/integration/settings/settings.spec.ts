import { loginRoute } from '../../../src/components/navigation/routerConstants';

describe('settings', () => {
  beforeEach(() => {
    cy.setCookie('disableNotifications', 'true');
    cy.enterAnApp();
    cy.gqlRoute('fx:settings/userData').as('userData');
    cy.getCy('toolbar').contains('Profil').click();
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

    cy.get('.ant-form-item-required > .ant-btn').click();
    cy.get('#rcDialogTitle0').should('contain', 'Imię: persistent user test name');
    cy.get('.ant-modal-body input').should('have.value', 'persistent user test name');
    cy.get('.ant-modal-footer > .ant-btn-primary').click();
    cy.get('body').type('{esc}');
    // not should sent a request

    cy.get(':nth-child(3) > .ant-form-item-label > .ant-form-item-no-colon > .ant-btn').click();
    cy.get('#rcDialogTitle0').should('contain', 'Numer konta');
    cy.get('.ant-modal-body input').clear();
    cy.get('.ant-modal-footer > .ant-btn-primary').click();
    cy.contains('Nowy numer konta');
    cy.get('.ant-modal-body input').type('271140200400003002013553');
    cy.contains('Numer konta musi mieć dokładnie 26 znaków.');
    cy.get('.ant-modal-body input').clear().type('27114020040000300201355387');

    cy.gqlRoute('fx:settings/changeUserData').as('change');
    cy.get('.ant-modal-footer > .ant-btn-primary').click();
    // should send a request
  });
});

export {};
