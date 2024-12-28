describe('Pago de prestamos', () => {
    it('debería realizar el pago de un prestamo parcial', () => {
        cy.visit('/'); // Visita la raíz del proyecto
        cy.contains('Login'); // Busca texto específico en la página
        cy.get('input[name="username"]').type('tiky');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/menu');
        cy.contains('Menú Principal');
        cy.get('button[name="pago-prestamos"]').click();
        cy.url().should('include', '/pago-prestamos');
        cy.contains('Método de Pago');
        cy.get('button[name="parcial"]').click();
        cy.contains('Pago de Prestamo Parcial');
        // ingresamos el codigo del prestamo
        cy.get('input[name="loanCode"]').type('1');
        cy.get('button[name="consultar"]').click();
        cy.get('input[name="amountPay"]').type('1.00');
        cy.get('input[name="cuenta"]').type('8285710546');
        cy.get('button[name="pagar"]').click();
        cy.get('button[class="swal2-confirm swal2-styled"]').click();
        cy.contains('Pago realizado con éxito');
        cy.contains('Confirmación de Pago de Prestamo Parcial');
    });
});
