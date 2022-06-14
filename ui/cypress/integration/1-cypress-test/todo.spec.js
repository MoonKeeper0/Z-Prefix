

describe('log onto website', () => {
  beforeEach(() => {
   //enter website
    cy.visit('http://localhost:3000')
  })

  it('get search bar', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    
    cy.get('rux-input').shadow().contains("Students").type('oem')
    cy.get('rux-input').shadow().contains("Faculty").type('oem');
    cy.get('rux-input').shadow().contains("Class").type('oem');
    cy.get('rux-input').shadow().contains("Room").type('oem');
    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
    
  })
  it('enter a link', ()=> {
    

    cy.get('a[href*="/rooms"]').click()

  })
  it('click admin button', () => {
    //cy.visit('http://localhost:3000/admin/login')
    //cy.get('button').click()
    cy.contains('Admin Login').click()
    cy.get("input[data-testid=email-test]").type("username");

		cy.get("input[data-testid=pass-test]").type("password")
    cy.get('form button:first').click()
    //cy.get('#Main_row__-Kgmz').find('div')//.should('have.class', '')
  })
  
})
