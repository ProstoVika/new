import {Component,  OnInit} from '@angular/core';
import {CheckoutService} from "./checkout.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../components/cart/cart.service";
import {ProductInterface} from "../../interfaces/interface";
import {BehaviorSubject, Observable} from "rxjs";


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})

export class  CheckoutComponent implements OnInit {
    checkoutForm!: FormGroup;
    currentStep: number = 1;
    private $cartItems = new BehaviorSubject<ProductInterface[]>([]);

    total: number = 0;
    get cartItems$(): Observable<ProductInterface[]> {
        return this.$cartItems.asObservable();
    }
    constructor( private fb: FormBuilder,
                 private checkoutService: CheckoutService,
                 private cartService: CartService) {}

    ngOnInit() {
        this.checkoutForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            selectedProduct: [null, Validators.required],
            address: this.fb.group({
                street: ['', Validators.required],
                city: ['', Validators.required],
                zip: ['', Validators.required],
            }),
            deliveryAddress: this.fb.group({
                country: ['', Validators.required],
                city: ['', Validators.required],
                address: ['', Validators.required],
            }),
            paymentMethod: [null, Validators.required],
        });

        this.cartService.cartItems$.subscribe((items: ProductInterface[]) => {
            this.$cartItems.next(items);
            console.log('Received cart items:', items);
            this.calculateTotal();
        });
    }

    private calculateTotal(): void {
        this.cartItems$.subscribe(items => {
            console.log(items);
            this.total = items.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0);
        });
    }

    getSubtotal(item: ProductInterface): number {
        return this.cartService.getSubtotalOne(item);
    }
    decreaseQuantity(item: ProductInterface): void {
        this.cartService.decrementQuantity(item);
     this.calculateTotal();
    }
    increaseQuantity(item: ProductInterface): void {
        this.cartService.incrementQuantity(item);
        this.calculateTotal();
    }
    removeFromCart(productId: number, selectedColor: string, selectedSize: string): void {
        console.log('Removing item from cart...');
        this.cartService.removeItem(productId, selectedColor, selectedSize);
        console.log('Item removed successfully');

    }
    nextStep() {
        if (this.currentStep < 3) {
            this.currentStep++;
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    submitOrder() {
        if (this.checkoutForm.valid) {
            const checkoutDetails = this.checkoutForm.value;
            this.checkoutService.placeCheckout(checkoutDetails);
        }
    }
}
