import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-missing-barchart',
  standalone: true,
  imports: [],
  templateUrl: './missing-barchart.component.html',
  styleUrl: './missing-barchart.component.scss'
})
export class MissingBarchartComponent {
public config1: any = {
    type: 'bar',
    data: {
      labels: ['Haidrabad', 'Mubai', 'Pune','Nagpur'],
      datasets: [{
        label: 'Count',
        data: [60,10,30,20],
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
            text: 'Area'   // X-axis label
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Count'   // Y-axis label
          }
        }
      }
    }
  };
  ngOnInit(): void {
    new Chart('MissingChart2', this.config1);
   
  }
}
