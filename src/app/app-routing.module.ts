import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { ListComponent } from './content/goods/list/list.component';
import { PressComponent } from './content/press/press.component';
import { AboutComponent } from './content/about/about.component';
import {CartCheckoutComponent} from './shop/cart-checkout/cart-checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ListComponent },
  { path: 'press', component: PressComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: HomeComponent },
  { path: 'cart', component: CartCheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
