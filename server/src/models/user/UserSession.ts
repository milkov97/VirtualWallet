import { UserSessionInterface } from './../../interfaces/user/UserSessionInterface';

export class UserSession implements UserSessionInterface{
  constructor(public username: string){}
}
