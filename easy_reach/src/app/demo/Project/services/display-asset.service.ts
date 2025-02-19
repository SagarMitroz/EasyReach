import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DisplayAsset } from '../model/display-asset';

@Injectable({
  providedIn: 'root'
})
export class DisplayAssetService {
  private apiUrl = 'https://ondc.mesugatra.com/assettracker/api/v1/c/u/l/assets';  // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Method to fetch assets by siteId and locationId
  getAssetsByLocation(areaId: number, locationId: number): Observable<any> {
    const body = { areaId, locationId };  // Prepare request body
    return this.http.post<any>(this.apiUrl, body);  // Send POST request
  }
}
