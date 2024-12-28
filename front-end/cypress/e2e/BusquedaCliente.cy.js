describe('Busqueda de Cliente', () => {
    it('Debe buscar un cliente por cui y mostrar la información del cliente y sus transacciones', () => {
        cy.visit('/'); // Visita la raíz del proyecto
        cy.contains('Login'); // Busca texto específico en la página
        cy.get('input[name="username"]').type('tiky');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/menu');
        cy.contains('Menú Principal');
        cy.get('button[name="modulo-consultas"]').click();
        cy.contains('Módulo de Consultas');
        cy.get('button[name="busqueda-cliente"]').click();
        cy.contains('Busqueda Cliente');
        cy.get('input[name="serviceCode"]').type('5315680014795');
        cy.get('button[name="consultar1"]').click();
        cy.contains('Información del Cliente');
        cy.contains('CUI: 5315680014795');
        cy.contains('Historial de Transacciones');
    });
});
