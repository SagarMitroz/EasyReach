
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddLocationComponent } from './add-location/add-location.component';
import { Component, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MapPopupComponent } from './map-popup/map-popup.component';
@Component({
  selector: 'app-location',
  standalone: true,
  imports:[CommonModule,
    AddLocationComponent,SharedModule,MapPopupComponent
  ],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']  // Corrected 'styleUrl' to 'styleUrls'
})
export class LocationComponent {
  devices: any[] = [];
   searchText: string = ''; // Search input model
   selectedDevice: any = {};
   currentPage: number = 1;
 pageSize: number = 10;
 
   private apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/locAreaMap';
   private updateUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/a/update';

   private token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhc3NldHRyYWNraW5nIiwic3ViIjoidm9kYWZvbmUiLCJyb2xlcyI6WyJBZG1pbiJdLCJleHAiOjE3NDIzMDcwMDAsImlhdCI6MTc0MDgwNzAwMH0.NkRItuKT4ILXrCl4YZNkhJjXe0iWbU4yLKvZ4ChpwEu2NEFFwadyj5ku0AoHUyHMTYNugVuVvwBFV7vPDQbwoQ'; // Replace with actual token
 
   constructor(private http: HttpClient, private modalService: NgbModal) {}
 
   ngOnInit(): void {
     this.loadDevices();
   }
 
   loadDevices(): void {
     this.getDevices().subscribe({
      
       next: (data) => {
         this.devices = data.response.reverse();
         
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
    const search = this.searchText?.toLowerCase() || ''; // Ensure searchText is not undefined
    return this.devices.filter(device =>
      device.locationName?.toLowerCase().includes(search) ||
      device.locationTag?.toLowerCase().includes(search) ||
      device.areaName?.toLowerCase().includes(search) ||
      device.areaTag?.toLowerCase().includes(search)
    );
  }
 
   get paginatedDevices() {
     const startIndex = (this.currentPage - 1) * this.pageSize;
     const endIndex = startIndex + this.pageSize;
     return this.filteredDevices.slice(startIndex, endIndex);
   }
   
 
   nextPage() {
     if ((this.currentPage * this.pageSize) < this.filteredDevices.length) {
       this.currentPage++;
     }
   }
   
   prevPage() {
     if (this.currentPage > 1) {
       this.currentPage--;
     }
   }
   
   get totalPages(): number {
     return Math.ceil(this.filteredDevices.length / this.pageSize);
   }
 
   getPaginationNumbers(): number[] {
     return Array.from({ length: this.totalPages }, (_, i) => i + 1);
   }
   
   goToPage(page: number) {
     this.currentPage = page;
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
     
      locationId:this.selectedDevice.areaId,
     
      
      locationName:this.selectedDevice.areaName,
      locationTag:this.selectedDevice.areaTag,
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



  showMapPopup = false;

  openMap() {
    this.showMapPopup = !this.showMapPopup;
  }

}
