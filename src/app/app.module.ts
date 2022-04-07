import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { SharedModule } from './components/shared/shared.module';
import { SignupModule } from './components/signup/signup.module';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { CustomMaterialModule } from './material.module';
import { AppState } from './store/app.state';

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
    HomeModule,
  ],
  providers: [
    ScrollDispatcher,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}