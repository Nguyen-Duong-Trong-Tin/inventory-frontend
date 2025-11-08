import type IBase from "./base.interface";

interface ISupplier extends IBase {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export default ISupplier;
