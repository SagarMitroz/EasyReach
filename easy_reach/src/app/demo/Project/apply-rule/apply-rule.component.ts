import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-apply-rule',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './apply-rule.component.html',
  styleUrl: './apply-rule.component.scss'
})
export class ApplyRuleComponent {
  selectedType: string = 'temp';

  // Data for Dual Lists
  locA: string[] = ['Loc 1', 'Loc 2', 'Loc 3', 'Loc 4', 'Loc 5','Loc 1', 'Loc 2', 'Loc 3', 'Loc 4', 'Loc 5'];
  locB: string[] = [];

  listA: string[] = ['Loc 1', 'Loc 2', 'Loc 3','Loc 4', 'Loc 5', 'Loc 6', 'Loc 7', 'Loc 8','Loc 9', 'Loc 10', 'Loc 11', 'Loc 12', 'Loc 13'];
  listB: string[] = [];

  regA: string[] = ['Reg 1', 'Reg 2', 'Reg 3'];
  regB: string[] = [];

  areaA: string[] = ['Area 1', 'Area 2', 'Area 3'];
  areaB: string[] = [];

  // Search Query Variables
  searchQueryA: string = '';
  searchQueryB: string = '';

  // Filtered Lists based on Search Query
  get filteredLocA(): string[] {
    return this.locA.filter(item => item.toLowerCase().includes(this.searchQueryA.toLowerCase()));
  }

  get filteredListA(): string[] {
    return this.listA.filter(item => item.toLowerCase().includes(this.searchQueryA.toLowerCase()));
  }

  get filteredRegA(): string[] {
    return this.regA.filter(item => item.toLowerCase().includes(this.searchQueryA.toLowerCase()));
  }

  get filteredAreaA(): string[] {
    return this.areaA.filter(item => item.toLowerCase().includes(this.searchQueryA.toLowerCase()));
  }

  get filteredListB(): string[] {
    return this.listB.filter(item => item.toLowerCase().includes(this.searchQueryB.toLowerCase()));
  }

  get filteredRegB(): string[] {
    return this.regB.filter(item => item.toLowerCase().includes(this.searchQueryB.toLowerCase()));
  }

  get filteredAreaB(): string[] {
    return this.areaB.filter(item => item.toLowerCase().includes(this.searchQueryB.toLowerCase()));
  }

  // Add item to listB (move from listA to listB)
  addToListB(item: string): void {
    const index = this.listA.indexOf(item);
    if (index !== -1) {
      // Remove from listA and add to listB
      this.listA.splice(index, 1);
      this.listB.push(item);
    }
  }

  // Remove item from listB (move back to listA)
  removeFromListB(item: string): void {
    const index = this.listB.indexOf(item);
    if (index !== -1) {
      // Remove from listB and add back to listA
      this.listB.splice(index, 1);
      this.listA.push(item);
    }
  }

  // Add all items from listA to listB (move all from listA to listB)
  addAllToListB(): void {
    this.listA.forEach(item => {
      if (!this.listB.includes(item)) {
        this.listB.push(item);
      }
    });
    // Clear listA
    this.listA = [];
  }

  // Remove all items from listB and move to listA
  removeAllFromListB(): void {
    this.listB.forEach(item => {
      if (!this.listA.includes(item)) {
        this.listA.push(item);
      }
    });
    // Clear listB
    this.listB = [];
  }

  // Add item to regB (move from regA to regB)
  addToregB(item: string): void {
    const index = this.regA.indexOf(item);
    if (index !== -1) {
      // Remove from regA and add to regB
      this.regA.splice(index, 1);
      this.regB.push(item);
    }
  }

  // Remove item from regB (move back to regA)
  removeFromregB(item: string): void {
    const index = this.regB.indexOf(item);
    if (index !== -1) {
      // Remove from regB and add back to regA
      this.regB.splice(index, 1);
      this.regA.push(item);
    }
  }

  // Add all items from regA to regB (move all from regA to regB)
  addAllToRegB(): void {
    this.regA.forEach(item => {
      if (!this.regB.includes(item)) {
        this.regB.push(item);
      }
    });
    // Clear regA
    this.regA = [];
  }

  // Remove all items from regB and move to regA
  removeAllFromRegB(): void {
    this.regB.forEach(item => {
      if (!this.regA.includes(item)) {
        this.regA.push(item);
      }
    });
    // Clear regB
    this.regB = [];
  }

  // Add item to areaB (move from areaA to areaB)
  addToAreaB(item: string): void {
    const index = this.areaA.indexOf(item);
    if (index !== -1) {
      // Remove from areaA and add to areaB
      this.areaA.splice(index, 1);
      this.areaB.push(item);
    }
  }

  // Remove item from areaB (move back to areaA)
  removeFromAreaB(item: string): void {
    const index = this.areaB.indexOf(item);
    if (index !== -1) {
      // Remove from areaB and add back to areaA
      this.areaB.splice(index, 1);
      this.areaA.push(item);
    }
  }

  // Add all items from areaA to areaB (move all from areaA to areaB)
  addAllToAreaB(): void {
    this.areaA.forEach(item => {
      if (!this.areaB.includes(item)) {
        this.areaB.push(item);
      }
    });
    // Clear areaA
    this.areaA = [];
  }

  // Remove all items from areaB and move to areaA
  removeAllFromAreaB(): void {
    this.areaB.forEach(item => {
      if (!this.areaA.includes(item)) {
        this.areaA.push(item);
      }
    });
    // Clear areaB
    this.areaB = [];
  }
}
