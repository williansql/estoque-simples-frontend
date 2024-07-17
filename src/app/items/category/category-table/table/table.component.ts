import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MaterialImportsModule } from '../../../../shared/modules/material-imports/material-imports.module';
import { ICategory } from '../../icategory';
import { CategoryService } from '../../category.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { CategoryUpdateComponent } from '../../category-update/category-update.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialImportsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

    category: ICategory[] = [];

    closeModal: boolean = false;

    categoryService = inject(CategoryService);
    modalService = inject(ModalService);

    data = {
        size: 10,
        page: 0
    }

    ngOnInit(): void {
        this.getAllCategories();

        if(this.closeModal){
            this.modalService.close();
        }

    }

    getAllCategories() {
        this.categoryService.getCategories(this.data).subscribe((data: any) => {
            this.category = data.data.content;
            console.log(this.category);
        })
    }

    editCategoryModal(i: number){
        this.modalService.open(CategoryUpdateComponent, {category: this.category[i]}).subscribe();
    }
}
