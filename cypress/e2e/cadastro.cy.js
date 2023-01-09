/// <reference types="cypress" />
var faker = require('faker')

describe('Funcionalidade cadastro', () => {
  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
  })
  
  it('Deve realizar cadastro com sucesso', () => {
  let nomeFaker = faker.name.firstName()
  let sobrenomeFaker = faker.name.lastName()
  let emailFaker = faker.internet.email()

    cy.get('#reg_email').type(emailFaker)
    cy.get('#reg_password').type('Abc@123456789')
    cy.get(':nth-child(4) > .button').click()

    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    cy.get('#account_first_name').type(nomeFaker)
    cy.get('#account_last_name').type(sobrenomeFaker)
    cy.get('.woocommerce-Button').click()

    cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
  })
 
  it('Deve ver a mensagem de erro se deixar os campos vazios', () => {
    cy.get(':nth-child(4) > .button').click()
    cy.get('.woocommerce-error').should('contain', 'Erro: Informe um endereço de e-mail válido.')
  })

  it('Deve ver a mensagem de erro se inserir um e-mail inválido', () => {
    cy.get('#reg_email').type('teste@teste')
    cy.get('#reg_password').type('Abc@123456789')
    cy.get(':nth-child(4) > .button').click()
    cy.get('.woocommerce-error').should('contain', 'Erro: Informe um endereço de e-mail válido.')
  })
})