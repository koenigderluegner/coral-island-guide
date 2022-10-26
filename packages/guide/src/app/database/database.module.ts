import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseComponent } from './database.component';

const routes: Routes = [{path: '', component: DatabaseComponent}];

@NgModule({
  declarations: [DatabaseComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DatabaseModule {
}
