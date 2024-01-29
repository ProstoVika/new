import {Injectable} from "@angular/core";
import {data} from "../../../assets/data";
import {Observable, of} from "rxjs";
import {ProductInterface} from "../../interfaces/interface";


@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  private data: (ProductInterface | any)[] = data;/////i've changed
  constructor() {
  }
  getData(): Observable<ProductInterface[]> {
    return of(this.data);
  }

  getProductById(id: number): ProductInterface | undefined{
    return this.data.find(product => product.id ===id)
  }

}
