import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Contact } from "src/app/core/models/contact";
import { ContactsService } from "src/app/core/services/contacts.service";

@Injectable()
export class ContactResolver implements Resolve<Contact | null> {
  constructor(
    private readonly contactsService: ContactsService,
  ) {}
  
  resolve(
    route: ActivatedRouteSnapshot,
  ): Contact | null {
    const contactId = route.paramMap.get('contactId');

    if(contactId == null) {
      return null;
    }

    const contact = this.contactsService.snapshots.find((contact) => contact.id == +contactId);

    return contact ?? null;
  }
}