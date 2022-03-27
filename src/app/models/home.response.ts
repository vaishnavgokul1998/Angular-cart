import { ResponseCode } from "src/app/models/response";
import { WishList } from "./wishlist/wishlist.response";

export class Book{
    id!:number;
    isbn!:number;
    title!:string;
    subtitle!:string;
    author!:string;
    publisher!:string;
    pages!:string;
    description!:string;
    website!:string;
    published!:string;
    image_url!:string;
    price!:number;
    discount!:number;
    priceAfterDiscount!:number;
    isLiked!:string

    static getNewArray(books:Book[] , wishlist:WishList[]):Book[]{
        let newArr:Book[] = []
        books.forEach(x=>{
            let book = new Book();
            book.id = x.id;
            book.author = x.author;
            book.description = x.description;
            book.title = x.title;
            book.discount = x.discount;
            book.image_url = x.image_url;
            book.published = x.published;
            book.price = x.price;
            book.isbn = x.isbn;
            book.publisher = x.publisher;
            book.subtitle = x.subtitle;
            book.pages = x.pages;
            book.website = x.website;
            book.isLiked = this.isWishlisted(x.id,wishlist)
            book.priceAfterDiscount = this.getAmountAfterDiscount(x.price,x.discount)
            newArr.push(book)
        })
        return newArr;

    }
    static isWishlisted(id:number,wishlist:WishList[]){
       return wishlist.find(x=>x.bookId == id) ? "YES" : "NO";
    }
    static getAmountAfterDiscount(amount:number = 0 , discount:number = 0){
        let value =  amount - (amount *discount)/100;
        return Math.floor(value)
    }

}
export interface BookResponseModel extends Response{
    responseCode:ResponseCode;
    responseBody:Book[]
}