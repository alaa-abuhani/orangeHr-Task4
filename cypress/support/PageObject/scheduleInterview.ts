export const Url =
  "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?**";

export default class scheduleInterview {
  elements = {
    scheduleInterviewBtn: () =>
      cy.get("button").contains("Schedule Interview", { timeout: 40000 }),
    interviewTitle: () => cy.get(".oxd-input", { timeout: 30000 }).eq(5),
    Interviewer: () => cy.get('[placeholder="Type for hints..."]'),
    Date: () => cy.get(".oxd-date-input"),
    saveBtn: () => cy.get("button").contains("Save"),
    interviewerInput: () => cy.get(".oxd-autocomplete-text-input > input"),
    interviewerName: () => cy.get(".oxd-autocomplete-option"),
    // checkStatus:() => cy.get('p').contains('Status: Interview Scheduled')
  };
  scheduleInterviewBtn() {
    this.elements.scheduleInterviewBtn().click({ force: true });
  }
  interviewTitle() {
    this.elements.interviewTitle().type("helojhvghfhgo");
  }
  Date() {
    this.elements.Date().type("2023-10-14");
  }
  saveBtn() {
    this.elements.saveBtn().click({ force: true });
  }
  interviewerInput() {
    this.elements.interviewerInput().type("Jacquelin" + " ");
  }
  interviewerName() {
    this.elements.interviewerName().contains("Jacquelin").click({
      force: true,
    });
  }
  scheduleInterview() {
    this.scheduleInterviewBtn();
    this.interviewTitle();
    this.interviewerInput();
    this.interviewerName();
    this.Date();
    this.saveBtn();
  }
}
