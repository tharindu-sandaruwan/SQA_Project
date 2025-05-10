describe('Add Accessories Form Validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/addAccessories');
  });

  const testData = {
    validName: 'iPhone 15 Case',
    invalidName: 'iPhone@Case!',
    validPrice: '1990',
    zeroPrice: '0',
    negativePrice: '-100',
    accessoryType: 'case',
    phoneModel: 'iphone15',
    brand: 'Spigen'
    
  };

  const fillValidForm = (includeImage = true) => {
    cy.get('input[name="accessoryName"]').type(testData.validName);
    cy.get('select[name="accessoryType"]').select(testData.accessoryType);
    cy.get('input[name="price"]').type(testData.validPrice);
    cy.get('select[name="phoneModel"]').select(testData.phoneModel);
    cy.get('input[name="brand"]').type(testData.brand);
    
    if (includeImage) {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/test-accessory-image.jpg', { force: true });
    }
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
    //cy.contains('Image is required').should('be.visible');
    cy.screenshot('TC04-all-fields-empty');
  });

  it('TC05: Validate the price field with positive values', () => {
    cy.get('input[name="price"]').type(testData.validPrice);
    cy.contains('Price must be positive').should('not.exist');
    cy.screenshot('TC05-price-positive-value');
  });

  it('TC06: Should reset the form when cancel button is clicked', () => {
    cy.get('input[name="accessoryName"]').type(testData.validName);
    cy.get('select[name="accessoryType"]').select(testData.accessoryType);
    cy.get('input[name="price"]').type(testData.validPrice);
    
    cy.screenshot('TC06-form-before-cancel');
    
    cy.get('button').contains('Cancel').click();
    
    cy.get('input[name="accessoryName"]').should('have.value', '');
    cy.get('select[name="accessoryType"]').should('have.value', '');
    cy.get('input[name="price"]').should('have.value', '');
    
    cy.screenshot('TC06-form-after-cancel');
  });

  it('TC07: Validate accessory name field with special characters', () => {
    fillValidForm(false);
    cy.get('input[name="accessoryName"]').clear().type(testData.invalidName);
    cy.contains('Save').click();
    cy.contains('No special symbols allowed').should('be.visible');
    cy.screenshot('TC07-accessory-name-special-chars');
  });

  it('TC08: Validate accessory type field empty', () => {
    fillValidForm(false);
    cy.get('select[name="accessoryType"]').select('');
    cy.contains('Save').click();
    cy.contains('Accessory type is required').should('be.visible');
    cy.screenshot('TC08-accessory-type-empty');
  });

  it('TC09: Validate phone model field empty', () => {
    fillValidForm(false);
    cy.get('select[name="phoneModel"]').select('');
    cy.contains('Save').click();
    cy.contains('Phone model is required').should('be.visible');
    cy.screenshot('TC09-phone-model-empty');
  });

  it('TC10: Submit form with all valid fields and image', () => {
    cy.writeFile('cypress/fixtures/test-accessory-image.jpg', 'binary content here', 'binary')
      .then(() => {
        fillValidForm(true);
        cy.contains('Save').click();
        cy.screenshot('TC10-all-fields-valid-with-image');
      });

  });

//   it('TC11: Validate accessory name character limit', () => {
//   const longName = 'This accessory name is way too long and exceeds the limit';
//   cy.get('input[name="accessoryName"]').type(longName);
//   cy.contains('Save').click();
//   cy.contains('Name cannot exceed 20 characters').should('be.visible');
//   cy.screenshot('TC11-name-too-long');
// });
  
});