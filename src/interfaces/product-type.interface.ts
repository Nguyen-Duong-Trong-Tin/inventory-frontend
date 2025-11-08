import type IBase from "./base.interface";

import { EUserOnline, EUserStatus } from "../enums/user.enum";

interface IProductType extends IBase {
  name: string;
  description?: string;
}

export default IProductType;
