import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OperationResponse, VoidOperationResponse } from "../models/operation-response";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private readonly http: HttpClient
  ) {}

  async fetchData<T>(url: string): Promise<OperationResponse<T>> {
    try{
      const response = await firstValueFrom<T>(this.http.get<T>(url));
      
      return OperationResponse.success<T>(response);
    }
    catch(e) {
      return OperationResponse.error(this.parseError(e));
    }
  }

  async sendData(url: string, data: Object): Promise<VoidOperationResponse> {
    try{
      const response = await firstValueFrom(this.http.post(url, data));
      
      return OperationResponse.success(response);
    }
    catch(e) {
      return OperationResponse.error(this.parseError(e));
    }
  }

  async updateData(url: string, data: Object): Promise<VoidOperationResponse> {
    try{
      const response = await firstValueFrom(this.http.put(url, data));
      
      return OperationResponse.success(response);
    }
    catch(e) {
      return OperationResponse.error(this.parseError(e));
    }
  }

  parseError(error: any): string {
    const httpError = error as HttpErrorResponse;
    return httpError.error.message ? httpError.error.message[0] : 'There has been an error';
  }
}