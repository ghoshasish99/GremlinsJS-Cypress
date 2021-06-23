import { createHorde , species , strategies } from 'gremlins.js';

describe('Fuzz an application', () => {
    let horde;
    const customLogger = {
        log: function (msg) {
            console.log(msg);
        },
        info: function (msg) {
            console.log(msg);
        },
        warn: function (msg) {
            console.log(msg);
        },
        error: function (msg) {
            console.log(msg);
        },
    };

    before(() => {
        cy.visit('http://automationpractice.com/index.php');
    });

    it('Should Fuzz Contact Screen', () => {
        cy.get('#contact-link > a').click();
        cy.window().then((pageWindow) => {
            return cy.wrap(horde = createHorde({window:pageWindow,species:[species.formFiller()]}).unleash(),{
                timeout: 50000
            }).then(() => {
                cy.get('#submitMessage > span').click();
                cy.get('.alert').should('be.visible');
            });
        });
    });
  
    it('Should Fuzz Sign in Screen', () => {  
         cy.get('.login').click();
         cy.window().then((pageWindow) => {
            return cy.wrap(horde = createHorde({window:pageWindow,species:[species.formFiller()]}).unleash(),{
                timeout: 50000
            }).then(() => {
                cy.get('#SubmitLogin > span').click();
                cy.get('.alert').should('be.visible');
            });
        });              
    });

});