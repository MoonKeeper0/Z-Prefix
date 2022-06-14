describe('test CRUD operations on /admin/faculty', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:3000/admin/faculty');
    })
  
    // THESE TEST THE CREATION OF A NEW FACULTY
    it('should get first input box and type a rank name', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Star Cadet');    
    })
  
    it('should allow for typing in all two inputs', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Star Cadet');  
      cy.get('rux-input').eq(1).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(1).shadow().find('input').type('Buzz');//Firstname
      cy.get('rux-input').eq(2).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(2).shadow().find('input').type('Light');//Lastname
      cy.get('rux-input').eq(3).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(3).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(3).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(3).shadow().find('input').type('Year');//Nickna,e
      cy.get('rux-input').eq(4).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(4).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(4).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(4).shadow().find('input').type('StarCommand@spaceforce.mil');//email
      cy.get('rux-input').eq(5).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(5).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(5).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(5).shadow().find('input').type('0001');//workphone
      cy.get('rux-input').eq(6).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(6).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(6).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(6).shadow().find('input').type('0002');//cellphone     
      
      
    })
  
    it('FINALLY should allow for typing in all four inputs then creating the new entry', () => {
      cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(0).shadow().find('input').type('Star Cadet');  
      cy.get('rux-input').eq(1).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(1).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(1).shadow().find('input').type('Buzz');//Firstname
      cy.get('rux-input').eq(2).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(2).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(2).shadow().find('input').type('Light');//Lastname
      cy.get('rux-input').eq(3).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(3).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(3).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(3).shadow().find('input').type('Year');//Nickna,e
      cy.get('rux-input').eq(4).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(4).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(4).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(4).shadow().find('input').type('StarCommand@spaceforce.mil');//email
      cy.get('rux-input').eq(5).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(5).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(5).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(5).shadow().find('input').type('0001');//workphone
      cy.get('rux-input').eq(6).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(6).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(6).shadow().find('input').invoke('show').should('be.visible');
      cy.get('rux-input').eq(6).shadow().find('input').type('0002');//cellphone   
      cy.get('rux-button').contains('Add New Faculty').click();
      cy.visit('http://localhost:3000/faculty')
      
      cy.get('rux-table').find('rux-table-row').should('have.length', 40)
    })
  
  // THESE TEST THE UPDATE OF A Faculty
  it('should be able to select from the first dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select(40).contains('Buzz');   
    })
  
    it('should be able to select from the second dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select(40).contains('Buzz');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(2).contains('first');
    })
  
    it('should start with the patch button disabled', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-button').contains('Disabled Until Faculty Selected');    
    })
  
    it('should update the text on to the button once the patch input field is written into', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select(40).contains('Buzz');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(2).contains('first');  
      cy.get('rux-input').eq(7).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(7).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(7).shadow().find('input').invoke('show').should('be.visible'); 
      cy.get('rux-input').eq(7).shadow().find('input').type('Zerg');  
      cy.get('rux-button').contains(/Click to Update/);    
    })
  
    it('FINALLY should update a faculty successfully', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(0).shadow().find('select').select(40).contains('Buzz');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(1).shadow().find('select').select(2).contains('first');  
      cy.get('rux-input').eq(7).shadow().find('input').invoke('width','200px');
      cy.get('rux-input').eq(7).shadow().find('input').invoke('height','20px');
      cy.get('rux-input').eq(7).shadow().find('input').invoke('show').should('be.visible'); 
      cy.get('rux-input').eq(7).shadow().find('input').type('Zerg');  
      cy.get('rux-button').contains(/Click to Update/).click();
      //cy.get('rux-button').eq(2).click();
      cy.visit('http://localhost:3000/faculty')
      cy.contains('Zerg')
      cy.get('rux-table').find('rux-table-row').should('have.length', 40)
    })
  
    // THESE TEST THE DELETE OF A Faculty
  
    it('should be able to select from the delete dropdown menu', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select(40).contains('Zerg');   
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
      cy.get('rux-select').eq(2).shadow().find('select').select(40).contains('Zerg');
      cy.get('rux-button').contains(/Zerg/);
    })
  
    it('FINALLY should delete entry upon clicking delete button', () => {
      cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
      cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
      cy.get('rux-select').eq(2).shadow().find('select').select(40).contains('Zerg');
      cy.get('rux-button').contains(/Zerg/).click();
      //cy.get('rux-button').eq(4).click();
      cy.visit('http://localhost:3000/faculty')
      cy.get('rux-table').find('rux-table-row').should('have.length', 39)
    })
    
  })