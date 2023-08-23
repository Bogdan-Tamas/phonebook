import { Component } from "@angular/core";
import { Contact } from "src/app/core/models/contact";
import { OperationResponse } from "src/app/core/models/operation-response";
import { ContactsService } from "src/app/core/services/contacts.service";

enum SearchType {
  Name = "Name",
  PhoneNumber = "PhoneNumber"
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchType: SearchType = SearchType.Name;
  searchValue: string = '';
  result: OperationResponse<Contact> | null = null;
  searchResult: Contact | null = null;

  constructor(
    private readonly contactsService: ContactsService,
  ) {}

  async search(): Promise<void> {
    if(this.searchValue == '') {
      return;
    }

    this.result = this.searchType == SearchType.Name ?
      await this.contactsService.searchByName(this.searchValue) :
      await this.contactsService.searchByPhoneNumber(this.searchValue);
    
    this.searchResult = this.result.dataOrNull;
  }
}