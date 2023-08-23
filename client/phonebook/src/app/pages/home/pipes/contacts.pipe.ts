import { Pipe, PipeTransform } from "@angular/core";
import { Contact } from "src/app/core/models/contact";
import { SearchQuery } from "../services/search.service";

@Pipe({ name: 'contactsPipe' })
export class ContactsPipe implements PipeTransform{
  constructor() {}

  transform(contacts: Contact[], query: SearchQuery): Contact[] {
    if(contacts.length == 0) {
      return [];
    }

    const filteredContacts = contacts.filter(
      (contact) => {
        return contact.name.toLowerCase().includes(query.name.toLowerCase()) && contact.phoneNumber.toLowerCase().includes(query.phoneNumber.toLowerCase());
      } 
    );

    return filteredContacts;
  }
}