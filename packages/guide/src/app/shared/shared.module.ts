import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UiIconComponent } from './components/ui-icon/ui-icon.component';
import { ItemIconComponent } from './components/item-icon/item-icon.component';
import { RarityIconComponent } from './components/rarity-icon/rarity-icon.component';
import { ModuleSidebarComponent } from './components/module-sidebar/module-sidebar.component';
import { ModuleSidebarItemComponent } from './components/module-sidebar-item/module-sidebar-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UiIconComponent,
    ItemIconComponent,
    RarityIconComponent,
    ModuleSidebarComponent,
    ModuleSidebarItemComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [UiIconComponent, ModuleSidebarComponent, ModuleSidebarItemComponent],
})
export class SharedModule {
}
