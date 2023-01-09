/// <reference types="cypress" />

describe('Funcionalidade configuração de produto', () => {
  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    cy.get('[class="product-block grid"]')
      .contains('Abominable Hoodie')
      .click()
  })  

  it('Deve adicionar um produto no carrinho com sucesso', () => {  
  var quantidade = 2 

    cy.get('.button-variable-item-XS').click()
    cy.get('.button-variable-item-Blue').click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()

    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
    cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
  })

  it('Não deve permitir adicionar ao carrinho sem configurar variações do produto', () => {  
    cy.get('.single_add_to_cart_button').should('be.disabled')
  })

  it('Deve limpar configurações de variações', () => {  
      cy.get('.button-variable-item-XS').click()
      cy.get('.button-variable-item-Blue').click()
      cy.get('.input-text').clear().type('2')
      cy.get('.reset_variations').click()
      cy.get('.button-variable-item-XS').should('not.be.checked')
      cy.get('.button-variable-item-Blue').should('not.be.checked')
  })
})