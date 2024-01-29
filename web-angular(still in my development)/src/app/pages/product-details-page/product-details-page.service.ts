import { Injectable } from "@angular/core";
import { data } from "../../../assets/data";
import {MyReview, ProductInterface} from "../../interfaces/interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsPageService {
    public product$: BehaviorSubject<ProductInterface> = new BehaviorSubject<ProductInterface>({} as ProductInterface);
    loadProductDetails(productId: number): void {
        const product = this.getProductById(productId);
        console.log(product);
        if (product) {
            this.product$.next(product);
        } else {
            console.error(`ERROR`);
            this.product$.next({} as ProductInterface);
        }
    }

    getProductById(productId: number): ProductInterface | null {
        const product = data.find((item) => item.id === productId);
        if (!product) {
            console.error(`ERROR`);
            return null;
        }
        return {
            ...product,
            description: product.description,
            productColors: product.color,
            selectedColor: product.color[0],
            productSizes: product.size,
            selectedSize: product.size[0],
            rating: this.calculateProductRating(product.review),
            imgUrl: product.images?.[0]?.imgUrl || '',
            review: product.review || [],
        };
    }
    loadProductDetailsAndReviews(productId: string | number): ProductInterface | null {
        const numericProductId = typeof productId === 'string' ? +productId : productId;
        const product = this.getProductById(numericProductId);
        return product ? product : null;
    }
    calculateProductRating(reviews: MyReview[]): number {
        return reviews && reviews.length > 0 ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0;
    }
}

