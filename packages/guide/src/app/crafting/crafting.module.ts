import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CraftingComponent } from './crafting.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{path: '', component: CraftingComponent}];

@NgModule({
  declarations: [CraftingComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CraftingModule {
}
