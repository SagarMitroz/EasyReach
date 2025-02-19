import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})
export class AssetsComponent {
  tabs = [
    {
      name: '275',
      color: '#ebf5fc',
      heading: 'Total Asset',

      cards: [
        { title: 'REF 3', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 2', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 3', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 4', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 5', text1: 'Some text', text2: 'Some text' },
        { title: 'REF 3', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 2', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 3', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 4', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 5', text1: 'Some text', text2: 'Some text' },
        { title: 'REF 3', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 2', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 3', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 4', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 5', text1: 'Some text', text2: 'Some text' },
        { title: 'REF 3', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 2', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 3', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 4', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 5', text1: 'Some text', text2: 'Some text' },
      ]

    },
    {
      name: '027',
      color: '#ebf5fc',
      heading: 'Missing Asset',

      cards: [
        { title: 'Card 1', text1: 'News text 1', text2: 'News text 2' },
        { title: 'Card 2', text1: 'News text 3', text2: 'News text 4' },
        { title: 'Card 4', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 5', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 1', text1: 'News text 1', text2: 'News text 2' },
        { title: 'Card 2', text1: 'News text 3', text2: 'News text 4' },
        { title: 'Card 4', text1: 'Some text', text2: 'Some text' },
        { title: 'Card 5', text1: 'Some text', text2: 'Some text' },
      ]
    },
    
  ];
  // activeTab: string = this.tabs[0].name; 
  // openPage(tabName: string, color: string): void {
  //   this.activeTab = tabName;
  // }
  activeTab: string = this.tabs[0].name;
  itemsPerPage: number = 15;
  currentPage: number = 1;

  openPage(tabName: string,color: string): void {
    //   this.activeTab = tabName;): void {
    this.activeTab = tabName;
    this.currentPage = 1; // Reset to the first page on tab change
  }

  get activeTabData() {
    return this.tabs.find(tab => tab.name === this.activeTab);
  }

  get paginatedCards() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.activeTabData?.cards.slice(startIndex, startIndex + this.itemsPerPage) || [];
  }

  get totalPages() {
    return Math.ceil((this.activeTabData?.cards.length || 0) / this.itemsPerPage);
  }

  changePage(increment: number): void {
    const newPage = this.currentPage + increment;
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }


  getPaginationRange(): number[] {
    const range: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      range.push(i);
    }
    return range;
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
