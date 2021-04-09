describe("My Quiz Test", () => {
    it('should check the title', function () {
        cy.visit('http://localhost:3000')
        cy.contains("Bienvenue sur Cra'Quiz !")
    });
    it('should check the links', function () {
        cy.visit('http://localhost:3000')
        cy.contains("Administration").click()
        cy.contains("Connexion").click()
        cy.contains("S'inscrire").click()
        cy.contains("Cra'Quiz").click()
        cy.contains("Jouer").click()
        //cy.get('nav').click({ multiple: true })
    });
    it('should check answer', function () {
        cy.visit('http://localhost:3000/quiz/1/questions')
        cy.get("#1").click()
        cy.contains("Valider").click()
        cy.contains("Passer la question").click()
    });
    it('should check question and answer changing', function () {
        cy.visit('http://localhost:3000/quiz/1/questions')
        cy.get('.question').invoke('text').then((text1) => {
            // do more work here

            // click the button which changes the div's text
            cy.contains("Passer la question").click()

            // grab the div again and compare its previous text
            // to the current text
            cy.get('.question').invoke('text').should((text2) => {
                expect(text1).not.to.eq(text2)
            })
        })
        cy.get("#1").click()
        cy.contains("Valider").click()
        cy.get('.propositions').invoke('text').then((text1) => {
            // do more work here

            // click the button which changes the div's text
            cy.contains("Passer la question").click()

            // grab the div again and compare its previous text
            // to the current text
            cy.get('.propositions').invoke('text').should((text2) => {
                expect(text1).not.to.eq(text2)
            })
        })
        cy.get("#5").click()
        cy.get("#4").click()
        cy.contains("Valider").click()
        cy.contains("Passer la question").click()
        cy.contains("Il n'y a plus de questions !")
        cy.contains("5")
    });
})
