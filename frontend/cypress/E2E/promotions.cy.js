describe('PromotionForm Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/addPromotions');
    });
  
    it('TC001 - Submit form with all valid inputs', () => {
      cy.get('input[name="title"]').type('Summer Sale');
      cy.get('textarea[name="description"]').type('15% discount on all summer items');
      cy.get('select[name="productType"]').type('phone');
      cy.get('input[name="originalPrice"]').type('10000');
      cy.get('input[name="discountPercentage"]').type('10');
      cy.get('input[name="imageUrl"]').type('https://example.com/promo.jpg');
      cy.get('input[name="isLimited"]').type('true');
      cy.get('input[name="endDate"]').type('2025-08-31T08:30');
      cy.get('button[type="submit"]').click();
      cy.screenshot('TC001-successful-submission');
    });


    it('TC002 - Verify required field validation on empty form submission', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Title is required').should('be.visible');
      cy.contains('Description is required').should('be.visible');
      cy.contains('Original price is required').should('be.visible');
      cy.contains('Discount percentage is required').should('be.visible');
      cy.contains('Image URL is required').should('be.visible');
      cy.screenshot('TC002-empty-form-validation');
    });


    it('TC003 - Verify Discount Percentage value validation', () => {
      cy.get('input[name="title"]').type('Summer Sale');
      cy.get('textarea[name="description"]').type('15% discount on all summer items');
      cy.get('select[name="productType"]').type('phone');
      cy.get('input[name="originalPrice"]').type('10000');
      cy.get('input[name="discountPercentage"]').type('110');
      cy.get('input[name="imageUrl"]').type('https://example.com/promo.jpg');
      cy.get('input[name="isLimited"]').type('true');
      cy.get('input[name="endDate"]').type('2025-08-31T08:30');
      cy.get('button[type="submit"]').click();
      cy.contains('Discount must be between 0-100%').should('be.visible');
      cy.screenshot('TC003-successful-submission');
    });

  
    it('TC004 - Verify Image URL validation', () => {
      cy.get('input[name="title"]').type('Summer Sale');
      cy.get('textarea[name="description"]').type('15% discount on all summer items');
      cy.get('select[name="productType"]').type('phone');
      cy.get('input[name="originalPrice"]').type('10000');
      cy.get('input[name="discountPercentage"]').type('10');
      cy.get('input[name="imageUrl"]').type('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IR');
      cy.get('input[name="isLimited"]').type('true');
      cy.get('input[name="endDate"]').type('2025-08-31T08:30');
      cy.get('button[type="submit"]').click()
      cy.contains('URL must be a valid image URL').should('be.visible');
      cy.screenshot('TC004-empty-image-url');
    });


    it('TC005 - Verify Discounted Price Calculation', () => {
        cy.get('input[name="title"]').type('Price Calculation Test');
        cy.get('textarea[name="description"]').type('Test discount calculation');
        cy.get('select[name="productType"]').select('phone');
        cy.get('input[name="originalPrice"]').type('10000');
        cy.get('input[name="discountPercentage"]').type('10');
        cy.get('input[name="imageUrl"]').type('https://example.com/promo.jpg');
        cy.get('input[name="isLimited"]').check();
        cy.get('input[name="endDate"]').type('2025-08-31T08:00');
        cy.get('.bg-green-50')
            .should('exist')
            .and('be.visible')
            .within(() => {
              cy.contains('.text-sm', 'Calculated Discounted Price:')
                .should('exist');
              cy.contains('.text-lg', 'Rs.9000')
                .should('exist');
            });
        cy.screenshot('TC005-price-calculation');
      });


    it('TC006 - Verify End Date validation', () => {
        cy.get('input[name="title"]').type('Past Date Test');
        cy.get('textarea[name="description"]').type('Testing past date validation');
        cy.get('select[name="productType"]').select('phone');
        cy.get('input[name="originalPrice"]').type('10000');
        cy.get('input[name="discountPercentage"]').type('10');
        cy.get('input[name="imageUrl"]').type('https://example.com/promo.jpg');
        cy.get('input[name="isLimited"]').check();
        cy.get('input[name="endDate"]').type('2025-04-22T08:30');
        cy.get('button[type="submit"]').click();
        cy.contains('End date cannot be in the past').should('be.visible');
        cy.get('.success-popup').should('not.exist');
        cy.screenshot('TC006-past-end-date-validation');    
      });

      



    describe('Promotions Search Functionality', () => {
      beforeEach(() => {
        cy.visit('http://localhost:5173/promotions');
      });

      it('TC007 - Verify Search function validation', () => {
        cy.get('.relative.flex-grow input[type="text"]')
          .should('have.attr', 'placeholder', 'Search promotions...')
          .and('have.class', 'py-2')
          .and('have.class', 'pl-10')
          .and('have.value', ''); 
        const testQuery = 'sam';
        cy.get('.relative.flex-grow input[type="text"]').type(testQuery);
        cy.get('.grid.gap-6') 
          .should('contain', 'Samsung Galaxy S23 Ultra')
          .and('contain', 'Samsung Galaxy Watch 6');
        cy.get('.grid.gap-6').should('not.contain', 'iPhone 15 Pro');
    
        cy.get('.relative.flex-grow input[type="text"]')
          .clear()
          .type('nonexistentpromo');
        cy.contains('We couldn\'t find any promotions matching "nonexistentpromo"')
          .should('be.visible');
        cy.contains('Try adjusting your search or filter criteria')
          .should('be.visible');
    
        cy.get('.relative.flex-grow input[type="text"]')
          .clear()
          .type('iPhone 15@Pro');
    
        cy.get('.relative.flex-grow input[type="text"]').clear();
        cy.get('.grid.gap-6 [class*="bg-white"]').should('have.length.at.least', 8);
        cy.screenshot('TC007-search-results-displayed');
      });


      it('TC008 - Verify Add Promotions button redirects to form page', () => {
          cy.get('.flex.justify-end button')
            .should('be.visible')
            .and('contain.text', 'Add Promotions');
          cy.get('.flex.justify-end button')
            .click();
          cy.url().should('include', '/addPromotions'); 
          cy.get('h1').should('contain', 'Add New Promotion');
          cy.screenshot('TC008-add-promotion-redirect');
        });
        
        
        it('TC009 - Verify Phones button filters promotions correctly', () => {
          cy.get('button')
            .contains('Phones') 
            .parents('button') 
            .as('phoneButton')
            .should('be.visible')
          cy.get('.grid.gap-6 [class*="bg-white"]').then(($allPromos) => {
            const initialCount = $allPromos.length;
            cy.get('@phoneButton')
              .click()
        
            cy.get('.grid.gap-6 [class*="bg-white"]').each(($promo) => {
              cy.wrap($promo)
                .find('.text-xs.text-gray-500.capitalize')
                .should('contain', 'phone');
            });
        
            cy.contains('iPhone 15 Pro').should('be.visible');
            cy.contains('Samsung Galaxy S23 Ultra').should('be.visible');
            cy.contains('AirPods Pro').should('not.exist');
            cy.contains('Samsung Galaxy Watch 6').should('not.exist');
            cy.contains('button', 'All')
              .click()
              .should('have.class', 'bg-blue-600');
          });
          cy.screenshot('TC009-phone-filter-active');
        });


          it('TC010 - Verify Accessories button filters promotions correctly', () => {
            cy.get('button')
              .contains('Accessories') 
              .parents('button') 
              .as('accessoriesButton')
              .should('be.visible');
          
            cy.get('.grid.gap-6 [class*="bg-white"]').then(($allPromos) => {
              const initialCount = $allPromos.length;
              cy.get('@accessoriesButton').click();
              cy.get('.grid.gap-6 [class*="bg-white"]').each(($promo) => {
                cy.wrap($promo)
                  .find('.text-xs.text-gray-500.capitalize')
                  .invoke('text')
                  .should('match', /accessory/i); // Case-insensitive check
              });
          
              const expectedAccessories = [
                'AirPods Pro',
                'Samsung Galaxy Watch 6',
                'MagSafe Charger',
                'Pixel Buds Pro'
              ];
              expectedAccessories.forEach(item => {
                cy.contains(item).should('be.visible');
              });
          
              const expectedPhones = [
                'iPhone 15 Pro',
                'Samsung Galaxy S23 Ultra',
                'Google Pixel 8',
                'Nothing Phone (2)'
              ];
              expectedPhones.forEach(item => {
                cy.contains(item).should('not.exist');
              });
          
              cy.contains('button', 'All')
                .click()
                .should('have.class', 'bg-blue-600');
            });
            cy.screenshot('TC010-accessories-filter-active');
          });
    });
});