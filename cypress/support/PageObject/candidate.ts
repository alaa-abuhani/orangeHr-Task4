export default class candidate {
  elements = {
    firstname: () =>
      cy.get(
        ".--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input"
      ),
    middlename: () => cy.get(":nth-child(2) > :nth-child(2) > .oxd-input"),
    lastname: () => cy.get(":nth-child(3) > :nth-child(2) > .oxd-input"),
    email: () =>
      cy.get(
        ":nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ),
  };
  addCandidate(firstName: string, middleName: string, lastName: string) {
    this.elements.firstname().type(firstName);
    this.elements.middlename().type(middleName);
    this.elements.lastname().type(lastName);
    this.elements.email().type("alaa@gmail.com");
  }
  uploadAttament(path: string, filename: string) {
    cy.get('input[type="file"]').selectFile(path, {
      force: true,
    });
    cy.get("button").contains("Save").click({ force: true });
    cy.get(".orangehrm-file-preview > .oxd-text").should("contain", filename);
  }
}
