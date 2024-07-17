import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        MatIconModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatDividerModule,
        MatAutocompleteModule,

    ],
})
export class MaterialImportsModule {}
