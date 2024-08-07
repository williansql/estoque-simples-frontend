import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialImportsModule } from '../../../shared/modules/material-imports/material-imports.module';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { SubheaderService } from '../../../shared/components/subheader/subheader.service';
import { TableCatComponent } from './table-cat/table-cat.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialImportsModule,
    SubheaderComponent,
    TableCatComponent,
    RouterLink
  ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.scss'
})
export class CategoryTableComponent {

    ngOnInit(): void {

    }

}
