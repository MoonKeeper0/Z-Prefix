describe('test CRUD operations on /admin/rooms', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin/rooms');
  })

  // THESE TEST THE CREATION OF A NEW ROOM
  it('should get first input box and type a building name', () => {
    cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(0).shadow().find('input').type('Tony Admin Building');    
  })

  it('should allow for typing in all four inputs', () => {
    cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(0).shadow().find('input').type('Tony Admin Building');  
    cy.get('rux-input').eq(1).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(1).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(1).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(1).shadow().find('input').type('The Ninja Room'); 
    cy.get('rux-input').eq(2).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(2).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(2).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(2).shadow().find('input').type('{backspace}{backspace}7');   
    cy.get('rux-input').eq(3).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(3).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(3).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(3).shadow().find('input').type('1234');
  })

  it('FINALLY should allow for typing in all four inputs then creating the new entry', () => {
    cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(0).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(0).shadow().find('input').type('Tony Admin Building');  
    cy.get('rux-input').eq(1).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(1).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(1).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(1).shadow().find('input').type('The Ninja Room'); 
    cy.get('rux-input').eq(2).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(2).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(2).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(2).shadow().find('input').type('{backspace}{backspace}7');   
    cy.get('rux-input').eq(3).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(3).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(3).shadow().find('input').invoke('show').should('be.visible');
    cy.get('rux-input').eq(3).shadow().find('input').type('1234');
    cy.get('rux-button').contains('Add New Classroom').click();
    cy.visit('http://localhost:3000/rooms')
    cy.contains('Tony Admin Building')
    cy.get('rux-table').find('rux-table-row').should('have.length', 35)
  })

// THESE TEST THE UPDATE OF A ROOM
it('should be able to select from the first dropdown menu', () => {
    cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(0).shadow().find('select').select('Tony Admin Building The Ninja Room');   
  })

  it('should be able to select from the second dropdown menu', () => {
    cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(0).shadow().find('select').contains('Tony Admin Building The Ninja Room');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('bldg');
  })

  it('should start with the patch button disabled', () => {
    cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
    cy.get('rux-button').contains('Disabled Until Room Selected');    
  })

  it('should update the text on to the button once the patch input field is written into', () => {
    cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(0).shadow().find('select').select('Tony Admin Building The Ninja Room');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('bldg');  
    cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(4).shadow().find('input').invoke('show').should('be.visible'); 
    cy.get('rux-input').eq(4).shadow().find('input').type('1234');  
    cy.get('rux-button').contains(/Click to Update/);    
  })

  it('FINALLY should update a room successfully', () => {
    cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(0).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(0).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(0).shadow().find('select').select('Tony Admin Building The Ninja Room');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(1).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(1).shadow().find('select').select(1).contains('bldg');  
    cy.get('rux-input').eq(0).shadow().find('input').invoke('width','200px');
    cy.get('rux-input').eq(0).shadow().find('input').invoke('height','20px');
    cy.get('rux-input').eq(4).shadow().find('input').invoke('show').should('be.visible'); 
    cy.get('rux-input').eq(4).shadow().find('input').type('Tony Training Building');  
    cy.get('rux-button').contains(/Click to Update/).click();
    //cy.get('rux-button').eq(2).click();
    cy.visit('http://localhost:3000/rooms')
    cy.contains('Tony Training Building')
    cy.get('rux-table').find('rux-table-row').should('have.length', 35)
  })

  // THESE TEST THE DELETE OF A ROOM

  it('should be able to select from the delete dropdown menu', () => {
    cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(2).shadow().find('select').select('Tony Training Building The Ninja Room');   
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
    cy.get('rux-select').eq(2).shadow().find('select').select('Tony Training Building The Ninja Room');
    cy.get('rux-button').contains(/Training/);
  })

  it('FINALLY should delete entry upon clicking delete button', () => {
    cy.get('rux-select').eq(0).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(2).shadow().find('select').invoke('width','200px');
    cy.get('rux-select').eq(2).shadow().find('select').invoke('height','20px');
    cy.get('rux-select').eq(2).shadow().find('select').invoke('show').should('be.visible');
    cy.get('rux-select').eq(2).shadow().find('select').select('Tony Training Building The Ninja Room');
    cy.get('rux-button').contains(/Training/).click();
    //cy.get('rux-button').eq(4).click();
    cy.visit('http://localhost:3000/rooms')
    cy.get('rux-table').find('rux-table-row').should('have.length', 34)
  })
  
})