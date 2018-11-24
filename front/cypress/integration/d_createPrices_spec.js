describe('CityTouristER E2E Testing',function(){
    it('Create Prices',function(){
      cy.get('#precio').click();
      cy.contains('Agregar').click()
      cy.visit('http://localhost:3000/precio/agregar')
      cy.get('#ticket').select('11')
      cy.get('#tour').select('24')
      cy.get('#amount')
        .type('365')
        .should('have.value', '365')
      cy.contains('Crea Precio').click()
      
      cy.contains('Agregar')
      cy.visit('http://localhost:3000/precio/agregar')
      cy.get('#ticket').select('18')
      cy.get('#tour').select('24')
      cy.get('#amount')
        .type('375')
        .should('have.value', '375')
      cy.contains('Crea Precio').click()

      cy.contains('Agregar')
      cy.visit('http://localhost:3000/precio/agregar')
      cy.get('#ticket').select('21')
      cy.get('#tour').select('24')
      cy.get('#amount')
        .type('375')
        .should('have.value', '375')
      cy.contains('Crea Precio').click()
    })
})