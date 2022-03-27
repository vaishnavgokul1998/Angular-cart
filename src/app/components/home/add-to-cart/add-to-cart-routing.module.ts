import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartComponent } from './add-to-cart.component';
import { CartResolver } from './cart.resolver';

const routes: Routes = [
  {
    path: '',
    component: AddToCartComponent,
    resolve: {
      cartItems: CartResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddToCartRoutingModule { }
