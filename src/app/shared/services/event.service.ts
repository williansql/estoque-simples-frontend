import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

    listCategoryEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
    listSubcategoryEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }
}
