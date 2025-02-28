import { CommonModule } from '@angular/common';
import { Component,ViewChild, AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BleListComponent } from './ble-list/ble-list.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Console } from 'console';

@Component({
  selector: 'app-ble',
  standalone: true,
  imports: [CommonModule, FormsModule, BleListComponent, AutocompleteLibModule],
  templateUrl: './ble.component.html',
  styleUrls: ['./ble.component.scss'],
})
export class BleComponent implements AfterViewInit {
  @ViewChild(BleListComponent) bleListComponent!: BleListComponent;
  ngAfterViewInit(): void {
    // Ensure child component is available
  }

  tabs = [
    { name: 'Scanner', content: '' },
    { name: 'Device', content: '' },
  ];
  activeTab: string = 'Scanner';

  // Form models for Scanner and Device
  scannerData = {
    firstName: '',
    lastName: '',
    macAddress: '',
    locationType: '',
  };

  deviceData = {
    firstName: '',
    macAddress: '',
    locationType: '',
  };

  tableData: any[] = []; // Array to hold data for the table
  locations: any[] = []; // Array to hold location data
  selectedLocation: any = null;
  locid:number;
  keyword = 'name';
  keyword1 = 'name';
  countries: any[] = []; // Updated to hold API response
  areas: any[] = []; // Array to hold area data
selectedArea: any = null;
  selectedCountry: number = 0;
  selectedAreas: number = 0;
  private areaApiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/a/list'; 
  private apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/list';
  private bearerToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhc3NldHRyYWNraW5nIiwic3ViIjoidm9kYWZvbmUiLCJyb2xlcyI6WyJBZG1pbiJdLCJleHAiOjE3NDA3Nzg5NzUsImlhdCI6MTczOTI3ODk3NX0.nn69vAIZUoC32mU9UfIlRR4q8qmWF4uY3rh4hN01gm2oNNZ3dqZBXO_YgGiGgW-ikVUZR8pcEvan5_NFfoBlWg'; // Replace with actual token

  constructor(private http: HttpClient) {
    // Load data from local storage on initialization
    const storedData = localStorage.getItem('formData');
    this.tableData = storedData ? JSON.parse(storedData) : [];
    this.fetchCountries();
    
    //this.fetchLocations();
  }

  openPage(tabName: string) {
    this.activeTab = tabName;
  }

  
  

  saveForm(tabName: string) {
    let formData;
  
    if (tabName === 'Scanner') {

      if (!this.scannerData.macAddress || this.scannerData.macAddress.trim() === '') {
        console.error('Mac Address is required.');
        alert("All fields required")
        return; // Stop form submission if macAddress is empty
      }
      formData = { 
        macId: this.scannerData.macAddress,
        deviceName: this.scannerData.firstName, // Assuming firstName represents the device name
        deviceType: {
          deviceTypeId: 6, // Assuming fixed value for now, modify as needed
          deviceType: "BLE",
          sensor: "BLE"
        },
        location: {
          locationId:  this.selectedCountry // Fetching location ID
        },
        area: {
          locationId: this.selectedAreas
        }
      };
  
      // Clear Scanner form inputs
      this.scannerData = { firstName: '', lastName: '', macAddress: '', locationType: '' };
  
    } else if (tabName === 'Device') {
      formData = {
        macId: this.deviceData.macAddress,
        deviceName: this.deviceData.firstName,
        deviceType: {
          deviceTypeId: 5,
          deviceType: "Device",
          sensor: "Device"
        },
        location: {
          locationId: 1
        },
        area: {
          locationId: 20
        }
      };
  
      // Clear Device form inputs
      this.deviceData = { firstName: '', macAddress: '', locationType: '' };
    }
  
    // Add new formData to the tableData array
    this.tableData.push(formData);
    
  
    // Save updated data to local storage
    localStorage.setItem('formData', JSON.stringify(this.tableData));
  
    // Send formatted data to API
    this.sendDataToApi(formData);
  }
  
 
  

  sendDataToApi(data: any) {
    const apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/d/save'; // Replace with actual API endpoint
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}` // Replace with your token if needed
    });
  
    this.http.post(apiUrl, data, { headers }).subscribe(
      (response) => {
        console.log('Data successfully sent to API:', response);
        alert("Save successfully!");
        this.bleListComponent.loadDevices();
},
      (error) => {
        console.error('Error sending data to API:', error);
      }
    );
  }

  

  fetchAreas(locationId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearerToken}`,
      'Content-Type': 'application/json',
    });
  
    const body = { locationId:locationId };
  
    this.http.post<any>(this.areaApiUrl, body, { headers }).subscribe(
      (response) => {
        if (response && response.response && Array.isArray(response.response)) {
          this.areas = response.response.map((item: any) => ({
            id: item.locationId,
            name: item.locationName, // Ensure the API response has a `name` field
          }));
        } else {
          console.error('Unexpected API response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching areas:', error);
      }
    );
  }
  


  fetchCountries() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearerToken}`,
    });
  
    this.http.get<any>(this.apiUrl, { headers }).subscribe((response) => {
     
      if (response && response.response && Array.isArray(response.response)) {
        
        this.countries = response.response.map((item: any) => ({
          
          id: item.locationId,
          name: item.locationName, // Ensure the API response has a `name` field
          
        }));
       

      } else {
        console.error('Unexpected API response format:', response);
      }
      
      
    });
    
  }

  selectEvent(country: any) {
    this.fetchAreas(country.id);
    console.log(country);
    this.selectedCountry = country.id; // Store selected country
   
    this.scannerData.lastName = country.name; // Set lastName to selected country
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
   
    this.scannerData.lastName = area.name; // Set lastName to selected country
  }
  
  onChangeSearch1(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused1(e) {
    // do something
  }
}
