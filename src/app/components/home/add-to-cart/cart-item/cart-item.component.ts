import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartList } from 'src/app/models/cart/cart.model';
import { CartService } from 'src/app/service/cart.service';

export enum Counter {
  INCREMENT,
  DECREMENT
}
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem!: CartList;

  @Output() qtyClickEmitter = new EventEmitter<any>();
  @Output() deleteClick = new EventEmitter<any>();

  counter = Counter;
  quantity: number = 0
  constructor(
    private snackbar: MatSnackBar,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.quantity = this.cartItem.quantity
  }

  counterClick(value: Counter,item:CartList) {
    this.qtyClickEmitter.emit({value,item})
  }

  deleteCartItem(cartItem: CartList){
    this.deleteClick.emit(cartItem)
  }
}
