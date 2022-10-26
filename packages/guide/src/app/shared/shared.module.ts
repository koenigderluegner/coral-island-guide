import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UiIconComponent } from './components/ui-icon/ui-icon.component';
import { ItemIconComponent } from './components/item-icon/item-icon.component';
import { RarityIconComponent } from './components/rarity-icon/rarity-icon.component';

@NgModule({
  declarations: [UiIconComponent, ItemIconComponent, RarityIconComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [
    UiIconComponent
  ]
})
export class SharedModule {
}
