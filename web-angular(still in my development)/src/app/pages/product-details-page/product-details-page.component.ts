import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
import { ProductInterface} from "../../interfaces/interface";
import {ActivatedRoute} from "@angular/router";
import {ProductDetailsPageService} from "./product-details-page.service";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {CartService} from "../../components/cart/cart.service";


@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss'],
})

export class ProductDetailsPageComponent implements OnInit, OnDestroy {
  public product$: BehaviorSubject<ProductInterface>;
  private lastProduct: ProductInterface = {} as ProductInterface;
  private destroy$ = new Subject<void>();

  @ViewChild('loading', {static: true}) loading!: ElementRef;
  @ViewChild("view", {static: true}) view!: ElementRef;
  @ViewChild("comments") comments?: TemplateRef<any>;
  @ViewChild("ratingStars") stars?: ElementRef;
  zoomed: boolean = false;
  showFullDescription: boolean = false;
  showComments: boolean = false;
  product: ProductInterface = {} as ProductInterface;
  selectedColor: string = "";
  selectedSize: string = "";
  productRating: number = 0;
  additionalImageUrl: string = "";
  constructor(
      private route: ActivatedRoute,
      private productDetailsService: ProductDetailsPageService,
      private cartService: CartService,
  ) {
    this.product$ = this.productDetailsService.product$;
  }
  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const productIdParam = params.get('id');
      const productId = +productIdParam!;
      if (!productId) {
        return;
      }
      this.productDetailsService.loadProductDetails(productId);
    });

    this.productDetailsService.product$.subscribe((product) => {
      this.lastProduct = product;
      this.loadCommentsAndReviews();
      this.productRating = product.rating ?? 0;


      if (product.productColors && product.productColors.length > 0) {
        if (!this.selectedColor || !product.productColors.includes(this.selectedColor)) {
          this.selectedColor = product.productColors[0];
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCommentsAndReviews(): void {
    this.productDetailsService.loadProductDetailsAndReviews(this.lastProduct.id);
  }

    toggleComments() {
    this.showComments = !this.showComments;
  }

  toggleMainImage(imgUrl: string) {
    if (this.product) {
      this.additionalImageUrl = imgUrl;
    }
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  toggleZoom() {
    this.zoomed = !this.zoomed;
  }

  addToCart(): void {
    if (this.selectedColor) {
      if (this.selectedSize) {
        this.cartService.addToCart(this.lastProduct, this.selectedColor, this.selectedSize);
      } else {
        console.error('Please select a size before adding to the cart.');
      }
    } else {
      console.error('Please select a color before adding to the cart.');
    }
  }
}
