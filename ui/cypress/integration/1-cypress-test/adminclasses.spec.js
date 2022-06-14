describe('test CRUD operations on /admin/classes', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:3000/admin/classes');
    })
  
    // THESE TEST THE CREATION OF A NEW CLASS
    it('should get first input box and type a department name', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Space Rangers');    
    })
  
    it('should allow for typing in all two inputs', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Space Rangers');  
      cy.get('rux-input').eq(1).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(1).shadow().find('input').type('Infinity and Beyond'); 
      
    })
  
    it('FINALLY should allow for typing in all four inputs then creating the new entry', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Space Rangers');  
      cy.get('rux-input').eq(1).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(1).shadow().find('input').type('Infinity and Beyond'); 
      cy.get('rux-button').contains('Add New Class').click();
      cy.visit('http://localhost:3000/classes')
      cy.contains('Space Rangers')
      cy.get('rux-table').find('rux-table-row').should('have.length', 13)
    })
  
  // THESE TEST THE UPDATE OF A Class
  it('should be able to select from the first dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select(13).contains('Space Rangers');   
    })
  
    it('should be able to select from the second dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select(13).contains('Space Rangers');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('dept');
    })
  
    it('should start with the patch button disabled', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-button').contains('Disabled Until Class Selected');    
    })
  
    it('should update the text on to the button once the patch input field is written into', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select(13).contains('Space Rangers');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('dept');  
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('show').should('be.visible'); 
      cy.get('rux-input').eq(2).shadow().find('input').type('The Academy');  
      cy.get('rux-button').contains(/Click to Update/);    
    })
  
    it('FINALLY should update a class successfully', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select(13).contains('Space Rangers');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('dept');  
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('show').should('be.visible'); 
      cy.get('rux-input').eq(2).shadow().find('input').type('The Academy');  
      cy.get('rux-button').contains(/Click to Update/).click();
      //cy.get('rux-button').eq(2).click();
      cy.visit('http://localhost:3000/classes')
      cy.contains('The Academy')
      cy.get('rux-table').find('rux-table-row').should('have.length', 13)
    })
  
    // THESE TEST THE DELETE OF A CLASS
  
    it('should be able to select from the delete dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select(13).contains('The Academy');   
    })
  
    it('should have a disabled button before selecting from the delete dropdown', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-button').contains(/Disabled/);
    })
  
    it('should not have a disabled button after selecting from the delete dropdown', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select(13).contains('The Academy');
      cy.get('rux-button').contains(/Academy/);
    })
  
    it('FINALLY should delete entry upon clicking delete button', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select(13).contains('The Academy');
      cy.get('rux-button').contains(/Academy/).click();
      //cy.get('rux-button').eq(4).click();
      cy.visit('http://localhost:3000/classes')
      cy.get('rux-table').find('rux-table-row').should('have.length', 12)
    })
    
  })