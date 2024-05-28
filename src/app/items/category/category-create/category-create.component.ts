import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../../.history/src/app/items/category/category.service_20240527233448';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    CommonModule,
    SubheaderComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent {

    title = 'Categoria'
    subtitle = 'Cadastre suas categorias'

    categoryForm: FormGroup;

    categoryService = inject(CategoryService);

    constructor(
        private fb: FormBuilder
    ){
        this.categoryForm = this.fb.group({
            name: [null, Validators.required]
        });
    }

    saveCategory(){
        let category = {
            name: this.categoryForm.get('name')?.value
        }
        this.categoryService.createCategory(category).subscribe(() =>{
            alert('Categoria cadastrada.');
        })
    }

}
