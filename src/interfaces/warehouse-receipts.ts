import type IBase from "./base.interface";

interface IWarehouseReceipt extends IBase {
  date: Date;
  receiptNo: string;
  supplierId: string;
  warehouseId: string;
  employeeId: string;
}

export default IWarehouseReceipt;
