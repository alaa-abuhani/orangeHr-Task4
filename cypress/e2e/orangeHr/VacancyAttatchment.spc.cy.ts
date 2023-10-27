import login from "../../support/PageObject/login";
import vacancy from "../../support/PageObject/vacancy";

const loginObj: login = new login();
const vacancyObj: vacancy = new vacancy();
let vacancyId: string;
let vacancyName;
let lastRow: number = 0;
const path = "cypress/fixtures/alaa.txt";

describe("vacancy functionality ", () => {
  beforeEach(() => {
    cy.intercept("/web/index.php/dashboard/index").as("loginpage");
    cy.visit("https://opensource-demo.orangehrmlive.com");
    cy.fixture("login.json").as("logininfo");
    cy.fixture("candidateInfo.json").as("candidateInfo");
    cy.get("@logininfo").then((logininfo: any) => {
      loginObj.loginValid(logininfo[0].Username, logininfo[0].Password);
    });
    vacancyObj.Vacany();
    const orangeHrVacancyAPIEndPoint =
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies";
    const vacancyNewData = {
      name: "test",
      jobTitleId: 22,
      employeeId: 55,
      numOfPositions: null,
      description: "test join our team engineer",
      status: true,
      isPublished: true,
    };
    cy.request({
      method: "POST",
      url: orangeHrVacancyAPIEndPoint,
      body: vacancyNewData,
    }).then((response) => {
      vacancyId = response.body.data.id;
      vacancyName = response.body.data.name;
      console.log(response.body.data.id, "id");
      console.log(response.body.data.name, "name");
      console.log(response, "ADD VACANCY API RESPONSE");
      cy.log(
        "****************Add Vacancy Succefully***************",
        vacancyId,
        vacancyName
      );
    });
  });
  afterEach(() => {
    const DeleteVacancyAPIEndPiont =
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies";
    const vacanyData = {
      ids: [vacancyId],
    };
    cy.request({
      method: "DELETE",
      url: DeleteVacancyAPIEndPiont,
      body: vacanyData,
    }).then((response) => {
      console.log(response, "delete");
      expect(response).property("status").to.equal(200);
    });
  });

  it("vacancy: add attachment text file", () => {
    cy.request({
      method: "GET",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies?limit=0",
    }).then((response) => {
      console.log(response, "GET response");
      lastRow = response.body.meta.total;
      cy.get(
        `:nth-child(${lastRow}) > .oxd-table-row > :nth-child(6) > .oxd-table-cell-actions > :nth-child(2) > .oxd-icon`
      ).click();
      cy.get("button").contains("Add").click();
      cy.get('input[type="file"]').selectFile(path, {
        force: true,
      });
      cy.get(".oxd-form-actions").eq(1).contains("Save").click();
      cy.get(" .oxd-table-cell:nth-child(2)").should("contain", "alaa");
    });
  });
});
