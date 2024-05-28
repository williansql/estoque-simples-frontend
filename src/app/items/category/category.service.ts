import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const apiCategory = `${environment.baseApi}/category`

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  createCategory(data: any): Observable<any>{
    return this.http.post<any>(apiCategory, {
        ...data
    })
  }

  getAllCategories(data: any): Observable<any[]>{
    return this.http.get<any[]>(apiCategory, {
        params: {
            ...data
        }
    })
  }


}
