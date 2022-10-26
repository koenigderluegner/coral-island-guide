import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookingComponent } from './cooking.component';

const routes: Routes = [{path: '', component: CookingComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookingRoutingModule {
}
