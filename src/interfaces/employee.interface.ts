import type IBase from "./base.interface";

import { EUserOnline, EUserStatus } from "../enums/user.enum";

interface IEmployee extends IBase {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  roleId: string;
}

export default IEmployee;
