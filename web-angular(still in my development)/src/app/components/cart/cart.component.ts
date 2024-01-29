import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {BehaviorSubject, map, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProductInterface} from "../../interfaces/interface";
import {Router} from "@angular/router";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<void>();
    cartItems$: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<ProductInterface[]>([]);
    isCartVisible$!: Observable<boolean>;
    total: number = 0;
    totalItemsQuantity$ = this.cartService.totalItemsQuantity$;

    constructor(private cartService: CartService, private router: Router) {
        this.isCartVisible$ = this.cartService.isCartVisible$;
    }

    ngOnInit(): void {
        this.cartService.cartItems$
            .pipe(takeUntil(this.onDestroy$)).subscribe((items) => {
            this.cartItems$.next(items);
            this.calculateTotal();
        });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    removeFromCart(productId: number, selectedColor: string, selectedSize: string): void {
        this.cartService.removeItem(productId, selectedColor, selectedSize);
        this.calculateTotal();
    }

    toggleCartVisibility(): void {
        this.cartService.cartVisibility();
    }

    private calculateTotal(): void {
        console.log(this.cartItems$.value);
        this.total = this.cartItems$.value.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    }

    decreaseQuantity(item: ProductInterface): void {
        this.cartService.decrementQuantity(item);
        this.calculateTotal();
    }

    increaseQuantity(item: ProductInterface): void {
        this.cartService.incrementQuantity(item);
        this.calculateTotal();
    }

    getSubtotal(item: ProductInterface): number {
        return this.cartService.getSubtotalOne(item);
    }

    proceedToCheckout(): void {
        this.cartService.proceedToCheckoutService();
        this.router.navigate(['/checkout']);
    }
}
