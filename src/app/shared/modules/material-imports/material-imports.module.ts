import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        MatIconModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
    ],
})
export class MaterialImportsModule {}
