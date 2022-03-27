import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragToScrollComponent } from './components/shared/drag-to-scroll/drag-to-scroll.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CustomMaterialModule } from './material.module';
import { RadialProgressComponent } from './components/shared/radial-progress/radial-progress.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './store/app.state';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';

import { SharedModule } from './components/shared/shared.module';
import { LoginModule } from './components/login/login.module';
import { SignupModule } from './components/signup/signup.module';
import { SpinnerCircularModule } from 'spinners-angular/spinner-circular';
import { HomeModule } from './components/home/home.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    NgxsModule.forRoot(
      [
        AppState
      ]
    ),
    NgxsSelectSnapshotModule,
    ScrollingModule,
    SharedModule,
    LoginModule,
    SignupModule,
    HomeModule
  ],
  providers: [
    ScrollDispatcher,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
