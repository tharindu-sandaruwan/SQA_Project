describe("StaffPage Form Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/staff"); // Update the path based on your routing setup
    });
  
    it("should show error messages for invalid or empty inputs", () => {
      cy.get('button[type="submit"]').click();
      
      cy.screenshot("InvalidInputs"); // Take a screenshot after submission
      
      cy.contains("Only letters are allowed in First Name.").should("be.visible");
      cy.contains("Only letters are allowed in Last Name.").should("be.visible");
      cy.contains("Age must be between 18 and 50.").should("be.visible");
      cy.contains("Enter a valid email address.").should("be.visible");
      cy.contains("Contact number must be 10 digits.").should("be.visible");
    });
  
    it("should successfully submit the form with valid data", () => {
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('input[name="address"]').type("123 Main St");
      cy.get('input[name="age"]').type("25");
      cy.get('input[name="birthDate"]').type("2000-01-01");
      cy.get('input[name="email"]').type("john.doe@example.com");
      cy.get('input[name="contact"]').type("1234567890");
      cy.get('input[name="role"]').type("Manager");
      cy.get('input[name="salary"]').type("50000");
      cy.get('input[name="gender"]').check("Male");
  
      cy.screenshot("FormFilled"); // Take a screenshot after filling the form
      
      cy.get('button[type="submit"]').click();
      
      cy.contains("Staff added successfully!").should("be.visible");
      
      cy.screenshot("SuccessfulSubmission"); // Take a screenshot after successful submission
    });
  
    it("should handle gender radio button selection", () => {
      cy.get('input[name="gender"][value="Male"]').check().should("be.checked");
      cy.screenshot("GenderMaleSelected"); // Screenshot when Male is selected
      
      cy.get('input[name="gender"][value="Female"]').check().should("be.checked");
      cy.screenshot("GenderFemaleSelected"); // Screenshot when Female is selected
    });
  });
  