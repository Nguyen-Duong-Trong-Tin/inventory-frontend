import type IBase from "./base.interface";

interface ISuggesstion extends IBase {
  customerId: string;
  weights: {
    w1: number;
    w2: number;
    w3: number;
  };
  schemaImagePath: string;
  suggestions: {
    productId: string;
    name: string;
    productTypeId: string;
    stock_qty: 1;
    customer_qty: 0;
    global_qty: 20;
    sameTypeFlag: 0;
    score: 0.15;
    reason: string;
  }[];
}

export default ISuggesstion;
