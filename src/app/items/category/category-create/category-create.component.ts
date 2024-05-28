import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { CategoryService } from '../category.service';

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

    constructor(
        private categoryService: CategoryService,
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
