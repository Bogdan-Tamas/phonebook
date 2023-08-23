import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";

export class SearchQuery {
  constructor(
    public readonly name: string,
    public readonly phoneNumber: string,
  ) {}

  static empty(): SearchQuery {
    return new SearchQuery('', '');
  }
}

@Injectable({providedIn: 'root'})
export class SearchService {
  private readonly searchValue: BehaviorSubject<SearchQuery>;

  get searchValue$(): Observable<SearchQuery> {
    return this.searchValue;
  }

  constructor() {
    this.searchValue = new BehaviorSubject<SearchQuery>(SearchQuery.empty());
  }

  search(value: SearchQuery): void {
    this.searchValue.next(value);
  }

  reset(): void {
    this.searchValue.next(SearchQuery.empty());
  }
}