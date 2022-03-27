import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AddToCartRoutingModule } from './add-to-cart-routing.module';
import { AddToCartComponent } from './add-to-cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';


@NgModule({
    imports: [
       CommonModule,
       CustomMaterialModule,
       SharedModule,
       AddToCartRoutingModule,
       
    ],
    exports: [],
    declarations: [
      AddToCartComponent,
      CartItemComponent,
      BillDetailComponent,
    ],
    providers: [],
})
export class AddToCartModule { }
