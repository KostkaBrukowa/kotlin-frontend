import { JWT_TOKEN_EXPIRY_TIME } from '../../src/components/config/authentication/useAuthentication';

describe('expense management test', () => {
  before(() => {
    cy.exec('yarn db:clear');
  });

  function logOut() {
    cy.contains('Profil').click();
    cy.contains('Wyloguj').click();
  }

  function logIn(user: number) {
    cy.wait('@graphql');

    cy.getCy('login').clear().type(`admin${user}@gmail.com`);
    cy.getCy('password input').clear().type('admin123');
    cy.getCy('submit').click();
  }

  const register = (user: number) => {
    cy.getCy('login').clear().type(`admin${user}@gmail.com`);
    cy.getCy('password input').clear().type('admin123');

    cy.getCy('login-register').click();

    cy.getCy('repeat-password input').clear().type('admin123');
    cy.getCy('name input').clear().type('admin123');
    cy.getCy('submit').click();
    cy.wait('@graphql');
  };

  const createExpense = () => {
    cy.contains('Nowy wydatek').click();
    cy.get('#name').type('Przykładowy wydatek');

    cy.contains('Znajomi').click();
    cy.contains('Znajomi').click();

    cy.get('.ant-select-selector').click();
    cy.contains('admin123').click();

    cy.get('.ant-input-number-handler-up').click();
    cy.get('.ant-input-number-handler-up').click();
    cy.get('.ant-input-number-handler-up').click();

    cy.get('#date').click();
    cy.contains('Today').click();

    cy.get('#description').type('Przykładowy opis');

    cy.contains('Utwórz wydatek').click();
  };

  const addAFriend = (user: number) => {
    cy.contains('Profil').click();
    cy.contains('Twoi znajomi').click();
    cy.contains('Nowy znajomy').click();
    cy.get('#FRIEND_EMAIL').type(`admin${user}@gmail.com`);
    cy.contains('OK').click();
  };

  beforeEach(() => {
    cy.server();
    cy.route({ method: 'POST', url: 'http://localhost:8080/graphql' }).as('graphql');
  });

  it('should be able to make and resolve expense', () => {
    // register
    cy.visit('/login');
    register(1);
    logOut();
    register(2);

    // add a friend
    addAFriend(1);
    //
    // // create new expense
    createExpense();

    logOut();
    logIn(1);

    cy.contains('Ty wisisz w sumie:').click();
    cy.contains('Przykładowy opis').click();
    cy.contains('Potwierdź udział').click();
    cy.contains('OK').click();

    logOut();
    logIn(2);

    cy.contains('Inni wiszą tobie').click();
    cy.contains('Przykładowy opis').click();
    cy.contains('Potwierdź uczestników').click();
    cy.contains('OK').click();

    logOut();
    logIn(1);

    cy.contains('Ty wisisz w sumie:').click();
    cy.contains('Przykładowy opis').click();
    cy.contains('Rozlicz się').click();
    cy.contains('OK').click();

    logOut();
    logIn(2);

    cy.contains('Inni wiszą tobie').click();
    cy.contains('Przykładowy opis').click();
    cy.contains('Ukończ wydatek').click();
    cy.contains('OK').click();
  });

  it('should be able to edit expense', () => {
    // register
    cy.visit('/login');
    logIn(1);

    // create new expense
    createExpense();

    cy.contains('Wydatki').click();
    cy.contains('Przykładowy opis').click();
    cy.contains('Edytuj').click();

    cy.get('#name').clear().type('Przykładowy wydatek zmieniony');
    cy.get('#description').clear().type('Przykładowy opis zmieniony');
    cy.contains('Edytuj').click();

    cy.contains('Przykładowy wydatek zmieniony');
    cy.contains('Przykładowy opis zmieniony');
  });

  it('should be able to delete an expense', () => {
    // register
    cy.visit('/login');
    logIn(1);

    // create new expense
    cy.contains('Przykładowy opis zmieniony').click();
    cy.contains('Usuń').click();
    cy.contains('OK').click();

    cy.contains('Przykładowy wydatek zmieniony').should('not.exist');
    cy.contains('Przykładowy opis zmieniony').should('not.exist');
  });
});
