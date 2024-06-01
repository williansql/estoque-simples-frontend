import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';

import { ModalService } from '../../../shared/components/modal/modal.service';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { IPagination } from '../../../shared/models/ipagination';
import { MaterialImportsModule } from '../../../shared/modules/material-imports/material-imports.module';
import { CategoryService } from '../category.service';
import { ICategory } from '../icategory';
import { CategoryUpdateComponent } from '../category-update/category-update.component';

@Component({
    selector: 'app-category-table',
    standalone: true,
    imports: [
        CommonModule,
        MaterialImportsModule,
        SubheaderComponent,
        RouterLink,
        ReactiveFormsModule,
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './category-table.component.html',
    styleUrl: './category-table.component.scss',
})
export class CategoryTableComponent {
    categoryForm: FormGroup;

    categoryMap: Map<number, ICategory>;
    viewDeleteCategory = new Map<number, boolean>();

    selectedCategory: ICategory | null = null;

    @ViewChild('deleteCategories') deleteCategoriesTemplate?: TemplateRef<any>;

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private toastr: ToastrService,
        private modal: ModalService
    ) {
        this.categoryMap = new Map<number, ICategory>();
        this.categoryForm = this.fb.group({
            name: [''],
        });

    }

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
        name: '',
    };

    ngOnInit() {
        this.getAllCategories(this.data);
        this.findForm();
        this.categoryService.categoryEvent.subscribe(() => {
            this.getAllCategories(this.data);
        });
    }

    handlePageEvent(e: PageEvent) {
        this.pagination.size = e.pageSize;
        this.pagination.page = e.pageIndex;
        this.pagination.numberOfElements = e.length;
        this.getAllCategories(this.pagination);
    }

    findForm() {
        this.categoryForm
            .get('name')
            ?.valueChanges.pipe(debounceTime(800))
            .subscribe((req) => {
                this.data.name = req;
                this.getAllCategories(this.data);
            });
    }

    getAllCategories(params?: any) {
        this.categoryService
            .getAllCategories(params)
            .subscribe((response: any) => {
                this.listCategory = response.data.content;
                this.pagination = response.data.pagination;
                console.log(this.pagination);
                console.log(this.listCategory);
            });
    }

    showDeleteCategoriesOrNot(i: number) {
        this.selectedCategory = this.listCategory[i];
        this.viewDeleteCategory.set(
            i,
            !this.viewDeleteCategory.get(i) || false
        );
    }

    handleDeleteCategory() {
        if (this.selectedCategory) {
            const categoryId = this.selectedCategory.id;
            if (typeof categoryId === 'number') {
                this.deleteCategories(categoryId);
            } else {
                console.error('Erro: ID da categoria não é um número');
            }
        }
    }

    deleteCategories(id: number) {
        this.categoryService.deleteCategory(id).subscribe(() => {
            this.toastr.success('Categoria deletada');
            this.categoryService.categoryEvent.emit(true);
        });
    }

    openModal(i: number){
        this.modal.open(CategoryUpdateComponent, {category: this.listCategory[i]}).subscribe()
    }


}
