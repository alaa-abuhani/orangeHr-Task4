import empInit from "../Init/empInit";
import userInit from "../Init/userInit";

let empNum;
let username;

const baseUrl = Cypress.config().baseUrl;
export const URLs = {
  employee: `${baseUrl}/api/v2/pim/employees`,
  user:`${baseUrl}/api/v2/admin/users`
};

export default class addUser {
  static addNewUserViaAPI() {
    cy.request({
      method:'POST',
      url:URLs.employee,
      body:empInit.InitEmp()

    }).then(response =>{
      empNum =response.body.data.empNumber;
      username=response.body.data.firstName
      cy.request({
        method:'POST',
        url:URLs.user,
        body:userInit.InitUser(username ,empNum)
  
      })


    })
  
  }
}
