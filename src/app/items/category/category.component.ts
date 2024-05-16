import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialImportsModule } from '../../shared/modules/material-imports/material-imports.module';
import { ICategory } from './icategory';
import { IPagination } from '../../shared/models/ipagination';
import { CategoryService } from './category.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, MaterialImportsModule],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
})
export class CategoryComponent {
    listCategory: ICategory[] = [];

    categoryData: any;

    pagination: IPagination = {
        page: 0,
        size: 10,
        offset: 0,
        totalNumberOfElements: 0,
        numberOfElements: 0,
        numberOfPages: 0,
    };

    data = {
        page: 0,
        size: 5,
        name: '',
    };

    constructor(private categoryService: CategoryService) {}

    ngOnInit() {
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoryService
            .getAllCategories()
            .subscribe((data)=> {
                console.log(data);

            })
    }
}
