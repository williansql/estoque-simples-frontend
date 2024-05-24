import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialImportsModule } from '../../shared/modules/material-imports/material-imports.module';
import { ICategory } from './icategory';
import { IPagination } from '../../shared/models/ipagination';
import { CategoryService } from './category.service';
import { map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, MaterialImportsModule],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
})
export class CategoryComponent {
    listCategory: ICategory[] = [];

    pagination: IPagination = {
        page: 0,
        size: 10,
        offset: 0,
        totalNumberOfElements: 0,
        numberOfElements: 0,
        numberOfPages: 0,
    };

    data = {
        size: 5,
        name: '',
    };

    displayedColumns: string[] = ['nome'];

    constructor(private categoryService: CategoryService) {}

    ngOnInit() {
        this.getAllCategories(this.data);

    }

    handlePageEvent(e: PageEvent) {
		this.pagination.size = e.pageSize
		this.pagination.page = e.pageIndex
		this.pagination.numberOfElements = e.length
		this.getAllCategories(this.pagination)
	}

    getAllCategories(params: any) {
        this.categoryService
            .getAllCategories(params)
            .pipe(
                map ((req: any) => {
                    return req.data
                })
            ).subscribe({
                next: ((req: any) => {
                    this.listCategory = req.content
                    this.pagination = req.pagination
                    console.log(this.listCategory);
                    console.log(this.pagination);

                })
            })
    }
}
