import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { CategoryService } from '../category.service';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { useAnimation } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { catchError } from 'rxjs';

const toastConfig = {
	timeOut: 3000,
	positionClass: 'toast-top-right',
	preventDuplicates: true,
	closeButton: true,
	tapToDismiss: true,
	progressBar: true,
}

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    CommonModule,
    SubheaderComponent,
    RouterLink,
    ReactiveFormsModule,
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
        private fb: FormBuilder,
        private toast: ToastrService
    ){
        this.categoryForm = this.fb.group({
            name: [null, Validators.required]
        });
    }


    saveCategory(){
        let category = {
            name: this.categoryForm.get('name')?.value
        }
        this.categoryService.createCategory(category).subscribe((data) =>{
            console.log(data);
            this.toast.success(data.message);
            this.categoryForm.reset()
        },
        (error: any) => {
            this.toast.error(error.error.message);
          }
    )
    }

}
