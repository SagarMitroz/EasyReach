import { Component } from '@angular/core';
import { AssetListTableComponent } from "./asset-list-table/asset-list-table.component";

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [AssetListTableComponent],
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.scss'
})
export class AssetListComponent {

}
