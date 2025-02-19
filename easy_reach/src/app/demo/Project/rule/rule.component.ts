import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RuleListComponent } from "./rule-list/rule-list.component";

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [CommonModule, SharedModule, RuleListComponent],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.scss'
})
export class RuleComponent {
  selectedType: string = 'temp'; // Default selection

  temptype: string = 'Static'; // Tracks selected radio button value
  greaterTemperature?: number;        // Temperature input for "Static" option
  lessTemperature?: number;  
  accl1?:number;
  accl2?:number;
  accl3?:number;
  accl4?:number;

  accltype: string = 'Static';


  
  listA: string[] = ['Loc 1', 'Loc 2', 'Loc 3', 'Location 4', 'Loc 5'];
  filteredListA: string[] = [...this.listA]; // Filtered list for display
  listB: string[] = []; // Move In list
  listC: string[] = []; // Move Out list
  selectedOption: string = 'moveIn'; // Default option
  selectedItemsMap: { [key: string]: boolean } = {}; // Track selected items
  selectAllChecked: boolean = false; // State for Select All checkbox
  searchText: string = ''; // Search text for filtering locations

  constructor() {
    // Initialize selectedItemsMap with default false values
    this.listA.forEach((item) => {
      this.selectedItemsMap[item] = false;
    });
  }

  // Handle search input to filter locations
  filterLocations(): void {
    const search = this.searchText.toLowerCase();
    this.filteredListA = this.listA.filter(
      (item) =>
        item.toLowerCase().includes(search) &&
        !this.listB.includes(item) && // Exclude items in Move In list
        !this.listC.includes(item) // Exclude items in Move Out list
    );
    this.updateSelectAllState(); // Re-evaluate select all state
  }

  // Handle individual checkbox change
  handleCheckboxChange(item: string): void {
    if (this.selectedItemsMap[item]) {
      // Add to the active list and remove from the other
      if (this.selectedOption === 'moveIn') {
        this.addToListB(item);
        this.removeFromListC(item);
      } else {
        this.addToListC(item);
        this.removeFromListB(item);
      }
    } else {
      // Remove from both lists if unchecked
      this.removeFromListB(item);
      this.removeFromListC(item);
    }
    this.updateSelectAllState();
  }

  // Handle Select All checkbox change
  toggleSelectAll(): void {
    if (this.selectAllChecked) {
      // Select all visible (filtered) items
      this.filteredListA.forEach((item) => {
        this.selectedItemsMap[item] = true;
        if (this.selectedOption === 'moveIn') {
          this.addToListB(item);
          this.removeFromListC(item);
        } else {
          this.addToListC(item);
          this.removeFromListB(item);
        }
      });
    } else {
      // Deselect all visible (filtered) items
      this.filteredListA.forEach((item) => {
        this.selectedItemsMap[item] = false;
        this.removeFromListB(item);
        this.removeFromListC(item);
      });
    }
  }

  // Add item to Move In list
  addToListB(item: string): void {
    if (!this.listB.includes(item)) {
      this.listB.push(item);
    }
  }

  // Add item to Move Out list
  addToListC(item: string): void {
    if (!this.listC.includes(item)) {
      this.listC.push(item);
    }
  }

  // Remove item from Move In list
  removeFromListB(item: string): void {
    const index = this.listB.indexOf(item);
    if (index !== -1) {
      this.listB.splice(index, 1);
    }
  }

  // Remove item from Move Out list
  removeFromListC(item: string): void {
    const index = this.listC.indexOf(item);
    if (index !== -1) {
      this.listC.splice(index, 1);
    }
  }

  // Remove item from the currently active list
  removeFromSelectedList(item: string): void {
    if (this.selectedOption === 'moveIn') {
      this.removeFromListB(item);
    } else {
      this.removeFromListC(item);
    }
  }

  // Update the state of the Select All checkbox
  updateSelectAllState(): void {
    this.selectAllChecked = this.filteredListA.every(
      (item) => this.selectedItemsMap[item]
    );
  }

  // Clear selections when the option changes
  onOptionChange(): void {
    this.selectedItemsMap = {}; // Reset the selectedItemsMap
    this.selectAllChecked = false; // Uncheck Select All
    // Clear both lists as well
    this.listB = [];
    this.listC = [];
  }
}





