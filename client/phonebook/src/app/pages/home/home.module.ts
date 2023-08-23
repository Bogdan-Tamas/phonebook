import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { CommonModule } from "@angular/common";
import { ContactsPipe } from "./pipes/contacts.pipe";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    HomeComponent,
    ContactsPipe,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class HomeModule {}