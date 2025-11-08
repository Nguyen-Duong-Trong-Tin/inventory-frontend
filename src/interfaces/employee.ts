import type IBase from "./base.interface";

interface IEmployee extends IBase {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  roleId: string;
}

export default IEmployee;
