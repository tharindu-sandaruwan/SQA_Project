describe('Staff Page - Add Staff Form', () => {
  // --- Selectors and Data remain the same ---
  const selectors = {
    firstName: '[name="firstName"]',
    lastName: '[name="lastName"]',
    address: '[name="address"]',
    age: '[name="age"]',
    birthDate: '[name="birthDate"]',
    email: '[name="email"]',
    contact: '[name="contact"]',
    genderMale: '[name="gender"][value="Male"]',
    genderFemale: '[name="gender"][value="Female"]',
    role: '[name="role"]',
    salary: '[name="salary"]',
    image: 'input[type="file"]#image-upload',
    submitButton: 'button[type="submit"]',
    successPopup: '[role="dialog"]',
    successPopupTitle: '#success-popup-title',
    successPopupDetail: '[role="dialog"] p:contains("New staff member added successfully.")',
    closePopupButton: '[role="dialog"] button:contains("Close")',
    errorMsgById: (fieldName) => `#${fieldName}-error`,
    genderErrorContainer: 'fieldset',
    imageErrorContainer: '#image-upload',
  };

  const validData = {
    firstName: 'Validfirst',
    lastName: 'Validlast',
    address: '1 Test Street, Anytown',
    age: '30',
    birthDate: '1994-05-15',
    email: 'test.valid@example.com',
    contact: '1234567890',
    gender: 'Male',
    role: 'Tester Role',
    salary: '60000.00',
  };

  const imagePath = "sample-phone.jpg";
  const invalidImagePath = "invalid.pdf";

  beforeEach(() => {
    cy.visit('http://localhost:5173/staff'); // Ensure this matches your dev server URL
  });

  // --- Helper function remains the same ---
  const getErrorFor = (inputSelector) => {
      const inputName = inputSelector.substring(inputSelector.indexOf('"') + 1, inputSelector.lastIndexOf('"'));
      return cy.get(selectors.errorMsgById(inputName));
  };

  // Test Case 1: Happy Path - Successful Submission
  it('should successfully submit the form with valid data and show success popup', () => {
    cy.get(selectors.firstName).type(validData.firstName);
    cy.get(selectors.lastName).type(validData.lastName);
    cy.get(selectors.address).type(validData.address);
    cy.get(selectors.age).type(validData.age);
    cy.get(selectors.birthDate).type(validData.birthDate);
    cy.get(selectors.email).type(validData.email);
    cy.get(selectors.contact).type(validData.contact);
    cy.get(selectors.genderMale).check({ force: true });
    cy.get(selectors.role).type(validData.role);
    cy.get(selectors.salary).type(validData.salary);
    cy.get(selectors.image).selectFile(`cypress/fixtures/${imagePath}`, { force: true });

    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture success popup ---
    // Using a custom name for clarity
    cy.screenshot('01-success-popup-displayed', { capture: 'runner' });

    // Check for success popup
    cy.get(selectors.successPopup).should('be.visible');
    cy.get(selectors.successPopupTitle).should('contain.text', 'Success!');
    cy.get(selectors.successPopupDetail).should('be.visible');

    // Check if form is cleared
    cy.get(selectors.firstName).should('have.value', '');
    cy.get(selectors.email).should('have.value', '');
    cy.get(selectors.age).should('have.value', '');
    cy.get(selectors.genderMale).should('not.be.checked');

    // Close popup
    cy.get(selectors.closePopupButton).click();
    cy.get(selectors.successPopup).should('not.exist');
  });

   // Test Case 2: Validation - Empty Submission
   it('should display validation errors for required fields when submitted empty', () => {
    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture empty form errors ---
    // Capture after submit, before assertions
    cy.screenshot('02-empty-form-errors', { capture: 'runner' });

    // Check for multiple error messages
    getErrorFor(selectors.firstName).should('be.visible').and('contain.text', 'First Name is required.');
    getErrorFor(selectors.lastName).should('be.visible').and('contain.text', 'Last Name is required.');
    getErrorFor(selectors.address).should('be.visible').and('contain.text', 'Address is required.');
    getErrorFor(selectors.age).should('be.visible').and('contain.text', 'Age is required.');
    getErrorFor(selectors.birthDate).should('be.visible').and('contain.text', 'Birth Date is required.');
    getErrorFor(selectors.email).should('be.visible').and('contain.text', 'Email is required.');
    getErrorFor(selectors.contact).should('be.visible').and('contain.text', 'Contact number is required.');
    // Gender check removed as per previous step
    getErrorFor(selectors.role).should('be.visible').and('contain.text', 'Role is required.');
    getErrorFor(selectors.salary).should('be.visible').and('contain.text', 'Salary is required.');

    cy.get(selectors.successPopup).should('not.exist');
  });

  // Test Case 3: Validation - Invalid First Name (Numbers)
  it('should display validation error for non-letter First Name', () => {
    cy.get(selectors.firstName).type('John123');
    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture invalid first name error ---
    cy.screenshot('03-invalid-first-name-error', { capture: 'runner' });

    getErrorFor(selectors.firstName)
      .should('be.visible')
      .and('contain.text', 'Only letters are allowed in First Name.');
    cy.get(selectors.successPopup).should('not.exist');
  });

  // Test Case 4: Validation - Invalid Age (Too Young)
  it('should display validation error for age less than 18', () => {
    cy.get(selectors.age).type('17');
    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture invalid age (too young) error ---
    cy.screenshot('04-invalid-age-too-young-error', { capture: 'runner' });

    getErrorFor(selectors.age)
      .should('be.visible')
      .and('contain.text', 'Age must be between 18 and 50.');
    cy.get(selectors.successPopup).should('not.exist');
  });

  // Test Case 5: Validation - Invalid Age (Too Old)
  it('should display validation error for age greater than 50', () => {
    cy.get(selectors.age).type('51');
    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture invalid age (too old) error ---
    cy.screenshot('05-invalid-age-too-old-error', { capture: 'runner' });

    getErrorFor(selectors.age)
      .should('be.visible')
      .and('contain.text', 'Age must be between 18 and 50.');
    cy.get(selectors.successPopup).should('not.exist');
  });

  // Test Case 6: Validation - Invalid Birth Date (Too Recent)
  it('should display validation error for birth date year 2005 or later', () => {
    cy.get(selectors.birthDate).type('2005-01-01');
    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture invalid birth date error ---
    cy.screenshot('06-invalid-birthdate-error', { capture: 'runner' });

    cy.get(selectors.errorMsgById('birthDate'))
       .should('be.visible')
       .and('contain.text', 'Birthdate must be before 2005.');
    cy.get(selectors.successPopup).should('not.exist');
  });

  // Test Case 7: Validation - Invalid Email Format
  it('should display validation error for invalid email format', () => {
    cy.get(selectors.email).type('invalid-email@com');
    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture invalid email error ---
    cy.screenshot('07-invalid-email-error', { capture: 'runner' });

    getErrorFor(selectors.email)
      .should('be.visible')
      .and('contain.text', 'Enter a valid email address.');
    cy.get(selectors.successPopup).should('not.exist');
  });

  // Test Case 8: Validation - Invalid Contact Number (Incorrect Length)
  it('should display validation error for contact number not equal to 10 digits', () => {
    cy.get(selectors.contact).type('12345');
    cy.get(selectors.submitButton).click();

     // --- Screenshot: Capture invalid contact length error ---
     cy.screenshot('08-invalid-contact-length-error', { capture: 'runner' });

    getErrorFor(selectors.contact)
      .should('be.visible')
      .and('contain.text', 'Contact number must be 10 digits.');
    cy.get(selectors.successPopup).should('not.exist');
  });

  // Test Case 9: Validation - Invalid Role (Numbers)
  it('should display validation error for non-letter Role', () => {
    cy.get(selectors.role).type('Manager1');
    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture invalid role error ---
    cy.screenshot('09-invalid-role-error', { capture: 'runner' });

    getErrorFor(selectors.role)
      .should('be.visible')
      .and('contain.text', 'Role should only contain letters');
    cy.get(selectors.successPopup).should('not.exist');
  });

  // Test Case 10: Validation - Invalid Image File Type
  it('should display validation error for unsupported image file type', () => {
    // Fill other required fields with valid data
    cy.get(selectors.firstName).type(validData.firstName);
    cy.get(selectors.lastName).type(validData.lastName);
    cy.get(selectors.address).type(validData.address);
    cy.get(selectors.age).type(validData.age);
    cy.get(selectors.birthDate).type(validData.birthDate);
    cy.get(selectors.email).type(validData.email);
    cy.get(selectors.contact).type(validData.contact);
    cy.get(selectors.genderFemale).check({ force: true });
    cy.get(selectors.role).type(validData.role);
    cy.get(selectors.salary).type(validData.salary);

    // Select the invalid file
    cy.get(selectors.image).selectFile(`cypress/fixtures/${invalidImagePath}`, { force: true });

    cy.get(selectors.submitButton).click();

    // --- Screenshot: Capture invalid image type error ---
    cy.screenshot('10-invalid-image-type-error', { capture: 'runner' });

    // Check for the image-specific error message
    cy.get('#image-error')
       .should('be.visible')
       .and('contain.text', 'Only JPG, JPEG, and PNG files are allowed.');

    cy.get(selectors.successPopup).should('not.exist');
   });

   // --- Optional: Image Size Limit Test (Screenshot added) ---
   // it('should display validation error for image size exceeding limit', () => {
   //    // Prerequisite: Create a large dummy file in fixtures (e.g., large-image.jpg > 5MB)
   //    const largeImagePath = 'large-image.jpg'; // Make sure this file exists and is > 5MB

   //     // Fill other required fields validly...
   //     cy.get(selectors.firstName).type(validData.firstName);
   //     cy.get(selectors.lastName).type(validData.lastName);
   //     cy.get(selectors.address).type(validData.address);
   //     cy.get(selectors.age).type(validData.age);
   //     cy.get(selectors.birthDate).type(validData.birthDate);
   //     cy.get(selectors.email).type(validData.email);
   //     cy.get(selectors.contact).type(validData.contact);
   //     cy.get(selectors.genderMale).check({ force: true });
   //     cy.get(selectors.role).type(validData.role);
   //     cy.get(selectors.salary).type(validData.salary);

   //     cy.get(selectors.image).selectFile(`cypress/fixtures/${largeImagePath}`, { force: true });
   //     cy.get(selectors.submitButton).click();

   //     // --- Screenshot: Capture image size error ---
   //     cy.screenshot('11-image-size-limit-error');

   //     cy.get(selectors.errorMsgById('image')) // Use helper which should generate #image-error
   //       .should('be.visible')
   //       .and('contain.text', 'Image size cannot exceed 5MB.');
   //     cy.get(selectors.successPopup).should('not.exist');
   // });

});