import {Component, OnInit} from "@angular/core";
import {ProductInterface} from "../../interfaces/interface";
import {MainPageService} from "./main-page.service";
import {CurrencyPipe} from "@angular/common";
import {DescriptionLimitPipe} from '../../pipes/description-limit.pipe';//////int but without this import..., do not delete

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [CurrencyPipe],
})

export class MainPageComponent implements OnInit {
  products: ProductInterface[] = [];
  constructor(private dataInfo: MainPageService) {
  }

  ngOnInit(): void {
    this.dataInfo.getData().subscribe((data) => {
      this.products = data.map((product) => {
        return product;
      })
    });
  }
}

