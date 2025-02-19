import { Component } from '@angular/core';
import flatpickr from 'flatpickr';
import { HostListener  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { MissingBarchartComponent } from './missing-barchart/missing-barchart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { EfficiencyChartComponent } from './efficiency-chart/efficiency-chart.component';
@Component({
  selector: 'app-location-dashboard',
  standalone: true,
  imports: [CommonModule,PieChartComponent,BarChartComponent,MissingBarchartComponent,LineChartComponent,EfficiencyChartComponent],
  templateUrl: './location-dashboard.component.html',
  styleUrl: './location-dashboard.component.scss'
})
export class LocationDashboardComponent {



   ngAfterViewInit()
    {
      flatpickr("#daterange",{mode:'range',
      dateFormat:'d-m-y'
      }
      )
    }
  
   //calender
  
   selectedDate: string = '';
  
    // Opens the hidden date input
    openCalendar(hiddenDatePicker: HTMLInputElement) {
      hiddenDatePicker.click();
    }
  
    // Updates the selected date
    updateDate(event: Event) {
      const input = event.target as HTMLInputElement;
      this.selectedDate = input.value;
    }
  
    showFilterCard = false;
    
      toggleFilterCard(event: Event) {
        event.stopPropagation();
        this.showFilterCard = !this.showFilterCard;
      }
    
      // Close filter card on outside click
      @HostListener('document:click', ['$event'])
      onDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const filterCard = document.querySelector('.filter-card');
        if (filterCard && !filterCard.contains(target)) {
          this.showFilterCard = false;
        }
      }
  
}
