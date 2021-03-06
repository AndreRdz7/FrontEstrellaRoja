describe('CityTouristER E2E Testing', function(){
    it('Create Image', function(){
        cy.visit('http://localhost:3000/imagen')
        cy.visit('http://localhost:3000/imagen/agregar')
        cy.get('#path')
            .type('https://storage.googleapis.com/principal-arena-219118/gotcha.jpg')
            .should('have.value', 'https://storage.googleapis.com/principal-arena-219118/gotcha.jpg')
        cy.get('#desc')
            .type('Divertido lugar para pasarla con amigos, el mejor paintball de Puebla')
            .should('have.value', 'Divertido lugar para pasarla con amigos, el mejor paintball de Puebla')
        cy.contains('Crea Imagen').click()
        cy.visit('http://localhost:3000/imagen')
        cy.visit('http://localhost:3000/imagen/vinculo')
        cy.visit('http://localhost:3000/imagen/agregarvinculo')
        cy.get('#place')
            .type('196')
            .should('have.value','196')
        cy.get('#image')
            .type('20')
            .should('have.value','20')
        cy.contains('Crea Vínculo').click()  
    })
})
