import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./contact.component";
import { ContactResolver } from "./resolvers/contact.resolver";
import { ContactEditComponent } from "./components/contact-edit/contact-edit.component";
import { ContactViewComponent } from "./components/contact-view/contact-view.component";
import { ContactAddComponent } from "./components/contact-add/contact-add.component";

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    children: [
      {
        path: 'view/:contactId',
        component: ContactViewComponent,
        resolve: {
          contact: ContactResolver,
        },
      },
      {
        path: 'edit/:contactId',
        component: ContactEditComponent,
        resolve: {
          contact: ContactResolver,
        },
      },
      {
        path: 'new',
        component: ContactAddComponent,
      }
    ]
  },
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
	providers: [ ContactResolver ],
})
export class ContactRoutingModule {
}