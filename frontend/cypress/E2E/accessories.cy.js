describe('Add Accessories Form Validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/addAccessories'); // Adjust the URL as needed for your application
  });

  const testData = {
    validName: 'iPhone 15 Case',
    invalidName: 'iPhone@Case!',
    validPrice: '1990',
    zeroPrice: '0',
    negativePrice: '-100',
    accessoryType: 'case',
    phoneModel: 'iphone15',
    brand: 'Spigen',
    description: 'Premium protective case for iPhone 15',
  };

  const fillValidForm = (includeImage = true) => {
    cy.get('input[name="accessoryName"]').type(testData.validName);
    cy.get('select[name="accessoryType"]').select(testData.accessoryType);
    cy.get('input[name="price"]').type(testData.validPrice);
    cy.get('select[name="phoneModel"]').select(testData.phoneModel);
    cy.get('input[name="brand"]').type(testData.brand);
  };

  it('TC01: Validate accessory name field empty', () => {
    fillValidForm(false);
    cy.get('input[name="accessoryName"]').clear();
    cy.contains('Save').click();
    cy.contains('Accessory name is required').should('be.visible');
    cy.screenshot('TC01-accessory-name-empty');
  });

  it('TC02: Validate the price field with empty value', () => {
    fillValidForm(false);
    cy.get('input[name="price"]').clear();
    cy.contains('Save').click();
    cy.contains('Price is required').should('be.visible');
    cy.screenshot('TC02-price-empty');
  });

  it('TC03: Validate the price field with negative values', () => {
    fillValidForm(false);
    cy.get('input[name="price"]').clear().type(testData.negativePrice);
    cy.contains('Save').click();
    cy.contains('Price must be positive').should('be.visible');
    cy.screenshot('TC03-price-negative');
  });

  it('TC04: Try submitting the form with all fields empty', () => {
    cy.contains('Save').click();
    cy.contains('Accessory name is required').should('be.visible');
    cy.contains('Accessory type is required').should('be.visible');
    cy.contains('Price is required').should('be.visible');
    cy.contains('Phone model is required').should('be.visible');
    cy.contains('Image is required').should('be.visible');
    cy.screenshot('TC04-all-fields-empty');
  });

  it('TC05: Validate the price field with positive values', () => {
    cy.get('input[name="price"]').type(testData.validPrice);
    cy.contains('Price must be positive').should('not.exist');
    cy.screenshot('TC05-price-positive-value');
  });

  it('TC06: Should reset the form when cancel button is clicked', () => {
    // Fill in some data
    cy.get('input[name="accessoryName"]').type(testData.validName);
    cy.get('select[name="accessoryType"]').select(testData.accessoryType);
    cy.get('input[name="price"]').type(testData.validPrice);
    
    // Take screenshot before cancel
    cy.screenshot('TC06-form-before-cancel');
    
    // Click cancel
    cy.get('button').contains('Cancel').click();
    
    // Verify fields are cleared
    cy.get('input[name="accessoryName"]').should('have.value', '');
    cy.get('select[name="accessoryType"]').should('have.value', '');
    cy.get('input[name="price"]').should('have.value', '');
    
    // Screenshot after form reset
    cy.screenshot('TC06-form-after-cancel');
  });
});