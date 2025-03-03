import { Location } from './../model/location';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ToastService } from 'src/app/demo/Project/toast.service';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, SharedModule,AutocompleteLibModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})


export class AssetsComponent implements OnInit, OnChanges {

  constructor(private http: HttpClient,public toastService: ToastService) {

    this.fetchCountries();
    this.fetchAreas();
    this.fetchAsset();
    this.fetchLocation();
  }


  
campusIdforS:number;
locationIdforS:number;
areaIdforS:number;
assetIdforS:number;

  
  selectedLocation: any = null;
  locid:number;
  keyword = 'name';
  keyword1 = 'name';
  keyword2 = 'name';
  keyword3 = 'name';
  locations: any[] = [];
  assets: any[] = [];
  countries: any[] = []; // Updated to hold API response
  areas: any[] = []; // Array to hold area data
selectedArea: any = null;
selectedLocs: any = null;
selectedasset: any = null;
selectedAssets: number = 0;
  selectedCountry: number = 0;
  selectedLoc: number = 0;
  selectedAreas: number = 0;
  private assetlist = 'https://docuquery.ai/assettracker/api/v1/c/a/assetMapping';
  private areaApiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/a/list';
  private locationApiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/list';  
  private capiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/bu/list';
  private liveapiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/l/liveLocation'; 
  private missingAssetUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/l/missingAsset'; 
  private token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhc3NldHRyYWNraW5nIiwic3ViIjoidm9kYWZvbmUiLCJyb2xlcyI6WyJBZG1pbiJdLCJleHAiOjE3NDIzMDcwMDAsImlhdCI6MTc0MDgwNzAwMH0.NkRItuKT4ILXrCl4YZNkhJjXe0iWbU4yLKvZ4ChpwEu2NEFFwadyj5ku0AoHUyHMTYNugVuVvwBFV7vPDQbwoQ'; // Replace with actual token securely

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

   

    const requestBody={
      assetId:this.assetIdforS,
      locationId:this.locationIdforS,
      areaId:this.areaIdforS,
      busUnitId:this.campusIdforS,
    }
    this.getDevices(this.liveapiUrl, requestBody).subscribe({
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

  getDevices(apiUrl: string,body: any): Observable<any> {
    // console.log(this.token,"token")
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Fixed string interpolation
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post<any>(apiUrl,body, { headers });
  }


  /**
   * Fetches Missing Assets (POST request).
   */
  loadMissingAssets(): void {
     // Add necessary parameters if needed
const requestBody={
  assetId:this.assetIdforS,
      locationId:this.locationIdforS,
      areaId:this.areaIdforS,
      busUnitId:this.campusIdforS,
}
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


  test($event: void) {
    this.selectEvent(null); 

    

    }



  selectEvent(country: any) {
    // console.log(country);
    // this.selectedCountry = country.id; // Store selected country
   

    if (country) {
      console.log(country);
      this.selectedCountry = country.id; // Store selected asset ID
    } else {
      console.log(country);
      this.selectedCountry = null; // Reset when cleared
    }
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
    //  this.selectedAreas = area.id; // Store selected country

    
    if (area) {
      console.log(area);
      this.selectedAreas = area.id; // Store selected asset ID
    } else {
      console.log(area);
      this.selectedAreas = null; // Reset when cleared
    }


    // if (area && area.id) {
    //   this.selectedAreas = area.id; // Store the selected area ID
    // } else {
    //   this.selectedAreas = 0; // If cleared, set ID to 0
    // }
    // console.log("Selected Area ID:", this.selectedAreas);
  
    
  // Set lastName to selected country
   }

   clearSelection() {
   
    this.selectedAreas = 0;
    console.log("Id set " +this.selectedAreas );
  }
   
  test2($event: void) {
    this.selectEvent1(null); 

    

    }


   onChangeSearch1(search: string) {
    
   }
 
   onFocused1(e) {
     // do something
   }
  

 
  fetchAsset() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  
    this.http.get<any>(this.assetlist, { headers }).subscribe((response) => {
     
     
      if (response && response.response && Array.isArray(response.response)) {
        
        this.assets = response.response.map((item: any) => ({
          
          id: item.assetId,
          name: item.assetName, // Ensure the API response has a `name` field
        }));
      } else {
        console.error('Unexpected API response format:', response);
      }
    });
  }
  




  test3($event: void) {
    this.selectEvent2(null); 
    }
  

selectEvent2(assets: any) {
  //  console.log(assets);
  //   this.selectedAssets = assets.id; // Store selected country


  if (assets) {
    console.log(assets);
    this.selectedAssets = assets.id; // Store selected asset ID
  } else {
    console.log(assets);
    this.selectedAssets = null; // Reset when cleared
  }
   
 // Set lastName to selected country
  }
  
  onChangeSearch2(search: string) {
    if (!search) { // If the input is empty (user cleared it)
      this.selectedAssets = 0; // Reset to 0
      console.log("Selection cleared, setting ID to 0");
    }
  }

  onFocused2(e) {
    // do something
  }




  fetchLocation() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  
    this.http.get<any>(this.locationApiUrl, { headers }).subscribe((response) => {
     
     
      if (response && response.response && Array.isArray(response.response)) {
        
        this.locations = response.response.map((item: any) => ({
          
          id: item.locationId,
          name: item.locationName, // Ensure the API response has a `name` field
        }));
      } else {
        console.error('Unexpected API response format:', response);
      }
    });
  }
  
  test1($event: void) {
    this.selectEvent3(null); 

    

    }
    

selectEvent3(locations: any) {
  //  console.log(locations);
  //   this.selectedAreas = locations.id; // Store selected country
   

  if (locations) {
    console.log(locations);
    this.selectedLocation = locations.id; // Store selected asset ID
  } else {
    console.log(locations);
    this.selectedLocation = null; // Reset when cleared
  }

 // Set lastName to selected country
  }
  
  onChangeSearch3(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused3(e) {
    // do something
  }
  
  getTimeSixHoursAgo(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours - 6, minutes, seconds);
    
    return date.toTimeString().split(' ')[0]; // Format HH:MM:SS
  }

  onSearch() {
    console.log("Selected IDs:", {
    
      areaId: this.selectedCountry,
      assetId: this.selectedAssets,
      campus: this.selectedCountry,
      location: this.selectedLocation,
    });
    this.campusIdforS= this.selectedCountry;
     this.locationIdforS= this.selectedLocation
     this.areaIdforS= this.selectedArea
     this.assetIdforS= this.selectedAssets
     this.loadTotalAssets();
     this.loadMissingAssets();
  }





  timeAgo(duration: string): string {
    if (!duration) return '';

    const [hours, minutes, seconds] = duration.split(':').map(Number);

    if (hours > 0) {
      return `${hours} h<br>ago `;
    } else if (minutes > 0) {
      return `${minutes} min<br>ago  `;
    } else {
      return `just<br>now`;
    }
  }



  
}

