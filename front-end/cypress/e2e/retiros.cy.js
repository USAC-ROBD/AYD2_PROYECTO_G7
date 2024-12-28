describe('Retiros', () => {
    it('Realiza el retiro de la cuenta por un monto de 100', () => {
        cy.visit('/'); // Visita la raíz del proyecto
        cy.contains('Login'); // Busca texto específico en la página
        cy.get('input[name="username"]').type('tiky');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/menu');
        cy.contains('Menú Principal');
        cy.get('button[name="modulo-retiro"]').click();
        cy.contains('Retiro de Cuenta');
        cy.get('input[name="origenCuenta"]').type('8285710546');
        cy.get('button[name="consultar"]').click();
        cy.get('input[name="montoRetirar"]').type('100');
        cy.get('button[name="retirar"]').click();
        cy.get('button[class="swal2-confirm swal2-styled"]').click();
        cy.contains('Confirmación de Retiro');
    });
});
