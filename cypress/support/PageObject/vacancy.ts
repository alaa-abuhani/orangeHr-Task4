export default class vacancy {
  Vacany() {
    // cy.get("oxd-sidepanel-body").contains("Recruitment").click();
    cy.get(":nth-child(5) > .oxd-main-menu-item > .oxd-text").click();
    cy.get(":nth-child(2) > .oxd-topbar-body-nav-tab-item").click();
  }
}
