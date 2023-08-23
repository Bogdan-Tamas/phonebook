import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SearchComponent } from "./search.component";
import { SearchRoutingModule } from "./search-routing.module";

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    SharedModule,
    SearchRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class SearchModule {}