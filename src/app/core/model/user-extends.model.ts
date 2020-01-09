import {IRole} from "@core/model/role.model";
import {IUser} from "@core/model/user.model";
import {Gender} from "@core/model/enum/gender";

export interface IUserExtends {
  id?: number;
  username?: string;
  gender?: Gender;
  mobile?: string;
  user?: IUser;
  roles?: IRole[];
}

export class UserExtends implements IUserExtends {
  constructor(
    public id?: number,
    public username?: string,
    public gender?: Gender,
    public mobile?: string,
    public user?: IUser,
    public roles?: IRole[]
  ) {}
}
