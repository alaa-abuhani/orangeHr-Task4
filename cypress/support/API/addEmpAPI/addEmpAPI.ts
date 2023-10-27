export default class employee {
  addEmloyeeViaAPI(
    firstName: string,
    middleName: string,
    lastName: string,
    empPicture: null,
    employeeId: string,
    password: string
  ) {
    return cy
      .request({
        method: "POST",
        url: "/api/v2/pim/employees",
        body: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          empPicture: empPicture,
          employeeId: employeeId,
        },
      })
      .then((response) => {
        expect(response).property("status").to.equal(200);
        const empNumber = response.body.data.empNumber;
        cy.request({
          method: "POST",
          url: "/api/v2/admin/users",
          body: {
            username: firstName,
            password: password,
            status: true,
            userRoleId: 2,
            empNumber: empNumber,
          },
        });
      });
  }
  deleteEmployee(id: number) {
    cy.request({
      method: "DELETE",
      url: "/web/index.php/api/v2/pim/employees",
      body: {
        ids: [id],
      },
    }).then((response) => {
      expect(response).property("status").to.equal(200);
    });
  }
}
