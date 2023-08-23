import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Contact } from "src/app/core/models/contact";
import { ContactsService } from "src/app/core/services/contacts.service";
import { SearchQuery, SearchService } from "./services/search.service";
import { combineLatest } from "rxjs";
import { ContactsPipe } from "./pipes/contacts.pipe";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy{
  private readonly subscriptions: Subscription[] = [];
  loading: boolean = false;
  contacts: Contact[] = [];
  searchByName: string = '';
  searchByPhoneNumber: string = '';

  constructor(
    private readonly contactsService: ContactsService,
    private readonly searchService: SearchService,
  ) {}
  
  onTap(): void {
    this.searchService.search(new SearchQuery(this.searchByName, this.searchByPhoneNumber));
  }
  
  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([
        this.contactsService.snapshots$,
        this.searchService.searchValue$,
      ]).subscribe(([contacts, query]) => {
          const pipe = new ContactsPipe();
          this.contacts = pipe.transform(contacts, query);
        }
      )
    );

    this.subscriptions.push(
      this.contactsService.loading$.subscribe(
        (loading: boolean) => {
          this.loading = loading;
        }
      )
    );

    this.contactsService.fetchContacts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.length = 0;
    this.searchService.reset();
  }
}