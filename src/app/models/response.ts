export interface Response{
    responseCode:ResponseCode;
    responseBody:any
}
export class ResponseCode{
    code!:number;
    message!: string;
    status!: string;
}
export enum ResponseStatus{
    SUCCESS = 200,
    FAILURE = 201
}