import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatRippleModule } from "@angular/material/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from "@angular/router";
import { ContactCardComponent } from "./components/contact-card/contact-card.component";
import { CommonModule } from "@angular/common";

const matComponents = [
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatRippleModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [
    NavbarComponent,
    ContactCardComponent,
  ],
  imports: [
    ...matComponents,
    RouterModule,
    CommonModule,
  ],
  exports: [
    NavbarComponent,
    ContactCardComponent,
    ...matComponents,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
  ]
})
export class SharedModule {}