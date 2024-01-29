import {NgModule} from "@angular/core";
import {CheckoutComponent} from "./checkout.component";
import {CommonModule} from "@angular/common";
import {CheckoutRoutingModule} from "./checkout-routing.module";
import {ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule

  ],
 /* providers: [
    CartService////////////////////I am not sure about this
  ]*/
})

export class CheckoutModule { }
