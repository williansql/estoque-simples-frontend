import { Injectable } from '@angular/core';
import { items } from '../../../../.history/src/app/items/items/iitems_20240724175246';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateCodItemService {

    items: items[] = [];

  constructor( private itemsService: ItemsService ) { }

  generateCodItem() {
    const countItem = this.items.length;
    return countItem;
  }

  getAllItems(){
    this.itemsService.getItems().subscribe((data: any) => {
        this.items = data.data.content;
    })
  }

}
