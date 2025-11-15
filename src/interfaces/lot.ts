import type IBase from "./base.interface";

interface ILot extends IBase {
  lotNumber: string;
  manufactureDate: Date;
  expiryDate: Date;
  warehouseReceiptId: string;
  productId: string;
  quantity: number;
  importPrice: number;
}

export default ILot;
