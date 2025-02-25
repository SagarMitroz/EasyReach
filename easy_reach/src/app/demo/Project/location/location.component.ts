
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddLocationComponent } from './add-location/add-location.component';
import { Component, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/theme/shared/shared.module';
@Component({
  selector: 'app-location',
  standalone: true,
  imports:[CommonModule,
    AddLocationComponent,SharedModule
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

   private token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhc3NldHRyYWNraW5nIiwic3ViIjoidm9kYWZvbmUiLCJyb2xlcyI6WyJBZG1pbiJdLCJleHAiOjE3NDA3Nzg5NzUsImlhdCI6MTczOTI3ODk3NX0.nn69vAIZUoC32mU9UfIlRR4q8qmWF4uY3rh4hN01gm2oNNZ3dqZBXO_YgGiGgW-ikVUZR8pcEvan5_NFfoBlWg'; // Replace with actual token
 
   constructor(private http: HttpClient, private modalService: NgbModal) {}
 
   ngOnInit(): void {
     this.loadDevices();
   }
 
   loadDevices(): void {
     this.getDevices().subscribe({
      
       next: (data) => {
         this.devices = data.response;
         
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
       device.locationName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
       device.locationTag?.toLowerCase().includes(this.searchText.toLowerCase()) ||
       device.areaName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
       device.areaTag.toLowerCase().includes(this.searchText.toLowerCase())
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

}
