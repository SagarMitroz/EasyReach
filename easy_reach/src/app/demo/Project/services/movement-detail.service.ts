import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovementDetailService {

   private apiUrl = 'https://ondc.mesugatra.com/assettracker/api/v1/c/u/l/a/mh';  // Replace with actual API URL
  
    constructor(private http: HttpClient) {}
  
    // Method to fetch assets by siteId and locationId
    goToMovement(assetId: number,fromDate:string,toDate:string): Observable<any> {
      const body = { assetId,fromDate,toDate};  // Prepare request body
      return this.http.post<any>(this.apiUrl, body);  // Send POST request
    }
}
