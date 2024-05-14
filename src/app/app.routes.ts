import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./items/category/category.component')
        .then((m) => m.CategoryComponent),
    }
];
