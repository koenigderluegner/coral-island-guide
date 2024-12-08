import { Routes } from '@angular/router';
import { ToDoComponent } from './to-do.component';

export const routes: Routes = [
    {path: '', component: ToDoComponent},
    {path: ':toDoId', redirectTo: ''},
];
