import { Routes } from '@angular/router';
import { CategoryTableComponent } from './items/category/category-table/category-table.component';
import { CategoryCreateComponent } from './items/category/category-create/category-create.component';


export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: CategoryTableComponent },
    { path: 'create', component: CategoryCreateComponent },
];
