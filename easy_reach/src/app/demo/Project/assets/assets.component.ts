import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, SharedModule,AutocompleteLibModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})
export class AssetsComponent implements OnInit, OnChanges {
  constructor(private http: HttpClient) {

    this.fetchCountries();
    this.fetchAreas();
  }
  selectedLocation: any = null;
  locid:number;
  keyword = 'name';
  keyword1 = 'name';
  countries: any[] = []; // Updated to hold API response
  areas: any[] = []; // Array to hold area data
selectedArea: any = null;
  selectedCountry: number = 0;
  selectedAreas: number = 0;
  private areaApiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/list'; 
  private capiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/bu/list';
  private liveapiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/l/liveLocation'; 
  private missingAssetUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/l/missingAsset'; 
  private token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhc3NldHRyYWNraW5nIiwic3ViIjoidm9kYWZvbmUiLCJyb2xlcyI6WyJBZG1pbiJdLCJleHAiOjE3NDA3Nzg5NzUsImlhdCI6MTczOTI3ODk3NX0.nn69vAIZUoC32mU9UfIlRR4q8qmWF4uY3rh4hN01gm2oNNZ3dqZBXO_YgGiGgW-ikVUZR8pcEvan5_NFfoBlWg'; // Replace with actual token securely

  devices: any[] = [];
  missingDevices: any[] = [];

  @Input() batteryLevel: number = 50;
  batteryColor: string = '#4CAF50';

  tabs = [
    {
      name: '275',
      color: '#ebf5fc',
      heading: 'Total Asset',
      cards: [] as any[], // Initially empty, will be filled dynamically
    },
    {
      name: '027',
      color: '#ebf5fc',
      heading: 'Missing Asset',
      cards: [] as any[], // Will be populated separately
    }
  ];

  activeTab: string = this.tabs[0].name;
  itemsPerPage: number = 15;
  currentPage: number = 1;

  ngOnInit(): void {
    this.loadTotalAssets();
    this.loadMissingAssets();
  }

  ngOnChanges(): void {
    this.updateBatteryColor();
  }

  /**
   * Fetches Total Assets (GET request).
   */
  loadTotalAssets(): void {
    this.getDevices(this.liveapiUrl).subscribe({
      next: (data) => {
        this.devices = data.response;
        console.log('Total Assets Loaded:', this.devices);

        this.tabs[0].cards = this.devices.map(device => ({
          assetName: device.assetName || 'N/A',
          Mac: device.macId || 'N/A',
          Location: device.locationName || 'N/A',
          area: device.areaName || 'N/A',
          updatedon: device.updateOn || 'N/A',
          battery: device.battery || 'N/A',
          duration: device.durationTime || 'N/A'
        }));

        console.log('Updated Total Assets:', this.tabs[0].cards);
      },
      error: (err) => {
        console.error('Error fetching total assets:', err);
      }
    });
  }

  /**
   * Fetches Missing Assets (POST request).
   */
  loadMissingAssets(): void {
    const requestBody = {}; // Add necessary parameters if needed

    this.postDevices(this.missingAssetUrl, requestBody).subscribe({
      next: (data) => {
        if (data && data.response) {
          this.missingDevices = data.response;
          console.log('Missing Assets Loaded:', this.missingDevices);

          this.tabs[1].cards = this.missingDevices.map((device) => ({
            assetName: device.assetName || 'N/A',
            Mac: device.macId || 'N/A',
            Location: device.locationName || 'N/A',
            area: device.areaName || 'N/A',
            updatedon: device.updateOn ? new Date(device.updateOn) : null,
            battery: device.battery || 'N/A',
            duration: device.durationTime || 'N/A',
          }));

          console.log('Updated Missing Assets:', this.tabs[1].cards);
        } else {
          console.warn('No response data received');
        }
      },
      error: (err) => {
        console.error('Error fetching missing assets:', err);
      },
    });
  }
  postDevices(apiUrl: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Fixed string interpolation
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    

    console.log('Headers:', headers);

    return this.http.post<any>(apiUrl, body, { headers });
  }

  




  /**
   * Makes a GET request to fetch devices.
   */
  getDevices(apiUrl: string): Observable<any> {
    // console.log(this.token,"token")
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(apiUrl, { headers });
  }

  /**
   * Makes a POST request to fetch devices.
   */
 
  /**
   * Formats the date into "12pm 26/02/2025" format.
   */
  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based
    const year = date.getFullYear();

    return `${formattedHours}:${formattedMinutes}${ampm} ${day}/${month}/${year}`;
  }

  openPage(tabName: string,color: string): void {
    this.activeTab = tabName;
    this.currentPage = 1; // Reset to the first page on tab change
  }

  get activeTabData() {
    return this.tabs.find(tab => tab.name === this.activeTab);
  }

  get paginatedCards() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.activeTabData?.cards.slice(startIndex, startIndex + this.itemsPerPage) || [];
  }

  get totalPages() {
    return Math.ceil((this.activeTabData?.cards.length || 0) / this.itemsPerPage);
  }

  changePage(increment: number): void {
    const newPage = this.currentPage + increment;
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }

  getPaginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  private updateBatteryColor() {
    if (this.batteryLevel <= 20) {
      this.batteryColor = '#dc3545'; // Red for low battery
    } else if (this.batteryLevel <= 50) {
      this.batteryColor = '#ffc107'; // Yellow for medium battery
    } else {
      this.batteryColor = '#4CAF50'; // Green for high battery
    }
  }





  fetchAreas() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http.get<any>(this.areaApiUrl, { headers }).subscribe((response) => {
     
      if (response && response.response && Array.isArray(response.response)) {
        
        this.areas = response.response.map((item: any) => ({
          
          id: item.locationId,
          name: item.locationName, // Ensure the API response has a `name` field
        }));
      } else {
        console.error('Unexpected API response format:', response);
      }
    });
  }


  fetchCountries() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  
    this.http.get<any>(this.capiUrl, { headers }).subscribe((response) => {
     
     
      if (response && response.response && Array.isArray(response.response)) {
        
        this.countries = response.response.map((item: any) => ({
          
          id: item.busUnitId,
          name: item.busUnitName, // Ensure the API response has a `name` field
        }));
      } else {
        console.error('Unexpected API response format:', response);
      }
    });
  }

  selectEvent(country: any) {
    console.log(country);
    this.selectedCountry = country.id; // Store selected country
   
     // Set lastName to selected country
  }
 
  
 
  
   
    

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }


  

 

  selectEvent1(area: any) {
   console.log(area);
    this.selectedAreas = area.id; // Store selected country
   
 // Set lastName to selected country
  }
  
  onChangeSearch1(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused1(e) {
    // do something
  }




}

