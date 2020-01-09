import {Gender} from "@core/model/enum/gender";

export interface IUserExtendsDTO {
  id?: number;
  username?: string;
  gender?: Gender;
  mobile?: string;
  roles?: string[];
}

export class UserExetendsDTO implements IUserExtendsDTO {
  constructor(
    public id?: number,
    public username?: string,
    public gender?: Gender,
    public mobile?: string,
    public roles?: string[]
  ) {
  }
}
