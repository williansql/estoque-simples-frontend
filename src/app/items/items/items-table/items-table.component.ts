import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { TableItemsComponent } from './table-items/table-items.component';

@Component({
  selector: 'app-items-table',
  standalone: true,
  imports: [
    RouterLink,
    SubheaderComponent,
    TableItemsComponent,
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss'
})
export class ItemsTableComponent {

}
