describe('Página de login', () => {
  it('debería cargar la página de login', () => {
    cy.visit('/'); // Visita la raíz del proyecto
    cy.contains('Login'); // Busca texto específico en la página
    cy.get('input[name="username"]').type('tiky');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/menu');
    cy.contains('Menú Principal');
  });
});
