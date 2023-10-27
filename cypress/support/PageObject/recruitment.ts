export const Url =
  "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?**";

export default class recruitment {
  elements = {
    recruitment: () => cy.contains("span", "Recruitment"),
    table: () => cy.get(".oxd-table-body"),
  };
  recruitmentPage() {
    this.elements.recruitment().click();
  }
  UrlIntercept() {
    return Url;
  }
  checkTableRowsNumber(l: number) {
    this.elements.table().children().should("have.length", l);
  }
}
