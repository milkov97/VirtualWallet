import { UserSessionInterface } from './../../interfaces/user/UserSessionInterface';

export class UserSession implements UserSessionInterface{
  constructor(public id: string, public username: string, public email: string){}
}
