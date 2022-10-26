import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CraftingComponent } from './crafting.component';

const routes: Routes = [{path: '', component: CraftingComponent}];

@NgModule({
  declarations: [CraftingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CraftingModule {
}
