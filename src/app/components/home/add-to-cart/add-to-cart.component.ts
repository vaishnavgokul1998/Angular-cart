import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { debounce, Subject, takeUntil, timer } from 'rxjs';
import { BillDetails, CartList, CartRequest } from 'src/app/models/cart/cart.model';
import { Book } from 'src/app/models/home.response';
import { CartService } from 'src/app/service/cart.service';
import { Counter } from './cart-item/cart-item.component';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {

  cartList: CartList[] = [];

  $destroy: Subject<void> = new Subject<void>()

  billDetails: BillDetails = new BillDetails();

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartList = this.activatedRoute.snapshot.data['cartItems']?.responseBody
    if (this.cartList) {
      this.cartList.forEach(x => {
        x.book.priceAfterDiscount = Book.getAmountAfterDiscount(x.book.price, x.book.discount)
      })
      this.billDetails = BillDetails.calculateBillDetails(this.cartList);
      console.log(this.billDetails)
    }
  }

  qtyCounter(obj: any) {
    let qty = obj.item.quantity;
    if (qty >= 1) {
      if (Counter.INCREMENT == obj.value) {
        if (qty == 5) {
          this.snackbar.open("maximum quantity is 5 per book", undefined, {
            duration: 2000,
            panelClass: ['white-snackbar']
          });
          this.changeRow(obj.item, qty);
          return
        }
        qty++;
        this.changeRow(obj.item, qty);
      } else {
        if (qty == 1) {
          this.changeRow(obj.item, qty);
          return
        }
        qty--;
        this.changeRow(obj.item, qty);
      }
    }
  }

  deleteItemFromcart(item: CartList) {
    this.cartList = this.cartList.filter(res => res.id != item.id)
    this.billDetails = BillDetails.calculateBillDetails(this.cartList);
    this.cartService.deleteItem(item.id).pipe(
      takeUntil(this.$destroy)
    ).subscribe(res => {
      this.snackbar.open(res.responseCode.message, undefined, {
        duration: 2000,
        panelClass: ['white-snackbar']
      });
    })
  }
  changeRow(item: CartList, qty: number) {
    this.cartList.forEach(x => {
      if (x.id == item.id) {
        x.quantity = qty
        let req: CartRequest = {
          quantity: qty
        }
        this.cartService.updateCartItem(req, x.id).pipe(
          takeUntil(this.$destroy),
          debounce(() => timer(300))
        )
          .subscribe(res => {
            this.billDetails = BillDetails.calculateBillDetails(this.cartList);
          })
      }
    })
  }
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete()
  }

}
