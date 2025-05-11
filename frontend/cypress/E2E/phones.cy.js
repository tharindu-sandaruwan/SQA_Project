describe('PhoneForm Component', () => {
  const imagePath = 'sample-phone.jpg'; 

  beforeEach(() => {
    cy.visit('http://localhost:5173/phones'); 
  });

  it('TC001 - Submit form with all valid inputs', () => {
    cy.get('input[name="phoneName"]').type('iPhone 14');
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();

    
      cy.screenshot('TC001-success');
  });

  it('TC002 - Submit form with empty Phone Name', () => {
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Phone Name is required').should('exist').and('be.visible');
    cy.screenshot('TC002-phone-name-required');
  });

  it('TC003 - Submit form with negative Purchase Price', () => {
    cy.get('input[name="phoneName"]').type('iPhone 14');
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('-100');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Purchase Price must be positive').should('exist').and('be.visible');
    cy.screenshot('TC003-negative-purchase-price');
  });

  it('TC004 - Submit form with empty Brand field', () => {
    cy.get('input[name="phoneName"]').type('iPhone 14');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Brand is required').should('exist').and('be.visible');
    cy.screenshot('TC004-brand-required');
  });

  it('TC005 - Selling Price less than Purchase Price', () => {
    cy.get('input[name="phoneName"]').type('iPhone 14');
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('800');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('Selling Price should not be less than Purchase Price').should('be.visible');
    cy.screenshot('TC005-selling-price-less');
  });

  it('TC006 - Submit form with invalid data type in Quantity', () => {
    cy.get('input[name="phoneName"]').type('iPhone 14');
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('Ten');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Quantity must be a number').should('exist').and('be.visible');
    cy.screenshot('TC006-quantity-invalid');
  });

  it('TC007 - Submit form with 0 in Warranty Period', () => {
    cy.get('input[name="phoneName"]').type('iPhone 14');
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('0');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Warranty Period must be greater than 0').should('exist').and('be.visible');
    cy.screenshot('TC007-warranty-zero');
  });

  it('TC008 - Submit form with missing Condition', () => {
    cy.get('input[name="phoneName"]').type('iPhone 14');
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('12');
    // Condition not selected
    cy.get('input[name="storageCapacity"]').type('128GB');
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('Condition is required').should('be.visible');
    cy.screenshot('TC008-condition-required');
  });

  it('TC009 - Submit form with empty Storage Capacity', () => {
    cy.get('input[name="phoneName"]').type('iPhone 14');
    cy.get('input[name="brand"]').type('Apple');
    cy.get('input[name="modelNumber"]').type('A2649');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    // Skip Storage Capacity
    cy.get('input[name="color"]').type('Midnight');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="dateAdded"]').type('2025-04-30');
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Storage Capacity is required').should('exist').and('be.visible');
    cy.screenshot('TC009-storage-capacity-required');
  });

  it('TC010 - Submit form with empty Date Added field', () => {
    cy.get('input[name="phoneName"]').type('Samsung Galaxy A12');
    cy.get('input[name="brand"]').type('Samsung');
    cy.get('input[name="modelNumber"]').type('A125F');
    cy.get('input[name="warrantyPeriod"]').type('12');
    cy.get('select[name="condition"]').select('New');
    cy.get('input[name="storageCapacity"]').type('64');
    cy.get('input[name="color"]').type('Black');
    cy.get('input[name="purchasePrice"]').type('1000');
    cy.get('input[name="sellingPrice"]').type('1200');
    cy.get('input[name="quantity"]').type('5');
    // Skip dateAdded
    cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Date Added is required').should('exist').and('be.visible');
    cy.screenshot('TC010-date-added-required');
  });
  
});
