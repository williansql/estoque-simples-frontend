import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const apiCategory = `${environment.baseApi}/category`

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    categoryEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

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

  updateCategory(id?: any, data?: any): Observable<any>{
    const url = `${apiCategory}/${id}`
    return this.http.put<any>(url, data)
  }

  deleteCategory(id: number): Observable<any> {
    const url = `${apiCategory}/${id}`
    return this.http.delete<any>(url)
}

}
