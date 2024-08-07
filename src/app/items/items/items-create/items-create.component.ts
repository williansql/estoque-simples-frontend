import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../category/category.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubheaderComponent } from '../../../shared/components/subheader/subheader.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { UnitMeasure } from '../unit-measure';
import { ICategory } from '../../category/icategory';
import { IPagination } from '../../../shared/models/ipagination';
import { ItemsService } from '../items.service';

@Component({
    selector: 'app-items-create',
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
    templateUrl: './items-create.component.html',
    styleUrl: './items-create.component.scss'
})
export class ItemsCreateComponent {

    itemsForm: FormGroup;

    profit: any;

    categories: ICategory[] = [];

    unitMeasure = UnitMeasure.slice();

    unitMeasureOption?: Observable<any[]>;
    categoryOption?: Observable<ICategory[]>;

    pagination: IPagination = {
        page: 0,
        size: Infinity,
    }

    // @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete?: MatAutocompleteTrigger;

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

    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.unitMeasure.filter(option => option.toLowerCase().includes(filterValue));
    }

    private _filterCategory(value: string): ICategory[] {
        const filterValue = value.toLowerCase();
        return this.categories.filter(option => option.name.toLowerCase().includes(filterValue));
    }

}


