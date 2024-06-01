import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SubheaderModalComponent } from '../../../shared/components/subheader-modal/subheader-modal.component';
import { CategoryService } from '../category.service';
import { ICategory } from '../icategory';
import { SubheaderModalService } from '../../../shared/components/subheader-modal/subheader-modal.service';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SubheaderModalComponent,
  ],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent {

    category?: ICategory
    categoryForm: FormGroup

    constructor(
        private categoryService: CategoryService,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private subheaderModal: SubheaderModalService
    ){
        this.categoryForm = this.fb.group({
            name: [null, Validators.required]
        })

    }

    ngOnInit(){
        this.subheaderModal.subheaderData = {
            title: "Categoria",
            subtitle: "Edite sua categoria"
        }
        this.categoryForm.get('name')?.patchValue(this.category?.name)
    }

    updateCategory(){
        let category = {
            name: this.categoryForm.get('name')?.value
        }
        this.categoryService.updateCategory(this.category?.id, category).subscribe((data) => {
            console.log(data);
            this.toastr.success(data.message)
            this.categoryForm.reset()
        },
        (err: any) => {
            this.toastr.error(err.error.error);
        }
    )}



}
