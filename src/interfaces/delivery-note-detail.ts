import type IBase from "./base.interface";

interface IDeliveryNoteDetail extends IBase {
  lotId: string;
  deliveryNoteId: string;
  quantity: number;
  exportPrice: number;
  lineNo: number;
}

export default IDeliveryNoteDetail;
