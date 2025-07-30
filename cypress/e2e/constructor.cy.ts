/// <reference types="cypress" />

describe("интреграционные тесты: добавление ингредиентов в конструктор", () => {
  beforeEach(() => {
    cy.intercept("GET", 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept("POST", 'api/orders', { fixture: 'order.json' });
    cy.intercept("GET", 'api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('accesstestRefreshToken')
    )
    cy.setCookie('accessToken', 'accesstestRefreshToken');

    cy.viewport(1300, 800)
    cy.visit("http://localhost:4000/");
  })
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  })


  describe('Добавление булок', () => {
    it('тест: "Добавление булок"', () => {
      cy.get('[data-cy=ingredients]').contains('Добавить').click();
      cy.get('[data-cy=bun-top]').contains('Краторная булка N-200i').should('exist');
      cy.get('[data-cy=bun-bottom]').contains('Краторная булка N-200i').should('exist'); 
    })
  })

  describe('проверка работы модального окна', () => {
    beforeEach(() => {
      cy.get('[data-cy=ingredient-bun]').contains('Краторная булка N-200i').click();
      cy.get('[data-cy=modal]').should('be.visible');
    })
    
    it('открытие модального окна', () => {
      cy.get('[data-cy=modal]').should('contain', 'Краторная булка N-200i');
    })

    it('закрытие модального окна на крестик', () => {
      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    })
  })

  describe('Создание заказа', () => {
    it('тест: "Создание заказа"', () => {
      cy.contains('[data-cy=ingredient-bun]', 'Краторная булка N-200i').find('button').click();
      cy.get('[data-cy=order-button]').click();
      cy.get('[data-cy=modal]').should('be.visible').and('contain', '85195');
      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');

      cy.get('[data-cy=bun-top]').should('not.exist');
      cy.get('[data-cy=bun-bottom]').should('not.exist');

    }) 
  })

});