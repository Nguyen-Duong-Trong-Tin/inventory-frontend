import type IBase from "./base.interface";

interface IRole extends IBase {
  name: string;
  description?: string;
  permisstion: string[];
}

export default IRole;
