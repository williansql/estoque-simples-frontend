import { Routes } from '@angular/router';
import { CategoryTableComponent } from './items/category/category-table/category-table.component';
import { CategoryCreateComponent } from './items/category/category-create/category-create.component';
import { ItemsTableComponent } from './items/items/items-table/items-table.component';
import { ItemsCreateComponent } from './items/items/items-create/items-create.component';


export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: CategoryTableComponent },
    { path: 'create', component: CategoryCreateComponent },
    { path: 'items', component: ItemsTableComponent },
    { path: 'items/create', component: ItemsCreateComponent },
];
