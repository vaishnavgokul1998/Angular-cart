import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      books: HomeResolver
    },
  },
  {
    path: 'cart',
    loadChildren: () => import('./add-to-cart/add-to-cart.module').then(m => m.AddToCartModule),
  },
  {
    path: 'profile',
    component:ProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
