///<reference types="cypress"/>

beforeEach(() =>{
    cy.fixture('datossmoketest.json').then(function(datos){
        this.datossmoketest=datos
    cy.visit(this.datossmoketest.url)
   })   
})

describe('first test - homepage', function(){
    it('Main carousel validation', function(){
        cy.get('.active > img').should('be.visible')
        cy.get('.active > .custom > h4').should('contain','Online Banking')
        cy.get('.active > .custom > p').should('contain','Welcome to Zero Online Banking. Zero provides a greener and more convenient way to manage your money. Zero enables you to check your account balances, pay your bills, transfer money, and  keep detailed records of your transactions,  wherever there is an internet connection.')
    })
    
    it('Online banking features validation', function(){
        cy.get('#online_banking_features > :nth-child(1) > h4').should('contain','Online Banking')
        cy.get('#online_banking_features > :nth-child(1) > p').should('contain','Click the button below to view  online banking features.')
        cy.get('#account_activity_link').should('contain','Checking Account Activity')
        cy.get('#online_banking_features > :nth-child(2) > div > p').should('contain','Use Zero to view the most up-to-date listings of your deposits, withdrawals, interest payments, and a number of other useful transactions.')
        cy.get('#transfer_funds_link').should('contain','Transfer Funds')
        cy.get('#online_banking_features > :nth-child(3) > div > p').should('contain','Use Zero to safely and securely transfer funds between accounts. There is no hold placed on online money transfers, so your funds are available when you need them.')
        cy.get('#money_map_link').should('contain','My Money Map')
        cy.get('#online_banking_features > :nth-child(4) > div > p').should('contain','Use Zero to set up and monitor your personalized money map. A money map is an easy-to-use online tool that helps you manage your finances efficiently. With Money Map, you can create a budget, sort your finances into spending and savings categories,  check the interest your accounts are earning, and gain new understanding of your patterns with the help of Zero’s clear charts and graphs.')
    })
})

describe('second test - E2E test', function(){
    it('Transfer founds validation', function(){
        cy.get('#signin_button').click()
        cy.get('#user_login').type(this.datossmoketest.username)
        cy.get('#user_password').type(this.datossmoketest.password)
        cy.get('.btn').click()
        cy.get('#transfer_funds_tab > a').click()
        cy.get('#tf_fromAccountId').select(2)
        cy.get('#tf_toAccountId').select(4)
        cy.get('#tf_amount').type('500')
        cy.get('#btn_submit').click()
        cy.get('.board-header').should('contain','Transfer Money & Make Payments - Verify')
        cy.get('.board-content').should('be.visible')
        cy.get('#btn_submit').click()
        cy.get('.alert').should('contain','You successfully submitted your transaction.')
        cy.get('.board-content').should('be.visible')
    })
})

