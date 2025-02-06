import { Routes } from '@angular/router';


export const routes: Routes = [
    {path: '', loadComponent: () => import('./settings.component').then(m => m.SettingsComponent), title: 'Settings'}
];
