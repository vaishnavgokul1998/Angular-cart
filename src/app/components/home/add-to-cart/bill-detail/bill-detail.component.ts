import { Component, Input, OnInit } from '@angular/core';
import { BillDetails, CartList } from 'src/app/models/cart/cart.model';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {

  @Input() cartList!:CartList[];
  @Input() billDetail!:BillDetails;
  constructor() { }

  ngOnInit(): void {
  }

}
