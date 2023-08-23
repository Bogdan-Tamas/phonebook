import { Injectable, OnDestroy } from "@angular/core";
import { HttpService } from "./http.service";
import { Contact } from "../models/contact";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OperationResponse, VoidOperationResponse } from "../models/operation-response";

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements OnDestroy{
  private readonly contactsSnapshots: BehaviorSubject<Contact[]>;
  private readonly loadingSnapshots: BehaviorSubject<boolean>;
  private readonly contactsUrl: string;

  get snapshots$(): Observable<Contact[]> {
    return this.contactsSnapshots;
  }

  get snapshots(): Contact[] {
    return this.contactsSnapshots.value;
  }

  get loading$(): Observable<boolean> {
    return this.loadingSnapshots;
  }

  get loading(): boolean {
    return this.loadingSnapshots.value;
  }
  
  constructor(
    private readonly httpService: HttpService,
  ) {
    this.contactsSnapshots = new BehaviorSubject<Contact[]>([]);
    this.loadingSnapshots = new BehaviorSubject<boolean>(false);
    this.contactsUrl = environment.contactsUrl;
  }

  ngOnDestroy(): void {
    this.contactsSnapshots.complete();
    this.loadingSnapshots.complete();
  }

  async fetchContacts(): Promise<VoidOperationResponse> {
    if(this.loading) {
      return VoidOperationResponse.error('Operation already in progress');
    }

    this.loadingSnapshots.next(true);
    const response = await this.httpService.fetchData<Contact[]>(this.contactsUrl);
    
    if(!response.success) {
      return VoidOperationResponse.error(response.error ?? 'Error in fetching');
    }

    const contacts = response.data;
    this.contactsSnapshots.next(contacts);

    this.loadingSnapshots.next(false);
    return VoidOperationResponse.success();
  }

  async addContact(data: Contact): Promise<VoidOperationResponse> {
    const response = await this.httpService.sendData(environment.contactsUrl, data);
    
    if(!response.success) {
      return VoidOperationResponse.error(response.error ?? 'Error in adding');
    }

    return VoidOperationResponse.success();
  }
  
  async updateContact(data: Contact): Promise<VoidOperationResponse> {
    const response = await this.httpService.updateData(environment.contactsUrl + '/ids/' + data.id, data);
    
    if(!response.success) {
      return VoidOperationResponse.error(response.error ?? 'Error in updating');
    }

    return VoidOperationResponse.success();
  }

  async searchByName(name: string): Promise<OperationResponse<Contact>> {
    const response = await this.httpService.fetchData<Contact>(environment.contactsUrl + '/names/' + name);
    
    if(!response.success) {
      return OperationResponse.error(response.error ?? 'Error in fetching');
    }

    return OperationResponse.success<Contact>(response.data);
  }

  async searchByPhoneNumber(phoneNumber: string): Promise<OperationResponse<Contact>> {
    const response = await this.httpService.fetchData<Contact>(environment.contactsUrl + '/phone_numbers/' + phoneNumber);
    
    if(!response.success) {
      return OperationResponse.error(response.error ?? 'Error in fetching');
    }

    return OperationResponse.success<Contact>(response.data);
  }
}