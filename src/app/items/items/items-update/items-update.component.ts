import { Component } from '@angular/core';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../category/icategory';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { UnitMeasure } from '../unit-measure';
import { IPagination } from '../../../shared/models/ipagination';
import { CategoryService } from '../../category/category.service';
import { ItemsService } from '../items.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MaterialImportsModule } from '../../../shared/modules/material-imports/material-imports.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IItems } from '../iitems';

@Component({
    selector: 'app-items-update',
    standalone: true,
    imports: [
        CommonModule,
        SubheaderComponent,
        RouterLink,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
        FormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
    ],
    templateUrl: './items-update.component.html',
    styleUrl: './items-update.component.scss'
})
export class ItemsUpdateComponent {

    itemsForm: FormGroup;

    itemUpdate?: IItems;

    categories: ICategory[] = [];

    unitMeasure = UnitMeasure.slice();

    unitMeasureOption?: Observable<any[]>;
    categoryOption?: Observable<ICategory[]>;

    pagination: IPagination = {
        page: 0,
        size: Infinity,
    }

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private itemsService: ItemsService,
        private router: Router,
        private toastr: ToastrService,
    ) {
        this.itemsForm = this.fb.group({
            name: [null, Validators.required],
            coditem: [null, Validators.required],
            model: [null, Validators.required],
            branding: null,
            description: null,
            sku: null,
            buyPrice: [null, Validators.required],
            sellPrice: [null, Validators.required],
            unitMeasureEnum: [null, Validators.required],
            unitMeasureQtd: [null, Validators.required],
            statusEnum: null,
            qtd: [null, Validators.required],
            category: ['', Validators.required],
        })
    }

    ngOnInit(): void {
        this.InitValueItemsForm();
        this.getCategory();
        this.unitMeasureOption = this.itemsForm.get('unitMeasureEnum')?.valueChanges.pipe(
            debounceTime(300),
            startWith(''),
            map(value => this._filter(value || '')),
        );

        this.categoryOption = this.itemsForm.get('category')?.valueChanges.pipe(
            debounceTime(300),
            startWith(''),
            map(value => this._filterCategory(value || '')),
        );
    }

    openOrClosePanel(e: any, trigger: MatAutocompleteTrigger) {
        e.stopPropagation();
        if (trigger.panelOpen)
            trigger.closePanel();
        else
            trigger.openPanel();
    }

    displayFn(category: ICategory): string {
        return category && category?.name ? category.name : '';
    }

    getCategory() {
        this.categoryService.getAllCategories().subscribe((data: any) => {
            this.categories = data.data.content;
        })
    }

    createItem() {
        this.itemsService.createItem(this.itemsForm.value).subscribe((data: any) => {
            console.log(data);
            this.toastr.success(data.message);
            this.itemsForm.reset();
            this.router.navigate(['/items']);
            this.itemsService.refreshListItem.emit(true);
        },
            (error) => {
                this.toastr.error(error.error.message);
            })
    }

    getProfit(): string {
        const buyPrice = this.itemsForm.value.buyPrice;
        const sellPrice = this.itemsForm.value.sellPrice;

        if (buyPrice && sellPrice) {
            const profit = ((sellPrice - buyPrice) / buyPrice) * 100;
            return profit >= 0 ? `${profit.toFixed(2)}%` : `-${Math.abs(profit).toFixed(2)}%`;
        }
        return '0%';
    }

    InitValueItemsForm(){
        this.itemsForm.patchValue({
            name: this.itemUpdate?.name,
            coditem: this.itemUpdate?.codItem,
            model: this.itemUpdate?.model,
            branding: this.itemUpdate?.branding,
            description: this.itemUpdate?.description,
            sku: this.itemUpdate?.sku,
            buyPrice: this.itemUpdate?.buyPrice,
            sellPrice: this.itemUpdate?.sellPrice,
            unitMeasureEnum: this.itemUpdate?.unitMeasureEnum,
            unitMeasureQtd: this.itemUpdate?.unitMeasureQtd,
            statusEnum: this.itemUpdate?.statusEnum,
            qtd: this.itemUpdate?.qtd,
            category: this.itemUpdate?.category
        })
    }

    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.unitMeasure.filter(option => option.toLowerCase().includes(filterValue));
    }

    private _filterCategory(value: string): ICategory[] {
        const filterValue = value.toLowerCase();
        return this.categories.filter(option => option.name.toLowerCase().includes(filterValue));
    }

}
