import {Injectable} from '@angular/core';
import {map} from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class CheckoutService {

  placeCheckout(checkoutDetails: string) {
    console.log('Order placed:',checkoutDetails);
  }

}
