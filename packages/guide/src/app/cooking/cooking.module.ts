import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CookingComponent } from './cooking.component';

const routes: Routes = [{path: '', component: CookingComponent}];

@NgModule({
  declarations: [CookingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CookingModule {
}
