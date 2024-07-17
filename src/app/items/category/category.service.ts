import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory } from './icategory';

const API = `${environment.baseApi}/category`;

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor( private http: HttpClient ) { }

    createCategory(data: any): Observable<ICategory>{
        return this.http.post<ICategory>(API, data);
    }

    getCategories(data: any): Observable<ICategory[]>{
        return this.http.get<ICategory[]>(API, {
            params: data
        });
    }

    getAllCategories(data?: any): Observable<ICategory[]>{
        return this.http.get<ICategory[]>(API, {
            params: {
                ...data
            }
        })
      }

      updateCategory(id?: any, data?: any): Observable<any>{
        const url = `${API}/${id}`
        return this.http.put<any>(url, data)
      }

      deleteCategory(id: number): Observable<any> {
        const url = `${API}/${id}`
        return this.http.delete<any>(url)
    }

}
