import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MaterialImportsModule } from '../../../../shared/modules/material-imports/material-imports.module';
import { ICategory } from '../../icategory';
import { CategoryService } from '../../category.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { CategoryUpdateComponent } from '../../category-update/category-update.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { IPagination } from '../../../../shared/models/ipagination';
import { PageEvent } from '@angular/material/paginator';
import { CategoryDeleteComponent } from '../../category-delete/category-delete.component';

@Component({
    selector: 'app-table-cat',
    standalone: true,
    imports: [
        CommonModule,
        MaterialImportsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './table-cat.component.html',
    styleUrl: './table-cat.component.scss'
})
export class TableCatComponent {

    categoryForm: FormGroup

    category: ICategory[] = [];

    categoryService = inject(CategoryService);
    modalService = inject(ModalService);

    constructor(
        private fb: FormBuilder,
    ) {
        this.categoryForm = this.fb.group({
            name: [null]
        });
    }

    pagination: IPagination = {
        page: 0,
        size: 10,
        offset: 0,
        totalNumberOfElements: 0,
        numberOfElements: 0,
        numberOfPages: 0,
    }


    data = {
        size: 5,
        page: 0,
        name: ''
    }

    ngOnInit(): void {

        this.findCategory();
        this.getAllCategories(this.data);
        this.categoryService.refreshList.subscribe(() => {
            this.getAllCategories();
        })
    }

    handlePageEvent(e: PageEvent) {
        this.pagination.size = e.pageSize;
        this.pagination.page = e.pageIndex;
        this.pagination.numberOfElements = e.length
        this.getAllCategories(this.pagination)
    }

    findCategory() {
        this.categoryForm.get('name')?.valueChanges.pipe(
            debounceTime(500)).subscribe((req) => {
                this.data.name = req;
                this.getAllCategories(this.data);
            })
    }

    getAllCategories(params?: any) {
        this.categoryService.getCategories(params)
            .subscribe((data: any) => {
                console.log(data);
                this.category = data.data.content;
                this.pagination = data.data.pagination;
                console.log(this.pagination);
            })
    }

    editCategoryModal(i: number) {
        this.modalService.open(CategoryUpdateComponent, { category: this.category[i] }).subscribe();
    }

    deleteCategory(i: number) {
        this.modalService.open(CategoryDeleteComponent, { category: this.category[i] }).subscribe();
    }
}
