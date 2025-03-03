import { Component, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-ble-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './ble-list.component.html',
  styleUrl: './ble-list.component.scss'
})
export class BleListComponent {
  devices: any[] = [];
  searchText: string = ''; // Search input model
  selectedDevice: any = {};
  currentPage: number = 1;
pageSize: number = 10;

  private apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/d/list';
  private updateUrl = 'https://docuquery.ai/assettracker/api/v1/c/d/update';
  private token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhc3NldHRyYWNraW5nIiwic3ViIjoidm9kYWZvbmUiLCJyb2xlcyI6WyJBZG1pbiJdLCJleHAiOjE3NDIzMDcwMDAsImlhdCI6MTc0MDgwNzAwMH0.NkRItuKT4ILXrCl4YZNkhJjXe0iWbU4yLKvZ4ChpwEu2NEFFwadyj5ku0AoHUyHMTYNugVuVvwBFV7vPDQbwoQ'; // Replace with actual token

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.getDevices().subscribe({
      next: (data) => {
        this.devices = data.response.reverse();
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
      device.deviceName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      device.macId?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      device.deviceType?.deviceType?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      device.deviceType?.sensor?.toLowerCase().includes(this.searchText.toLowerCase())
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
      deviceId: this.selectedDevice.deviceId,
      macId: this.selectedDevice.macId,
      deviceName: this.selectedDevice.deviceName,
      deviceType: {
        deviceTypeId: this.selectedDevice.deviceType?.deviceTypeId,
        deviceType: this.selectedDevice.deviceType?.deviceType,
        sensor: this.selectedDevice.deviceType?.sensor,
      },
      location: {
        locationId: this.selectedDevice.location?.locationId || 1, 
      },
      area: {  
        locationId: this.selectedDevice.area?.locationId || 1, 
      },
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
