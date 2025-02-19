import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {

  public pieChartConfig: any = {
    type: 'pie',
    data: {
      labels: ['Mumbai', 'Bangalore', 'Pune'],
      datasets: [{
        label: 'Assets',
        data: [30, 40, 30],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false  // Hides the legend outside
        },
        
        datalabels: {
          color: '#fff',              // Label color
          formatter: (value: number, ctx: any) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return `${label} (${value})`;   // Custom label format
          },
          font: {
            size: 14
          }
        }
      }
    }
  };

  ngOnInit(): void {
   
    new Chart('piechartloc', this.pieChartConfig); // Initialize the pie chart
    
  }
}
