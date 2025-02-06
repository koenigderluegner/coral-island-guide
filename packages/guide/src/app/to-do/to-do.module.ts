import { Routes } from '@angular/router';


export const routes: Routes = [
    {path: '', loadComponent: () => import('./to-do.component').then(m => m.ToDoComponent)},
    {path: ':toDoId', redirectTo: ''},
];
