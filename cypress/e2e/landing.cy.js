import { getOrders } from "../../src/apiCalls"

describe('landing', () => {
  it('As a user I should see a header "Burrito Builder", a name field, ingredients button, order status, submit button, and list of ordrs, each with a name and ingredients', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',
      {fixture: 'orders.json'}).as('getOrders')
    cy.visit('localhost:3000/')
      .get('h1').contains('Burrito Builder')
      .get('.name').should('have.attr', 'value', '')
      .get('form').find('.ingredients').should('have.length', '12')
      .get('.order-status').contains('Order: Nothing selected')
      .get('.submit-button').should('be.visible')
      .get('.App').find('.order').should('have.length', '3')
      .get('h3').first().contains('Pat')
      .get('h3').last().contains('Alex')
      .get('ul').first().find('li').should('have.length', '5').contains('beans')
      .get('ul').last().find('li').should('have.length', '5').contains('sofritas')
  })
})