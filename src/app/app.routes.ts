import { Routes } from '@angular/router';
import { CategoryComponent } from './items/category/category.component';
import { CategoryCreateComponent } from './items/category/category-create/category-create.component';


export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: CategoryComponent },
    { path: 'category/create', component: CategoryCreateComponent },
];
