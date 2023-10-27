export default class leave {
  static leavePage() {
    cy.get(".oxd-sidepanel-body").contains("Leave").click();
    // cy.get(":nth-child(1) > .oxd-main-menu-item > .oxd-text");
  }
}
