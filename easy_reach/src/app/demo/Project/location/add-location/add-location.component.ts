import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [FormsModule,CommonModule, AutocompleteLibModule],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.scss'
})
export class AddLocationComponent {
  @Output() locationAdded = new EventEmitter<void>();
  tabs = [
   
    { name: 'Location', content: '' },
    { name: 'Area', content: '' },
  ];
  activeTab: string = 'Location';

  // Form models for Scanner and Device
  scannerData = {
    firstName: '',
    lastName: '',
    
    locationType: '',
    locationTag: '',
  };

  deviceData = {
    firstName: '',
    macAddress: '',
    locationTag: '',
    
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
  private areaApiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/list'; 
  private capiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/bu/list';
  private bearerToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhc3NldHRyYWNraW5nIiwic3ViIjoidm9kYWZvbmUiLCJyb2xlcyI6WyJBZG1pbiJdLCJleHAiOjE3NDA3Nzg5NzUsImlhdCI6MTczOTI3ODk3NX0.nn69vAIZUoC32mU9UfIlRR4q8qmWF4uY3rh4hN01gm2oNNZ3dqZBXO_YgGiGgW-ikVUZR8pcEvan5_NFfoBlWg'; // Replace with actual token

  constructor(private http: HttpClient) {
    // Load data from local storage on initialization
    const storedData = localStorage.getItem('formData');
    this.tableData = storedData ? JSON.parse(storedData) : [];
    this.fetchCountries();
    this.fetchAreas();
    //this.fetchLocations();
  }

  openPage(tabName: string) {
    this.activeTab = tabName;
  }

//   saveForm(tabName: string) {
//     let formData;

//     if (tabName === 'Area') {
//         formData = { 
//           "parentId":"2",
//           "businessUnit": {
//               "busUnitId":  this.selectedCountry  
//               },
//     "locationName":this.scannerData.locationType,
//           "locationTag":this.scannerData.firstName,
          
//         };

//         // Log the captured data
//         console.log("Saving Area Data:", formData);

//         // Clear Scanner form inputs
//         this.scannerData = { firstName: '', lastName: '', locationType: '', locationTag: '' };

//     } else if (tabName === 'Location') {
//         formData = {
//             "businessUnit": {
//                 "busUnitId": this.selectedCountry   
//             },
//             "locationName": this.deviceData.macAddress,
//             "locationTag": this.deviceData.locationTag
//         };

//         // Log the captured data
//         console.log("Saving Location Data:", formData);

//         // Clear Device form inputs
//         this.deviceData = { firstName: '', macAddress: '', locationTag: '' };
//     }

    
//     this.tableData.push(formData);

//     // Save updated data to local storage
//     localStorage.setItem('formData', JSON.stringify(this.tableData));

//     // Send formatted data to API
//     this.sendDataToApi(formData);
// }


saveForm(tabName: string) {
  let formData;
  let apiUrl = ''; // Define API URL variable

  if (tabName === 'Area') {
      formData = { 
          "parentId":this.selectedAreas,
          "businessUnit": {
              "busUnitId": this.selectedCountry  
          },
          "locationName": this.scannerData.locationType,
          "locationTag": this.scannerData.firstName,
      };

      // Log the captured data
      console.log("Saving Area Data:", formData);

      // Set API URL for Area
      apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/a/save'; 

      // Clear Scanner form inputs
      this.scannerData = { firstName: '', lastName: '', locationType: '', locationTag: '' };

  } else if (tabName === 'Location') {
      formData = {
          "businessUnit": {
              "busUnitId": this.selectedCountry   
          },
          "locationName": this.deviceData.macAddress,
          "locationTag": this.deviceData.locationTag
      };

      // Log the captured data
      console.log("Saving Location Data:", formData);

      // Set API URL for Location
      apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/save'; 

      // Clear Device form inputs
      this.deviceData = { firstName: '', macAddress: '', locationTag: '' };
  }

  // Add new formData to the tableData array
  this.tableData.push(formData);

  // Save updated data to local storage
  localStorage.setItem('formData', JSON.stringify(this.tableData));

  // Send formatted data to API with respective URL
  this.sendDataToApi(formData, apiUrl);
}


sendDataToApi(data: any, apiUrl: string) {
  if (!apiUrl) {
      console.error("API URL is missing. Cannot send data.");
      return;
  }

  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
  });

  this.http.post(apiUrl, data, { headers }).subscribe(
      (response) => {
          console.log('Data successfully sent to API:', response);
          alert("Save successfully! ")
          this.locationAdded.emit();
          this.fetchCountries();
          this.fetchAreas();
      },
      (error) => {
          console.error('Error sending data to API:', error);
      }
  );
}




// sendDataToApi(data: any) {
//     const apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/save'; 
//     const headers = new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${this.bearerToken}`
//     });

//     this.http.post(apiUrl, data, { headers }).subscribe(
//         (response) => {
//             console.log('Data successfully sent to API:', response);
//         },
//         (error) => {
//             console.error('Error sending data to API:', error);
//         }
//     );
// }

  

  //saveForm(tabName: string) {
  //   let formData;
    
  
  //   if (tabName === 'Area') {
  //     formData = { 
  //       macId: this.scannerData.macAddress,
  //       deviceName: this.scannerData.firstName, // Assuming firstName represents the device name
  //       deviceType: {
  //         deviceTypeId: 6, // Assuming fixed value for now, modify as needed
  //         deviceType: "BLE",
  //         sensor: "BLE"
  //       },
  //       location: {
  //         locationId:  this.selectedCountry // Fetching location ID
  //       },
  //       area: {
  //         locationId: this.selectedAreas
  //       }
  //     };
  
  //     // Clear Scanner form inputs
  //     this.scannerData = { firstName: '', lastName: '', macAddress: '', locationType: '',locationTag:'' };
  
  //   } else if (tabName === 'Location') {
  //     formData = {
  //       "businessUnit": {
  //         "busUnitId": this.selectedCountry   
  //         },
  //     "locationName":this.deviceData.macAddress,
  //     "locationTag":this.deviceData.locationTag
  //     };
  //     console.log("Saving Area Data:", formData);
  //     // Clear Device form inputs
  //     this.deviceData = { firstName: '', macAddress: '', locationTag:'' };
  //   }
  
  //   // Add new formData to the tableData array
  //   this.tableData.push(formData);
    
  
  //   // Save updated data to local storage
  //   localStorage.setItem('formData', JSON.stringify(this.tableData));
  
  //   // Send formatted data to API
  //   this.sendDataToApi(formData);
  // }
  
 
  

  // sendDataToApi(data: any) {
  //   const apiUrl = 'https://docuquery.ai/assettracker/api/v1/c/u/loc/save'; // Replace with actual API endpoint
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.bearerToken}` // Replace with your token if needed
  //   });
  
  //   this.http.post(apiUrl, data, { headers }).subscribe(
  //     (response) => {
  //       console.log('Data successfully sent to API:', response);
  //     },
  //     (error) => {
  //       console.error('Error sending data to API:', error);
  //     }
  //   );
  // }

  

  fetchAreas() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearerToken}`,
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
      Authorization: `Bearer ${this.bearerToken}`,
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
