import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const apiCategory = `${environment.baseApi}/category`

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    listCategoryEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private http: HttpClient
  ) { }

  createCategory(data: any): Observable<any>{
    return this.http.post<any>(apiCategory, data)
  }

  getAllCategories(data?: any): Observable<any[]>{
    return this.http.get<any[]>(apiCategory, {
        params: {
            ...data
        }
    })
  }


}
