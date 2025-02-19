import { CommonModule } from '@angular/common';
import { DateFormatterFn } from './../../../../../node_modules/ngx-bootstrap/chronos/types.d';
import { Component,HostListener  } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import flatpickr from 'flatpickr';
import { range } from 'rxjs';

import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);


//Chart.register(...registerables);

@Component({
  selector: 'app-temperature-dashboard',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './temperature-dashboard.component.html',
  styleUrl: './temperature-dashboard.component.scss'
})
export class TemperatureDashboardComponent {

 

  public config1: any = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
  
  public config2: any = {
    type: 'bar',
    data: {
      labels: ['Mumbai', 'Nashik','Pune','Bangalore','Jalgaon'],
      datasets: [{
        label: 'Temperature',
        data: [15, 11, 12, 3, 8, 4, 9],
        backgroundColor: 'rgb(72, 183, 253)',
        borderColor: 'rgb(72, 183, 253)',
        fill: true
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
            text: 'Cities'   // X-axis label
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Months'   // Y-axis label
          }
        }
      }
    }
  };

  // public pieChartConfig: any = {
  //   type: 'pie',
  //   data: {
  //     labels: ['Category A', 'Category B', 'Category C'], // Add labels here
  //     datasets: [{
  //       label: 'Assets',
  //       data: [30, 40, 30],
  //       backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
  //       hoverOffset: 4
  //     }]
  //   },
  //   options: {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         display: true,  // Ensures labels are shown in the legend
  //         position: 'top'
  //       }
  //     }
  //   }
  // };
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

  // public bubbleChartConfig: any = {
  //   type: 'bubble',
  //   data: {
  //     datasets: [
  //       {
  //         label: 'Assets - Red',
  //         data: [{ x: 10, y: 9, r: 15 }],
  //         backgroundColor: 'rgb(255, 205, 70)' // Red
  //       },
  //       {
  //         label: 'Assets - Red',
  //         data: [{ x: 6, y: 8, r: 10 }],
  //         backgroundColor: 'rgb(255, 205, 70)' // Red
  //       },
  //       {
  //         data: [{ x: 23, y: 6, r: 10 }],
  //         backgroundColor: 'rgb(221, 81, 68)' // Green
  //       },
  //       {
  //         data: [{ x: 2, y: 6, r: 10 }],
  //         backgroundColor: 'rgb(221, 81, 68)' // Green
  //       },
  //       {
  //         data: [{ x: 20, y: 8, r: 10 }],
  //         backgroundColor: 'rgb(221, 81, 68)' // Green
  //       },
  //       {
  //         data: [{ x: 16, y: 8, r: 10 }],
  //         backgroundColor: 'rgb(221, 81, 68)' // Green
  //       },
  //       {
  //         data: [{ x: 3, y: 3, r: 8 }],
  //         backgroundColor: 'rgb(255, 205, 70)' // Yellow
  //       },
  //       {
  //         label: 'Assets - Yellow',
  //         data: [{ x: 16, y: 5, r: 8 }],
  //         backgroundColor: 'rgb(29, 164, 98)' // Yellow
  //       },
  //       {
  //         label: 'Assets - Yellow',
  //         data: [{ x: 16, y: 6, r: 8 }],
  //         backgroundColor: 'rgb(29, 164, 98)' // Yellow
  //       },
  //       {
  //         label: 'Assets - Yellow',
  //         data: [{ x: 1, y: 5, r: 10 }],
  //         backgroundColor: 'rgb(29, 164, 98)' // Yellow
  //       }
  //     ]
  //   },
  //   options: {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         display: false // Disables the legend
  //       },
  //       tooltip: {
  //         enabled: false // Disables the tooltips
  //       }
  //     },
  //     scales: {
  //       x: {
  //         title: { display: true, text: 'Time (0-24)' },
  //         beginAtZero: true
  //       },
  //       y: {
  //         title: { display: true, text: 'Temperature' },
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // };
  
  public bubbleChartConfig: any = {
    type: 'bubble',
    data: {
      datasets: [
        {
          data: [{ x: 10, y: 9, r: 15 }],
          backgroundColor: 'rgb(255, 205, 70)', // Red
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 6, y: 8, r: 10 }],
          backgroundColor: 'rgb(255, 205, 70)', // Red
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 23, y: 6, r: 10 }],
          backgroundColor: 'rgb(221, 81, 68)', // Green
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 2, y: 6, r: 10 }],
          backgroundColor: 'rgb(221, 81, 68)', // Green
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 20, y: 8, r: 10 }],
          backgroundColor: 'rgb(221, 81, 68)', // Green
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 16, y: 8, r: 10 }],
          backgroundColor: 'rgb(221, 81, 68)', // Green
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 3, y: 3, r: 8 }],
          backgroundColor: 'rgb(255, 205, 70)', // Yellow
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 16, y: 5, r: 8 }],
          backgroundColor: 'rgb(29, 164, 98)', // Yellow
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 16, y: 6, r: 8 }],
          backgroundColor: 'rgb(29, 164, 98)', // Yellow
          label: '' // Ensure no label is set
        },
        {
          data: [{ x: 1, y: 5, r: 10 }],
          backgroundColor: 'rgb(29, 164, 98)', // Yellow
          label: '' // Ensure no label is set
        }
      ]
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
          title: { display: true, text: 'Time (0-24)' },
          beginAtZero: true
        },
        y: {
          title: { display: true, text: 'Temperature' },
          beginAtZero: true
        }
      },
      elements: {
        point: {
          radius: 5, // Set default bubble size
          hoverRadius: 7, // Hover effect size
          // Prevent rendering text inside bubbles (no text)
          backgroundColor: 'rgba(0,0,0,0)' // Transparent text or no text at all
        }
      }
    }
  };
  
  
  ngOnInit(): void {
    new Chart('MyChart1', this.config1);
    new Chart('MyChart2', this.config2);
    new Chart('MyChart3', this.pieChartConfig); // Initialize the pie chart
    new Chart('MyChart4', this.bubbleChartConfig);
  }

// Daterange
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


 ////

  //Dropdown
  // showFilterCard: boolean = false;
  // filterCardPosition: { [key: string]: string } = {};

  // toggleFilterCard(event: MouseEvent) {
  //   this.showFilterCard = !this.showFilterCard;

  //   if (this.showFilterCard) {
  //     // Get button position to place the filter card below it
  //     const button = event.target as HTMLElement;
  //     const rect = button.getBoundingClientRect();
  //     const topPosition = rect.bottom + window.scrollY;  // Position below the button
  //     const leftPosition = rect.left;  // Align horizontally with the button

  //     // Set filter card position dynamically
  //     this.filterCardPosition = {
  //       'top': `${topPosition}px`,
  //       'left': `${leftPosition}px`,
  //       'position': 'absolute',
  //       'z-index': '1000',
  //     };


  //   }

    
  // }

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



// datatable

}
