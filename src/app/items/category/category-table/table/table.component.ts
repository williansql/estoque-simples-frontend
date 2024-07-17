import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MaterialImportsModule } from '../../../../shared/modules/material-imports/material-imports.module';
import { ICategory } from '../../icategory';
import { CategoryService } from '../../category.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { CategoryUpdateComponent } from '../../category-update/category-update.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialImportsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

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


    data = {
        size: 10,
        page: 0,
        name: ''
    }

    ngOnInit(): void {

        this.findCategory();

        this.getAllCategories();

        this.categoryService.refreshList.subscribe(() => {
            this.getAllCategories();
        })
    }

    findCategory(){
        this.categoryForm.get('name')?.valueChanges.pipe(
            debounceTime(500)).subscribe((req) => {
                this.data.name = req;
                this.getAllCategories(this.data);
            })
    }

    getAllCategories(params?: any) {
        this.categoryService.getCategories(this.data).subscribe((data: any) => {
            this.category = data.data.content;
            console.log(this.category);
        })
    }

    editCategoryModal(i: number){
        this.modalService.open(CategoryUpdateComponent, {category: this.category[i]}).subscribe();
    }
}
