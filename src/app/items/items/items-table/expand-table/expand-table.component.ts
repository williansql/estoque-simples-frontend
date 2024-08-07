import { Component, Input } from '@angular/core';
import { IItems } from '../../iitems';

@Component({
    selector: 'app-expand-table',
    standalone: true,
    imports: [],
    templateUrl: './expand-table.component.html',
    styleUrl: './expand-table.component.scss'
})
export class ExpandTableComponent {

    @Input() codItem: any;
    @Input() name: any;
    @Input() category: any;
    @Input() model: any;
    @Input() branding: any;
    @Input() description: any;
    @Input() buyPrice: any;
    @Input() sellPrice: any;
    @Input() sku: any;
    @Input() unitMeasureEnum: any;
    @Input() unitMeasureQtd: any;
    @Input() qtd: any;
    @Input() profit: any;

}
