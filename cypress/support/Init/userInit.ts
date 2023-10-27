import { ICreateEmployeePayload } from "../API/payload/empAPIPayload";
import GenericHepler from "../helpers/genericFunctions";
import { ICreateUserPayload } from "../API/payload/userAPIPayload";

export default class userInit {
  static InitUser(username: string, empNum: number): ICreateUserPayload {
    let creatUserPayload: ICreateUserPayload = {
      user: {
        username: username,
        password: "123456a",
        status: true,
        userRoleId: 2,
        empNumber: empNum,
      },
    };
    return creatUserPayload;
  }
}
