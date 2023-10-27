export default class leave {
  static adminAddLeaveEntitlements(empNum: number) {
    cy.request({
      method: "POST",
      url: "/api/v2/leave/leave-entitlements",
      body: {
        empNumber: empNum,
        leaveTypeId: 7,
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        entitlement: "100",
      },
    }).then((res) => {
      cy.logout();
    });
  }

  static userAddRequestLeave() {
    return cy.request({
      method: "POST",
      url: "/api/v2/leave/leave-requests",
      body: {
        leaveTypeId: 7,
        fromDate: "2023-12-05",
        toDate: "2023-12-06",
        comment: null,
      },
    });
  }

  static adminAprroveRejectLeave(id: number) {
    return cy.request({
      method: "PUT",
      url: `/api/v2/leave/employees/leave-requests/${id}`,
      body: {
        action: "APPROVE",
      },
    });
  }
  static leaveAssertion() {
    cy.contains(".oxd-table-card > .oxd-table-row", "Scheduled").should(
      "exist"
    );
  }
}
