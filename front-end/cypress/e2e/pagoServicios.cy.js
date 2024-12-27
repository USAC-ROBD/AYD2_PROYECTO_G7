describe('Pago de servicios', () => {
    it('debería realizar el pago de un servicio pero el servicio ya esta pagado', () => {
        cy.visit('/'); // Visita la raíz del proyecto
        cy.contains('Login'); // Busca texto específico en la página
        cy.get('input[name="username"]').type('tiky');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/menu');
        cy.contains('Menú Principal');
        cy.get('button[name="pago-servicios"]').click();
        cy.url().should('include', '/pago-servicios');
        cy.contains('Tipo de Servicio');
        cy.get('button[name="luz"]').click();
        cy.contains('Método de Pago');
        cy.get('button[name="efectivo"]').click();
        // ingresamos el codigo de servicio
        cy.get('input[name="serviceCode"]').type('2');
        cy.get('button[name="consultar"]').click();
        cy.contains('Servicio ya pagado');
    });
});
