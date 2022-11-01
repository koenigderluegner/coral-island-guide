import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UiIconComponent } from './components/ui-icon/ui-icon.component';
import { ItemIconComponent } from './components/item-icon/item-icon.component';
import { RarityIconComponent } from './components/rarity-icon/rarity-icon.component';
import { ModuleSidebarComponent } from './components/module-sidebar/module-sidebar.component';
import { ModuleSidebarItemComponent } from './components/module-sidebar-item/module-sidebar-item.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { QualityGridComponent } from './components/quality-grid/quality-grid.component';
import { MoneyComponent } from './components/money/money.component';
import { BaseItemCardComponent } from './components/base-item-card/base-item-card.component';
import { MaxPipe } from './pipes/max.pipe';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarContainerComponent } from './components/sidebar-container/sidebar-container.component';
import { ListDetailContainerComponent } from './components/list-detail-container/list-detail-container.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InlineMinimalItemComponent } from './components/inline-minimal-item/inline-minimal-item.component';
import { ResponsiveTableComponent } from './components/responsive-table/responsive-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    UiIconComponent,
    ItemIconComponent,
    RarityIconComponent,
    ModuleSidebarComponent,
    ModuleSidebarItemComponent,
    CardComponent,
    QualityGridComponent,
    MoneyComponent,
    BaseItemCardComponent,
    MaxPipe,
    ItemListComponent,
    SidebarContainerComponent,
    ListDetailContainerComponent,
    InlineMinimalItemComponent,
    ResponsiveTableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatSelectModule,
    MatMenuModule,
    MatTabsModule,
    MatSidenavModule,
    MatTableModule,
  ],
  exports: [
    UiIconComponent,
    ModuleSidebarComponent,
    ModuleSidebarItemComponent,
    ItemIconComponent,
    CardComponent,
    QualityGridComponent,
    BaseItemCardComponent,
    MoneyComponent,
    MaxPipe,
    ItemListComponent,
    SidebarContainerComponent,
    ListDetailContainerComponent,
    InlineMinimalItemComponent,
    ResponsiveTableComponent,
  ],
})
export class SharedModule {
}
