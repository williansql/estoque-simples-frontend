import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ICategory } from '../icategory';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from '../../../shared/modules/material-imports/material-imports.module';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubheaderService } from '../../../shared/components/subheader/subheader.service';
import { CategoryService } from '../category.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-category-update',
    standalone: true,
    imports: [
        CommonModule,
        MaterialImportsModule,
        SubheaderComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './category-update.component.html',
    styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent {

    category?: ICategory;
    categoryForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private modalService: ModalService,
        private toastr: ToastrService,
        private router: Router

    ) {
        this.categoryForm = this.fb.group({
            name: [null]
        })
    }

    ngOnInit(): void {
        this.categoryForm.patchValue({
            name: this.category?.name
        })
    }

    updateCategory() {
        this.categoryService.updateCategory(this.category!.id, this.categoryForm.value).subscribe((data: any) => {
            this.modalService.close();
            this.router.navigate(['/category']);
            this.toastr.success(data.message);
            this.categoryService.refreshList.emit(true);
        },
        (error) => {
            this.toastr.error(error.error.message);
        }
    )
    }

    changeClose() {
        this.modalService.close();
        this.router.navigate(['/category']);
    }
}
