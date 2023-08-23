import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Contact } from "src/app/core/models/contact";
import { VoidOperationResponse } from "src/app/core/models/operation-response";
import { ContactsService } from "src/app/core/services/contacts.service";

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit{
  @Input() preselectedContact: Contact | null = null;

  contactForm!: FormGroup;
  result: VoidOperationResponse | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contactsService: ContactsService,
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: [this.preselectedContact?.name ?? '', Validators.required],
      phoneNumber: [this.preselectedContact?.phoneNumber ?? '', Validators.required],
      organization: [this.preselectedContact?.organization ?? ''],
      email: [this.preselectedContact?.email ?? '', [Validators.email, Validators.pattern("^[A-Za-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
  }

  async submitForm(): Promise<void> {
    if(!this.contactForm.valid) {
      return;
    }

    this.result = null;

    if(this.preselectedContact == null) {
      const data: Contact = {
        'name': this.contactForm.value.name,
        'phoneNumber': this.contactForm.value.phoneNumber,
        'organization': this.contactForm.value.organization,
        'email': this.contactForm.value.email,
      } as Contact;
  
      this.result = await this.contactsService.addContact(data);
    } else {
      const data: Contact = {
        'id' : this.preselectedContact.id,
        'name': this.contactForm.value.name,
        'phoneNumber': this.contactForm.value.phoneNumber,
        'organization': this.contactForm.value.organization,
        'email': this.contactForm.value.email,
      } as Contact;

      this.result = await this.contactsService.updateContact(data);
    }
  }
}