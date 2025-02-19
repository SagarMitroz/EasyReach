import { Component } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-efficiency-chart',
  standalone: true,
  imports: [],
  templateUrl: './efficiency-chart.component.html',
  styleUrl: './efficiency-chart.component.scss'
})
export class EfficiencyChartComponent {
public config4: any = {
    type: 'bar',
    data: {
      labels: ['Haidrabad', 'Mubai', 'Pune','Nagpur'],
      datasets: [{
        label: 'Temperature',
        data: [1, 6, 3, 7, 13, 12, 15],
        backgroundColor: 'rgb(72, 183, 253)',
        borderColor: 'rgb(72, 183, 253)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Disables the legend
        },
        tooltip: {
          enabled: true // Disables the tooltips
        },
        datalabels: {
          display: false // Disables datalabels (text inside bubbles)
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Months'   // X-axis label
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Temperature'   // Y-axis label
          }
        }
      }
    }
  };
  ngOnInit(): void {
    new Chart('efficincychart', this.config4);
   
  }
}
