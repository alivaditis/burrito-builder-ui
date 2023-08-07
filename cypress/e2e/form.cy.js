describe('form', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders',
      {fixture: 'post.json'}).as('postOrder')
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',
      {fixture: 'orders.json'}).as('getOrders')
    cy.visit('localhost:3000/')
  })
  
  it('as a user i should be able to add a name and ingredients to an order, submit that order, and see it reflected in the list of orders', () => {
    cy.get('.name').type('Alec')
      .get('.name').should('have.value', 'Alec')
      .get('.ingredients').eq('1').click()
      .get('.order-status').contains('Order: steak')
      .get('.submit-button').click()
      .get('.App').find('.order').should('have.length', '4')
  })

  it('as a user I should not be able to submit an order if I have not provided a name and at least one ingredient', () => {
    cy.get('.submit-button').click()
      .get('.fields-error').should('be.visible').contains('Add a name and at least one ingredient before submitting')
  })

  it('as a user I should not be able to submit an order if I have provided a name but not at least one ingredient', () => {
    cy.get('.name').type('Alec')
      .get('.name').should('have.attr', 'value', 'Alec')
      .get('.submit-button').click()
      .get('.fields-error').should('be.visible').contains('Add a name and at least one ingredient before submitting')
  })

  it('as a user I should not be able to submit an order if I have provided at least one ingredient but not a name', () => {
    cy.get('.ingredients').eq(1).click()
      .get('.order-status').contains('Order: steak')
      .get('.submit-button').click()
      .get('.fields-error').should('be.visible').contains('Add a name and at least one ingredient before submitting')
  })
  
})