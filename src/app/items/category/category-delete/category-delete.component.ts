import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { ICategory } from '../icategory';

@Component({
  selector: 'app-category-delete',
  standalone: true,
  imports: [
    CommonModule,
    SubheaderComponent,
  ],
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.scss'
})
export class CategoryDeleteComponent {

    category?: ICategory

    categorySevice = inject(CategoryService);
    toastr = inject(ToastrService)
    modalService = inject(ModalService)

    deleteCategory(){
        this.categorySevice.deleteCategory(this.category?.id!).subscribe((data: any) =>{
            this.toastr.success(data.message);
            this.categorySevice.refreshList.emit(true);
            this.closeModal();
        })
    }

    closeModal(){
        this.modalService.close();
    }
}
