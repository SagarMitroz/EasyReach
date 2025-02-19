import { Component,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
@Component({
  selector: 'app-asset-list-table',
  standalone: true,
  imports: [CommonModule,SharedModule,AutocompleteLibModule],
  templateUrl: './asset-list-table.component.html',
  styleUrl: './asset-list-table.component.scss'
})
export class AssetListTableComponent {
  devices: any[] = [];
  searchText: string = ''; // Search input model
  selectedDevice: any = {};
  private apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/a/assetMapping';
  private updateUrl = 'https://docuquery.ai/assettracker/api/v1/c/a/s/assetMapping';

  private buUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/bu/list';
  private token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhc3NldHRyYWNraW5nIiwic3ViIjoidm9kYWZvbmUiLCJyb2xlcyI6WyJBZG1pbiJdLCJleHAiOjE3NDA3Nzg5NzUsImlhdCI6MTczOTI3ODk3NX0.nn69vAIZUoC32mU9UfIlRR4q8qmWF4uY3rh4hN01gm2oNNZ3dqZBXO_YgGiGgW-ikVUZR8pcEvan5_NFfoBlWg'; // Replace with actual token
  selectedCountry: number = 0;
  locid:number;
  keyword = 'name';
  keyword1 = 'name';
  countries: any[] = []; // Updated to hold API response
  areas: any[] = []; 



  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.fetchCountries();
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.getDevices().subscribe({
      next: (data) => {
        this.devices = data.response.filter((d)=>d.assetId!=null);
        console.log('Devices Loaded:', this.devices);
      },
      error: (err) => {
        console.error('Error fetching devices:', err);
      }
    });
  }

  getDevices(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  get filteredDevices() {
  
    return this.devices.filter(device =>
      device.assetName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (device.assetId && device.assetId.toString().includes(this.searchText.toLowerCase())) || 
      device.busUnitName?.toLowerCase().includes(this.searchText.toLowerCase())||
      (device.deviceTypeId && device.deviceTypeId.toString().includes(this.searchText.toLowerCase()))
     

    );
  }




   openModal(device: any, modalContent: TemplateRef<any>) {
      this.selectedDevice = { ...device }; 
      

      this.modalService.open(modalContent, { size: 'lg', centered: true });
    }
  
    saveChanges(modal: any) {
      console.log('Updated Device:', this.selectedDevice);
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });
  
      const body = {
      deviceId: this.selectedDevice.deviceId,
      deviceTypeId: this.selectedDevice.deviceType?.deviceTypeId, // Default to 2 if undefined
      assetId: this.selectedDevice.assetId ,
      assetName: this.selectedDevice.assetName,
      busUnitId: this.selectedCountry ,
      busUnitCode: this.selectedDevice.busUnitCode || "GC4566742",
      busUnitCustIdentifire: this.selectedDevice.busUnitCustIdentifire || "12334456",
      assetType: this.selectedDevice.assetType || 1
            
      };
  
      this.http.post(this.updateUrl, body, { headers }).subscribe({
        next: (response) => {
          console.log('Device updated successfully:', response);
          this.loadDevices();
          modal.close();
        },
        error: (error) => {
          console.error('Error updating device:', error);
        },
      });
    }





    fetchCountries() {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });
    
      this.http.get<any>(this.buUrl, { headers }).subscribe((response) => {
       
        if (response && response.response && Array.isArray(response.response)) {
          
          this.countries = response.response.map((item: any) => ({
            
            id: item.busUnitId,
            name: item.busUnitName, 
          }));
        } else {
          console.error('Unexpected API response format:', response);
        }
      });
    }


    selectEvent(country: any) {
      console.log(country); // Debugging output
      this.selectedCountry = country.id; // Store selected country ID if needed
     
     
    }
    
   
    
     
      
  
    onChangeSearch(search: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
      this.keyword = search;
    }
  
    onFocused(e) {
      // do something
    }


    getDeviceTypeLabel(deviceTypeId: number): string {
      return deviceTypeId === 5 ? 'BLE' : deviceTypeId === 6 ? 'BLE-Scanner' : 'Unknown';
    }
    
}
