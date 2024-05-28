import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MaterialImportsModule } from '../../shared/modules/material-imports/material-imports.module';
import { ICategory } from './icategory';
import { IPagination } from '../../shared/models/ipagination';
import { CategoryService } from './category.service';
import { map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { EventService } from '../../shared/services/event.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubheaderComponent } from '../../shared/components/subheader/subheader.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, MaterialImportsModule, SubheaderComponent, RouterLink],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
})
export class CategoryComponent {

    title = 'Categoria'
    subtitle = 'Veja aqui suas categorias'

    categoryForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ){
        this.categoryForm = this.fb.group({
            name: ''
        })
    }

    private categoryService = inject(CategoryService);

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
        page: 0,
        size: 5,
    };


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
            .subscribe((response: any) => {
                this.listCategory = response.data.content
                this.pagination = response.data.pagination
                console.log(this.pagination);
                console.log(this.listCategory);
            })
    }
}
