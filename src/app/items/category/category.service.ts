import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory } from './icategory';

const apiCategory = environment.baseApi + '/category'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  createCategory(): Observable<ICategory>{
    return this.http.post<any>(apiCategory);
  }

  getAllCategories(data?: any): Observable<any>{
    return this.http.get<>(apiCategory)
  }


}
