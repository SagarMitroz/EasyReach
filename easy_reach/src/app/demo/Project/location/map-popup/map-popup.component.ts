import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-popup',
  template: `<div #mapContainer class="map-container"></div>`,
  styles: [
    `
      .map-container {
        height: 300px;
        width: 400px;
      }
    `,
  ],
  standalone: true,
  imports: [],
  templateUrl: './map-popup.component.html',
  styleUrl: './map-popup.component.scss'
})
export class MapPopupComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.mapContainer) {
        console.error('mapContainer is not defined');
        return;
      }

      const map = L.map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      L.marker([51.505, -0.09]).addTo(map).bindPopup('You clicked here!').openPopup();
    }, 100); // Give Angular time to render
  }
}
