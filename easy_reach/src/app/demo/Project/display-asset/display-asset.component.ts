import { DisplayAssetService } from './../../../../app/demo/Project/services/display-asset.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-asset',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './display-asset.component.html',
  styleUrls: ['./display-asset.component.scss']
})
export class DisplayAssetComponent implements OnInit {
  siteId: number;
  locationId: number;
  lastUpdateOn: string;
  assetList: any = [];  // This will hold the fetched asset data
  locationDetails: any = {};
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private displayAssetService: DisplayAssetService  // Inject the service
    
  ) {}


  goToMovement(assetId,lastUpdateOn): void {
    const lastUpdateDate = new Date(lastUpdateOn);
    const fifteenDaysAgo = new Date(lastUpdateDate);
    fifteenDaysAgo.setDate(lastUpdateDate.getDate() - 15);
  console.log(fifteenDaysAgo);
   // const lastUpdateMs = lastUpdateDate.getTime();
    const fromDate = fifteenDaysAgo.getTime();
    const toDate = Date.now(); 
  
   
  
    // Navigate with both values
    this.router.navigate(['/movement-detail', assetId, fromDate, toDate]);
  }



  ngOnInit(): void {
    // Extract route parameters
    this.siteId = +this.route.snapshot.paramMap.get('siteId')!;
    this.locationId = +this.route.snapshot.paramMap.get('locationId')!;

    // Fetch asset data
    this.getAssets();
  }

  getAssets(): void {
    this.displayAssetService.getAssetsByLocation(this.siteId, this.locationId).subscribe(
      (response) => {
         console.log(response);
        if (response) {
          // console.log(response.assetDetails,"response")
          this.assetList = response.response.assetDetails;  // Assign response to asset list
          // console.log(this.assetList,"asset list")
          this.locationDetails = response.response.location; 
        } else {
          console.warn('No asset data found');
        }
      },
      (error) => {
        console.error('Error fetching asset data:', error);
      }
    );
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
