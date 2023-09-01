import { UserLoginInterface } from "../../interfaces/user/UserLoginInterface";

export class UserLogin implements UserLoginInterface {
    constructor(public username: string, public password: string) {}
}
