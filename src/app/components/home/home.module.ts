import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CustomMaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';
import { ViewBookComponent } from './view-book/view-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    ViewBookComponent,
    BookListComponent,
    DialogComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CustomMaterialModule,
    SharedModule,
    AddToCartModule,
  ],
  entryComponents:[DialogComponent]
})
export class HomeModule { }
