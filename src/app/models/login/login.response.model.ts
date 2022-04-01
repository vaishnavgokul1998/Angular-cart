import { Response, ResponseCode } from "../response";

export interface LoginResposeModel extends Response{
    responseCode: ResponseCode;
    responseBody: LoginRespose;
}
export interface LoginRespose{
    jwtToken:string;
    loginTime:Date;
    expiredTime:Date;
}
export interface UserDetailModel extends Response{
    responseCode: ResponseCode;
    responseBody: UserDetail;
}
export interface UserDetail {
    designation:string;
    dob:string;
    email:string;
    id:string;
    mobileNo:string;
    role:string;
    status:string;
    userName:string;
    memberJoinDate:Date;
    address: Address
}

export interface Address{
    id:number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}