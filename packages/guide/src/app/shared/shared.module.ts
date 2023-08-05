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
import { SpacesToPascalCasePipe } from './pipes/spaces-to-pascal-case.pipe';
import { IsCropPipe } from './pipes/is-crop.pipe';
import { RefinementsListComponent } from './components/refinements-list/refinements-list.component';
import { CastToQualityPipe } from './pipes/cast-to-quality.pipe';
import { ProcessingTimeComponent } from './components/processing-time/processing-time.component';
import { ProcessingTimePerQualityComponent } from './components/processing-time-per-quality/processing-time-per-quality.component';
import { TableItemListComponent } from './components/table-item-list/table-item-list.component';
import { CraftingRecipeIngredientsPipe } from './pipes/crafting-recipe-ingredients.pipe';
import { CookingRecipeIngredientsPipe } from './pipes/cooking-recipe-ingredients.pipe';
import { CastToMinimalItemArrayPipe } from './pipes/cast-to-minimal-item-array.pipe';
import { ItemProcessingIngredientsPipe } from './pipes/item-processing-ingredients.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddSpacesToPascalCasePipe } from './pipes/add-spaces-to-pascal-case.pipe';
import { DataFilterComponent } from './components/data-filter/data-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IsItemPipe } from './pipes/is-item.pipe';
import { NonSpecializedTableComponent } from './components/non-specialized-table/non-specialized-table.component';
import { MatSortModule } from '@angular/material/sort';
import { IsBaseCropPipe } from './pipes/is-base-crop.pipe';
import { BaseSelectableContainerComponent } from './components/base-selectable-container/base-selectable-container.component';
import { BaseTabbedSelectableContainerComponent } from './components/base-tabbed-selectable-container/base-tabbed-selectable-container.component';
import { IsFishPipe } from './pipes/is-fish.pipe';

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
        SpacesToPascalCasePipe,
        IsCropPipe,
        RefinementsListComponent,
        CastToQualityPipe,
        ProcessingTimeComponent,
        ProcessingTimePerQualityComponent,
        TableItemListComponent,
        CraftingRecipeIngredientsPipe,
        CookingRecipeIngredientsPipe,
        CastToMinimalItemArrayPipe,
        ItemProcessingIngredientsPipe,
        AddSpacesToPascalCasePipe,
        DataFilterComponent,
        IsItemPipe,
        NonSpecializedTableComponent,
        IsBaseCropPipe,
        BaseSelectableContainerComponent,
        BaseTabbedSelectableContainerComponent,
        IsFishPipe,
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
        MatTooltipModule,
        ReactiveFormsModule,
        MatSortModule,
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
        SpacesToPascalCasePipe,
        IsCropPipe,
        RefinementsListComponent,
        RarityIconComponent,
        CastToQualityPipe,
        ProcessingTimeComponent,
        ProcessingTimePerQualityComponent,
        TableItemListComponent,
        CraftingRecipeIngredientsPipe,
        CookingRecipeIngredientsPipe,
        CastToMinimalItemArrayPipe,
        ItemProcessingIngredientsPipe,
        AddSpacesToPascalCasePipe,
        DataFilterComponent,
        IsItemPipe,
        NonSpecializedTableComponent,
        IsBaseCropPipe,
        IsFishPipe,
    ],
})
export class SharedModule {
}
