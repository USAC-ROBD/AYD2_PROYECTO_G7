describe('Depositos', () => {
    it('debería realizar el deposito de 100 quetzales en la cuenta del cliente', () => {
        cy.visit('/'); // Visita la raíz del proyecto
        cy.contains('Login'); // Busca texto específico en la página
        cy.get('input[name="username"]').type('tiky');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/menu');
        cy.contains('Menú Principal');
        cy.get('button[name="modulo-depositos"]').click();
        cy.contains('Deposito en Cuenta');
        cy.get('input[name="destinoCuenta"]').type('8285710546');
        cy.get('button[name="consultar"]').click();
        cy.get('select[name="moneda"]').select('GTQ');
        cy.get('input[name="monto"]').type('100');
        cy.get('input[name="cui"]').type('5315680014795');
        cy.get('button[name="depositar"]').click();
        cy.get('button[class="swal2-confirm swal2-styled"]').click();
        cy.contains('Confirmación de Depósito');
    });
});
