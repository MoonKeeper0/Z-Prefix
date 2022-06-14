describe('test CRUD operations on /admin/students', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:3000/admin/students');
    })
  
    // THESE TEST THE CREATION OF A NEW FACULTY
    it('should get first input box and type a rank name', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Ranger 1st Class');    
    })
  
    it('should allow for typing in all two inputs', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Ranger 1st Class');  //rank
      cy.get('rux-input').eq(1).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(1).shadow().find('input').type('Buzz');//Firstname
      cy.get('rux-input').eq(2).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(2).shadow().find('input').type('Lightyear');//Lastname
      
      cy.get('rux-input').eq(3).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(3).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(3).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(3).shadow().find('input').type('Command@spaceforce.mil');//email
      
      cy.get('rux-input').eq(4).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(4).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(4).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(4).shadow().find('input').type('0002');//cellphone     
      
      
    })
  
    it('FINALLY should allow for typing in all four inputs then creating the new entry', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Ranger 1st Class');  //rank
      cy.get('rux-input').eq(1).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(1).shadow().find('input').type('Buzz');//Firstname
      cy.get('rux-input').eq(2).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(2).shadow().find('input').type('Lightyear');//Lastname
      
      cy.get('rux-input').eq(3).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(3).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(3).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(3).shadow().find('input').type('Command@spaceforce.mil');//email
      
      cy.get('rux-input').eq(4).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(4).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(4).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(4).shadow().find('input').type('0002');//cellphone   
      cy.get('rux-button').contains('Add New Student').click();
      cy.visit('http://localhost:3000/students')
      
      cy.get('rux-table').find('rux-table-row').should('have.length', 289)
    })
  
  // THESE TEST THE UPDATE OF A Student
  it('should be able to select from the first dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select('Ranger 1st Class Buzz Lightyear');   
    })
  
    it('should be able to select from the second dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select('Ranger 1st Class Buzz Lightyear');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('rank');
    })
  
    it('should start with the patch button disabled', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-button').contains('Disabled Until Student Selected');    
    })
  
    it('should update the text on to the button once the patch input field is written into', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select('Ranger 1st Class Buzz Lightyear');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('rank');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select(5).contains('O-3');    
      
      cy.get('rux-button').contains(/Click to Update/);    
    })
  
    it('FINALLY should update a students successfully', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select('Ranger 1st Class Buzz Lightyear');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('rank');  
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select(5).contains('O-3');     
      cy.get('rux-button').contains(/Click to Update/).click();
      //cy.get('rux-button').eq(2).click();
      cy.visit('http://localhost:3000/students')
      cy.contains('O-3')
      cy.get('rux-table').find('rux-table-row').should('have.length', 289)
    })
  
    // THESE TEST THE DELETE OF A Student
  
    it('should be able to select from the delete dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select('O-3 Buzz Lightyear');   
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
      cy.get('rux-select').eq(2).shadow().find('select').select('O-3 Buzz Lightyear');
      cy.get('rux-button').contains(/O-3/);
    })
  
    it('FINALLY should delete entry upon clicking delete button', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select('O-3 Buzz Lightyear');
      cy.get('rux-button').contains(/O-3/).click();
      //cy.get('rux-button').eq(4).click();
      cy.visit('http://localhost:3000/students')
      cy.get('rux-table').find('rux-table-row').should('have.length', 288)
    })
    
  })