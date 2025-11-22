import type IBase from "./base.interface";

interface IWeight extends IBase {
  w1: number;
  w2: number;
  w3: number;
  description: string;
  active: boolean;
}

export default IWeight;
