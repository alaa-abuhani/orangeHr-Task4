/// <reference types="cypress" />

import { ICreateEmployeePayload } from "../API/payload/empAPIPayload";
import { ICreateEmpolyeeResponse } from "../API/response/empAPIResponse";

declare global {
  namespace Cypress {
    interface Chainable {
      addNewUser: (
        requestUrl: string,
        EmployeePayload: ICreateEmployeePayload
      ) => Chainable<ICreateEmpolyeeResponse>;
    }
  }
}
Cypress.Commands.add(
  "addNewUser",
  (requestUrl: string, EmployeePayload: ICreateEmployeePayload) => {
    cy.request({
      method: "POST",
      url: requestUrl,
      body: EmployeePayload,
    });
  }
);
