describe(`Mobile view homepage testing: Chrome`, () => {
  beforeEach(() => {
    cy.viewport(412, 915); //Samsung Galaxy S20 Ultra
    cy.visit(`/`);
  });

  it(`Verify if System Logo and Name are displayed`, () => {
    //Verify that the System Name and Logo were displayed properly
    cy.get(`.navbar-brand img`)
      .invoke(`attr`, `alt`)
      .then((text) => {
        expect(text).to.contain(`FitSmallBusiness`);
      });
  });

  it(`Verify if System Logo and Name are displayed`, () => {
    //verify that search box is not displayed after navigate into homepage
    cy.get(`.site-header input[name="fit_search"]`).should(`not.be.visible`);

    //Verify that the top navbar will expand and will display the Search field after click on the search icon
    cy.get(`.searchbar-wrapper`).should(`be.visible`).click();
    cy.get(`.site-header input[name="fit_search"]`).should(`be.visible`);
  });

  it(`Verify if Side navbar is working`, () => {
    const menuTitle: string[] = ['HR', 'Retail', 'Sales', 'Marketing', 'Accounting', 'Real Estate', 'More Categories'];
    //verify that sidebar is not displayed when menu is not clicked
    cy.get(`[id="mobile-navbar"]`).should(`not.be.visible`);

    //Verify that sidebard is displayed with Menus
    cy.get(`.navbar-toggler`).should(`be.visible`).click();
    cy.get(`[id="mobile-navbar"]`).should(`be.visible`);
    cy.get(`[id="mobile-navbar"] ul[id="menu-mobile-menu"] > li >a`).each(($element, index) => {
      cy.wrap($element)
        .invoke(`attr`, `title`)
        .then((titleText) => {
          expect(titleText).to.contain(menuTitle[index]);
        });
    });
  });

  it(`Verify if "Ask your questions here" section is working`, () => {
    //Verify Ask question search input field is visible
    cy.get(`.fit-front-page-content input[name="fit_search"]`).should(`be.visible`);

    //Verify that search "HR" into the input field will lookup into the "HR" Contents
    cy.get(`.fit-front-page-content input[name="fit_search"]`).type('HR');
    cy.wait(3000);
    cy.get(`.autocomplete >ul> li`).each(($element) => {
      cy.wrap($element).should(`be.visible`);
    });
  });

  it(`Verify if Featured Articles of the Categories are displayed properly`, () => {
    //Verify that Articles are shown
    cy.get(`.fp-card--inner`).each(($element) => {
      cy.wrap($element).should(`be.visible`);
    });
  });
});
