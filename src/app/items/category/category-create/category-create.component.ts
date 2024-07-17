import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { MaterialImportsModule } from '../../../shared/modules/material-imports/material-imports.module';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';
import { SubheaderService } from '../../../shared/components/subheader/subheader.service';

@Component({
    selector: 'app-category-create',
    standalone: true,
    imports: [
        CommonModule,
        SubheaderComponent,
        MaterialImportsModule,
        RouterLink,
        ReactiveFormsModule,
    ],
    templateUrl: './category-create.component.html',
    styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent {

    categoryForm: FormGroup


    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private router: Router,
        private toastr: ToastrService,
    ) {
        this.categoryForm = this.fb.group({
            name: ''
        })
    }

    ngOnInit(): void{

    }

    createCategory() {
        this.categoryService.createCategory(this.categoryForm.value).subscribe((data: any) =>{
            console.log(data);
            this.toastr.success(data.message);
            this.categoryForm.reset();
            this.router.navigate(['/category'])

        },
        (error) => {
            this.toastr.error(error.error.message);
        }
    )
    }
}
