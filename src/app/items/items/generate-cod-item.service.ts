import { Injectable } from '@angular/core';
import { ItemsService } from './items.service';
import { IItems } from './iitems';

@Injectable({
  providedIn: 'root'
})
export class GenerateCodItemService {

    items: IItems[] = [];

  constructor( private itemsService: ItemsService ) { }

  generateCodItem(data: string) {
    const countItem = this.items.length;
    const codItem = data + countItem;
    return codItem;
  }

  getAllItems(){
    this.itemsService.getItems().subscribe((data: any) => {
      this.items = data.data.content;
    })
  }

}
