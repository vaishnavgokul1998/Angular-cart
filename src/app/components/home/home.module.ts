import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CustomMaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { BookListComponent } from './book-list/book-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewBookComponent } from './view-book/view-book.component';

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
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule
  ],
  entryComponents:[DialogComponent]
})
export class HomeModule { }
