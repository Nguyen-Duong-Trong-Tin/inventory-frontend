import type IBase from "./base.interface";

interface ICustomer extends IBase {
  name: string;
  phone: string;
}

export default ICustomer;
