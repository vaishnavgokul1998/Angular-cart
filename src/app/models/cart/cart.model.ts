import { Book } from "../home.response";
import { Response, ResponseCode } from "../response";

export interface CartRequest {
    bookId?: number;
    quantity?: number;
}
export interface CartListResponse extends Response {
    responseCode: ResponseCode;
    responseBody: CartList
}
export interface CartList {
    id: number;
    book: Book;
    quantity: number;
    status: string;
}
export class BillDetails {
    totalPrice!: number;
    discountPrice!: number;
    totalAmountToPay!: number;
    deliveryCharge!: number;
    tax!:number

    static calculateBillDetails(cartList: CartList[]) {
        let billDetail = new BillDetails();
        billDetail.totalPrice = cartList.reduce((acc, cur) => {
            return acc + (cur.quantity * cur.book.price);
        }, 0)
        let totalAmountforBook = cartList.reduce((acc, cur) => {
            let sellingPrice = Book.getAmountAfterDiscount(cur.book.price, cur.book.discount);
            return acc + (cur.quantity * sellingPrice);
        }, 0)
        billDetail.discountPrice = billDetail.totalPrice - totalAmountforBook;
        billDetail.deliveryCharge = 100;
        billDetail.tax = Math.floor(totalAmountforBook) * 0.18
        billDetail.totalAmountToPay = totalAmountforBook +  billDetail.deliveryCharge + Math.floor(billDetail.tax);

        return billDetail
    }
}