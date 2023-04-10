import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseComponent } from './database.component';

const routes: Routes = [
    {
        path: '',
        component: DatabaseComponent,
        title: 'Database'
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DatabaseRoutingModule {
}
