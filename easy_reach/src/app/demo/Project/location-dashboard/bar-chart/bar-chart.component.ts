import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  public config1: any = {
    type: 'bar',
    data: {
      labels: ['Pune', 'Mumbai', 'Delhi','Indore' ],
      datasets: [{
        label: 'Hour',
        data: [ 20, 60, 80,10],
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
            text: 'Location/Area'   // X-axis label
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hour'   // Y-axis label
          }
        }
      }
    }
  };
  ngOnInit(): void {
    new Chart('barchartloc', this.config1);
   
  }
}
