import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContactComponent } from "./contact.component";
import { ContactRoutingModule } from "./contact-routing.module";
import { ContactEditComponent } from "./components/contact-edit/contact-edit.component";
import { ContactViewComponent } from "./components/contact-view/contact-view.component";
import { ContactAddComponent } from "./components/contact-add/contact-add.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";

@NgModule({
  declarations: [
    ContactComponent,
    ContactEditComponent,
    ContactViewComponent,
    ContactAddComponent,
    ContactFormComponent,
  ],
  imports: [
    SharedModule,
    ContactRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ContactModule {}