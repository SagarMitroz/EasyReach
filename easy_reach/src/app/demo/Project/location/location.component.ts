import { LocationService } from './../../../../app/demo/Project/services/location.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddLocationComponent } from './add-location/add-location.component';
@Component({
  selector: 'app-location',
  standalone: true,
  imports:[CommonModule,
    AddLocationComponent
  ],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']  // Corrected 'styleUrl' to 'styleUrls'
})
export class LocationComponent {
  locationList: any = []; 

  constructor(
    private locationService: LocationService,  // Corrected property name
    private router: Router  // Added `private` access modifier
  ) {}

  // Navigation method
  goToDetails(siteId: number, locationId: number): void {
    console.log(siteId, locationId);
    this.router.navigate(['/display-asset', siteId, locationId]);
  }

  ngOnInit(): void {
    // Fetch data from the service
    this.locationService.getLocations().subscribe((res: any) => {
      if (res && res.response) {
        console.log('API Data:', res.response);
        this.locationList = res.response;
      } else {
        console.error('Unexpected API Response Format:', res);
      }
    });
  }



  getTimeDifference(lastUpdateOn: string): string {
    const currentDate = new Date();
    const lastUpdateDate = new Date(lastUpdateOn);
   
    const diffInMs = currentDate.getTime() - lastUpdateDate.getTime();
   
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    console.log(days);
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ago`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `Just now`;
    }
  }


}
