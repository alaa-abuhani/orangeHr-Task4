import { ICreateEmployeePayload } from "../API/payload/empAPIPayload";
import GenericHepler from "../helpers/genericFunctions";

export default class empInit {
  static InitEmp(): ICreateEmployeePayload {
    let creatEmployeePayload: ICreateEmployeePayload = {
      employee: {
        firstName: `ala${GenericHepler.GenericRandomString()}`,
        middleName: "galeb",
        lastName: "abuhani",
        empPicture: null,
        employeeId: "1010" + GenericHepler.GenericRandomString(),
      },
    };
    return creatEmployeePayload;
  }
}
