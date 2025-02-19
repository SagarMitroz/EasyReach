import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {

  public config1: any = {
    type: 'line',
    data: {
      labels: ['Pune', 'Mumbai', 'Delhi','Indore' ],
      datasets: [
        {
          label: 'This Week',
          data: [1, 6, 3, 7, 13, 12],
          backgroundColor: 'rgba(72, 183, 253, 0.2)',
          borderColor: 'rgb(72, 183, 253)',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'Last Week',
          data: [2, 8, 10, 12, 15, 20],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true, // Enables legend for multiple lines
          position: 'top'
        },
        tooltip: {
          enabled: true
        },
        datalabels: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Location'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Hour'
          }
        }
      }
    }
  };

  ngOnInit(): void {
    new Chart('lineChart', this.config1);
  }
}
