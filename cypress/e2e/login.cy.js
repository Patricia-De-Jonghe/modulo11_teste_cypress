/// <reference types="cypress" />

context('Como usuário válido', () => {
  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
  }) 

  it('Deve fazer login com sucesso', () => {
    cy.get('#username').type('patricia_ebac@mailinator.com')
    cy.get('#password').type('abc,123456789')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.page-title').contains('Minha conta')
    cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá, patricia_ebac')
  })

  it('Deve exibir mensagem de erro ao inserir endereço de email inválido', () => {
    cy.get('#username').type('emailerrado@teste.com')
    cy.get('#password').type('abc,123456789')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
  })

  it('Deve exibir mensagem de erro ao inserir senha inválida', () => {
    cy.get('#username').type('patricia_ebac@mailinator.com')
    cy.get('#password').type('abc')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.woocommerce-error').should('contain', 'Erro: a senha fornecida para o e-mail patricia_ebac@mailinator.com está incorreta. Perdeu a senha?')
  })
})