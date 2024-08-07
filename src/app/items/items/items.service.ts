import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItems } from './iitems';
import { environment } from '../../../environments/environment';

const API = `${environment.baseApi}/items`;

@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    refreshListItem: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient) { }


    getItems(data?: any): Observable<IItems[]> {
        return this.http.get<IItems[]>(API, { params: data });
    }

    createItem(data: any): Observable<IItems> {
        return this.http.post<IItems>(API, data);
    }

    generateCodItem() {

    }
}
