import {NgModule} from "@angular/core";
import {MainPageComponent} from "./main-page/main-page.component";
import {ContactPageComponent} from "./contact-page/contact-page.component";
import {DescriptionLimitPipe} from "../pipes/description-limit.pipe";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MainPageComponent,
    ContactPageComponent,
    DescriptionLimitPipe,
  ],
  exports: [
    DescriptionLimitPipe,

  ],
  imports: [
    CommonModule,
    RouterModule,

  ]
})
export class PagesModule { }
