import { CommonModule } from '@angular/common';
import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-dual-list',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './dual-list.component.html',
  styleUrl: './dual-list.component.scss'
})
export class DualListComponent implements OnInit {
  @Input() title: string = '';
  @Input() availableList: string[] = [];
  @Input() selectedList: string[] = [];
  @Output() updateSelectedList = new EventEmitter<string[]>(); // Correct EventEmitter declaration

  filteredAvailableList: string[] = [];
  selectedItems: { [key: string]: boolean } = {};
  searchText: string = '';

  ngOnInit(): void {
    this.filteredAvailableList = [...this.availableList];
    this.availableList.forEach((item) => {
      this.selectedItems[item] = this.selectedList.includes(item);
    });
  }

  filterLocations(): void {
    const search = this.searchText.toLowerCase();
    this.filteredAvailableList = this.availableList.filter((item) =>
      item.toLowerCase().includes(search)
    );
  }

  updateSelectedListHandler(item: string): void {
    if (this.selectedItems[item] && !this.selectedList.includes(item)) {
      this.selectedList.push(item); // Add to selected list
    } else if (!this.selectedItems[item] && this.selectedList.includes(item)) {
      this.selectedList = this.selectedList.filter((i) => i !== item); // Remove from selected list
    }

    // Emit updated selected list
    this.updateSelectedList.emit(this.selectedList); // Correct usage of EventEmitter
  }
}

