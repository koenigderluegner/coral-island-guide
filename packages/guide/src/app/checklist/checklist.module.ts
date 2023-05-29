import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistComponent } from './checklist.component';


const routes: Routes = [
  { path: '', component: ChecklistComponent }
];

@NgModule({
  declarations: [
    ChecklistComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ChecklistModule { }
