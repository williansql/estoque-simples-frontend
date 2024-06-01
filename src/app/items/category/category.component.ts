import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SubheaderService } from '../../shared/components/subheader/subheader.service';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [
        CommonModule,
        CategoryTableComponent,
        CategoryCreateComponent,
        CategoryUpdateComponent,
        RouterLink
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
})
export class CategoryComponent {

    constructor(
        private subheaderService: SubheaderService,
    ){
        this.subheaderService.subheaderData = {
            title: 'Categoria',
            subtitle: 'Veja e cadastre suas categorias'
        }
    }

}
