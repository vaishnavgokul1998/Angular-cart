import { Response, ResponseCode } from "../response";

export interface LoginResponseModel extends Response{
    responseCode: ResponseCode;
    responseBody: LoginResponse;
}
export interface LoginResponse {
    designation:string;
    dob:string;
    email:string;
    id:string;
    jwtToken:string;
    mobileNo:string;
    role:string;
    status:string;
    userName:string;
    memberJoinDate:Date;
}