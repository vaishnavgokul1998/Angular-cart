import { UserDetailModel } from "../models/login/login.response.model";


export class SetToken {
    static readonly type = '[App] token';

    constructor(public jwtToken: string) {}
}

export class SetUserDetails {
    static readonly type = '[App] SetUserDetails';

    constructor(public userDetails: UserDetailModel) {}
}

export class LogOut {
    static readonly type = '[App] logout';

    constructor() {}
}