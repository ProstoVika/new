export interface ProductInterface {
  id: number;
  images: { imgUrl: string; alt: string }[];
  price: number;
  discount: number;
  imgUrl?: string;////////kbibkf ot
  main: boolean;
  shop: string;
  name: string;
  description: string;
  shipping: string| null;
  discountUntil: number;
  isNew: boolean;
  color: string[];
  size: string[];
  review: MyReview[];
  productColors: string[];
  selectedColor: string;
  productSizes: string[];
  selectedSize: string;
  rating?: number;


  quantity?: number;////////по ходу це ж має бути окремо
  total?: number;
}
export interface MyReview{
  author: string;
  text: string;
  rating: number;
}




