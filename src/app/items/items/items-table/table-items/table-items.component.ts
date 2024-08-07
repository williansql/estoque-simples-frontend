import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ItemsService } from '../../items.service';
import { IItems } from '../../iitems';
import { IPagination } from '../../../../shared/models/ipagination';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { ItemsDeleteComponent } from '../../items-delete/items-delete.component';
import { MaterialImportsModule } from '../../../../shared/modules/material-imports/material-imports.module';
import { ExpandTableComponent } from '../expand-table/expand-table.component';
import { ItemsUpdateComponent } from '../../items-update/items-update.component';

@Component({
  selector: 'app-table-items',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    MaterialImportsModule,
    ExpandTableComponent,

  ],
  templateUrl: './table-items.component.html',
  styleUrl: './table-items.component.scss'
})
export class TableItemsComponent {

    itemsForm: FormGroup

    items: IItems[] = [];

    expandItems?: number;

    itensService = inject(ItemsService);
    toastr = inject(ToastrService);
    modal = inject(ModalService);

    constructor(
        private fb: FormBuilder,
    ){
        this.itemsForm = this.fb.group({
            name: '',
        })
    }

    pagination: IPagination = {
        page: 0,
        size: 10,
        offset: 0,
        totalNumberOfElements: 0,
        numberOfElements: 0,
        numberOfPages: 0,
    }

    data = {
        name: '',
        size: 0,
        page: 0,
    }

    ngOnInit(): void {
        this.getAllItems();
        this.itensService.refreshListItem.subscribe(() => {
            this.getAllItems();
        })
    }

    handlePageEvent(event: any){
        this.pagination.page = event.pageIndex;
        this.pagination.size = event.pageSize;
        this.getAllItems(this.pagination);
    }

    getAllItems(params?: any){
        this.itensService.getItems(params).subscribe((data: any) => {
            this.items = data.data.content;
            this.pagination = data.data.pagination;
        },
        (error) => {
            this.toastr.error(error.error.message);
        })
    }

    showInfoItems(i: number){
        if (i == this.expandItems)
			return (this.expandItems = -1)
		else return (this.expandItems = i)
    }

    editItemsModal(i: number){
        this.modal.open(ItemsDeleteComponent, { itemUpdate: this.items[i] });
    }

    deleteItem(i: number){
        this.modal.open(ItemsDeleteComponent)
    }

    openModalUpdateItems(i: number){
        this.modal.open(ItemsUpdateComponent, { itemUpdate: this.items[i] }).subscribe();
    }

    getProfit(i: number): any {
        const buyPrice = this.items[i].buyPrice;
        const sellPrice = this.items[i].sellPrice;
        if (buyPrice && sellPrice) {
            const profit = ((sellPrice - buyPrice) / buyPrice) * 100;
            return profit >= 0 ? `${profit.toFixed(2)}%` : `-${Math.abs(profit).toFixed(2)}%`;
        }
        return '0%';
    }
}
