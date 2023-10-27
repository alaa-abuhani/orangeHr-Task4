import login from "../../support/PageObject/login";
import vacancy from "../../support/PageObject/vacancy";
import employee from "../../support/API/addEmpAPI/addEmpAPI";
import GenericHepler from "../../support/helpers/genericFunctions";
const loginObj: login = new login();
const empObj: employee = new employee();
let firstName = "alaa" + GenericHepler.GenericRandomString();
let userId = "100" + GenericHepler.GenericRandomString();
let password = "123456a";
let empNumber;
const vacancyObj: vacancy = new vacancy();
let vacancyId: string;
let vacancyName;
let lastRow: number = 0;
const path = "cypress/fixtures/alaa.txt";

describe("vacancy functionality ", () => {
  beforeEach(() => {
    cy.intercept("/web/index.php/dashboard/index").as("loginpage");
    cy.visit("/");
    cy.fixture("login.json").as("logininfo");
    cy.fixture("employeeInfo.json").as("EmpInfo");
    cy.get("@logininfo").then((logininfo: any) => {
      loginObj.loginValid(logininfo[0].Username, logininfo[0].Password);
      // add employee account
      cy.get("@EmpInfo").then((EmpInfo: any) => {
        empObj
          .addEmloyeeViaAPI(
            firstName,
            EmpInfo.user.middleName,
            EmpInfo.user.lastName,
            EmpInfo.user.empPicture,
            userId,
            EmpInfo.user.password
          )
          .then((response) => {
            empNumber = response.body.data.employee.empNumber;

            vacancyObj.Vacany();
            const orangeHrVacancyAPIEndPoint = "/api/v2/recruitment/vacancies";
            const vacancyNewData = {
              name: "test",
              jobTitleId: 22,
              employeeId: empNumber,
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
              cy.log(
                "****************Add Vacancy Succefully***************",
                vacancyId,
                vacancyName
              );
            });
          });
      });
    });
  });
  afterEach(() => {
    const DeleteVacancyAPIEndPiont = "/api/v2/recruitment/vacancies";
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
      url: "/api/v2/recruitment/vacancies?limit=0",
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
