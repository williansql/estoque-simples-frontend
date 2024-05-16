import { Routes } from '@angular/router';
import { CategoryComponent } from './items/category/category.component';


export const routes: Routes = [
    // {
    //     path: '',
    //     loadComponent: () =>
    //         import('./items/category/category.component')
    //     .then((m) => m.CategoryComponent),
    // }

    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: CategoryComponent }
];
