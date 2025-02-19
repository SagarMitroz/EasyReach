import { MovementDetailService } from './../services/movement-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movement-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movement-detail.component.html',
  styleUrl: './movement-detail.component.scss'
})
export class MovementDetailComponent implements OnInit {
  assetId:number;
  fifteenDaysAgoMs:number;
  todayMs:number;

  asset: any = {};  // This will hold the fetched asset data
  movementdetail: any = [];
 

  constructor(
     private route: ActivatedRoute,
     private router: Router,
     private movementDetailService: MovementDetailService  // Inject the service
     
   ) {}



  ngOnInit(): void {
    // Extract route parameters
    this.assetId = +this.route.snapshot.paramMap.get('assetId')!;
    this.fifteenDaysAgoMs = +this.route.snapshot.paramMap.get('fromDate')!;
    this.todayMs = +this.route.snapshot.paramMap.get('toDate')!;
//console.log(this.assetId,this.fifteenDaysAgoMs,this.todayMs,"dasd")
    // Fetch asset data
    this.getMovementdetail();
  }

  getMovementdetail():void
  {
    this.movementDetailService.goToMovement(this.assetId,this.fifteenDaysAgoMs.toString(),this.todayMs.toString()).subscribe(
      (response) => {
console.log(response)
    if(response){
    this.asset = response.response.asset;  

   this.movementdetail = response.response.movmentHistory
;  


    }
    else{
      console.warn('No asset data found');
    }
      },
      (error) => {
        console.error('Error fetching asset data:', error);
      }
    );
  }



  getFormattedTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }

}
