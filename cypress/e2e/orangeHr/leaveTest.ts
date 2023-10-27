import employee from "../../support/API/addEmpAPI/addEmpAPI";
import login from "../../support/PageObject/login";
import GenericHepler from "../../support/helpers/genericFunctions";
import leave from "../../support/API/leaveAPI/leaveAPI";

const loginObj: login = new login();
const empObj: employee = new employee();
let firstName = "alaa" + GenericHepler.GenericRandomString();
let userId = "100" + GenericHepler.GenericRandomString();
let password = "123456a";
let empNumber;

describe("add employee via API", () => {
  beforeEach(() => {
    cy.intercept("/web/index.php/dashboard/index").as("loginpage");
    cy.visit("/");
    //admin login
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
            cy.log(empNumber, "ggg");
            // add leave Entitlements for that employee
            cy.log(empNumber);
            leave.adminAddLeaveEntitlements(empNumber);
          });
      });
    });
  });

  it(" LOGIN the user created via API ", () => {
    cy.visit("/");
    // user login
    loginObj.loginValid(firstName, password);
    //user request leave
    leave.userAddRequestLeave().then((res) => {
      const id = res.body.data.id;
      //user logout
      cy.logout();
      //admin login
      cy.visit("/");
      cy.get("@logininfo").then((logininfo: any) => {
        // admin login
        loginObj.loginValid(logininfo[0].Username, logininfo[0].Password);
        // admin aprrove reject leave
        leave.adminAprroveRejectLeave(id).then((response) => {
          //admin logout
          cy.logout();
          cy.visit("/");
          // user login
          loginObj.loginValid(firstName, password);
          cy.visit("/leave/viewMyLeaveList", { timeout: 3000 });
          //uset check leave status
          leave.leaveAssertion();
          // user logout
          // cy.logout();
          // cy.visit("/");
          // // admin login
          // loginObj.loginValid(logininfo[0].Username, logininfo[0].Password);
  
        });
      });
    });
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});
