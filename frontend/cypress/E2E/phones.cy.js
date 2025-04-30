describe('PhoneForm Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/phones'); // Adjust if needed
  });

  it('1. Successfully submits the form with valid data', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });

    cy.get('input[name="phoneName"]').type('iPhone 15');
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2890');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Black');
    cy.get('input[name="purchasePrice"]').type('800');
    cy.get('input[name="sellingPrice"]').type('1000');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');

    cy.screenshot('1-before-submit-success'); // 🔍 Screenshot before submit

    cy.get('button[type="submit"]').click();

    cy.get('@consoleLog').should('have.been.calledWithMatch', {
      phoneName: 'iPhone 15',
    });

    cy.screenshot('1-after-submit-success'); // ✅ Screenshot after submit
  });

  it('2. Shows validation errors when required fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Phone Name is required').should('exist');
    cy.contains('Brand is required').should('exist');
    cy.contains('Model Number is required').should('exist');
    cy.contains('Storage Capacity is required').should('exist');
    cy.contains('Color is required').should('exist');
    cy.contains('Purchase Price must be positive').should('exist');
    cy.contains('Selling Price should not be less than Purchase Price').should('exist');
    cy.contains('Quantity must be a number').should('exist');
    cy.contains('Date Added is required').should('exist');

    cy.screenshot('2-validation-errors'); // ⚠️ Screenshot with validation errors
  });

  it('3. Shows error when selling price is lower than purchase price', () => {
    cy.get('input[name="purchasePrice"]').type('900');
    cy.get('input[name="sellingPrice"]').type('800');
    cy.get('button[type="submit"]').click();

    cy.contains('Selling Price should not be less than Purchase Price').should('exist');
    cy.screenshot('3-selling-less-than-purchase'); // ⚠️ Screenshot for this error
  });

  it('4. Shows error when quantity is not a number', () => {
    cy.get('input[name="quantity"]').type('abc');
    cy.get('button[type="submit"]').click();

    cy.contains('Quantity must be a number').should('exist');
    cy.screenshot('4-invalid-quantity'); // ⚠️ Screenshot for invalid quantity
  });
});
