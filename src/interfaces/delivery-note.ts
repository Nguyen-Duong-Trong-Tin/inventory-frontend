import type IBase from "./base.interface";

interface IDeliveryNote extends IBase {
  deliveryNo: string;
  date: Date;
  warehouseId: string;
  employeeId: string;
  customerId: string;
}

export default IDeliveryNote;
