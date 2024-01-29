import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ProductDetailsPageComponent} from "./pages/product-details-page/product-details-page.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {PagesModule} from "./pages/pages.module";
import {NgxImageZoomModule} from "ngx-image-zoom";
import {FormsModule} from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import {AdviceComponent} from "./pages/advice-page/advice.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductDetailsPageComponent,
    FooterComponent,
    CartComponent,
    AdviceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    NgxImageZoomModule,
    FormsModule,
  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
