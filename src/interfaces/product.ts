import type IBase from "./base.interface";

interface IProduct extends IBase {
  name: string;
  status: string;
  unit: number;
  productTypeId: string;
}

export default IProduct;
