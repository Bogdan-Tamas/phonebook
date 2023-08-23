import { trigger, transition, style, animate } from "@angular/animations";
import { Component, Input } from "@angular/core";
import { Contact } from "src/app/core/models/contact";

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  animations: [
    trigger(
      'slideDown', 
      [
        transition(
          ':enter', 
          [
            style({ 
              height: 0,
              opacity: 0,
              overflow: 'hidden'
            }),
            animate('100ms ease-in-out', 
              style({ 
                height: "*",
                opacity: 1,
              }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ 
              height: '*',
              overflow: 'hidden'
            }),
            animate('100ms ease-in-out', 
              style({ 
                height: 0,
              }))
          ]
        )
      ]
    ),
  ]
})
export class ContactCardComponent {
  @Input() contact!: Contact;
  editActive: boolean = false;
  
  constructor() {}

  toggleEdit(): void {
    this.editActive = !this.editActive;
  }
}