import { Component, inject } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../shared/components/base-selectable-container/base-selectable-container.component";
import { ItemMixingRecipeData } from "@ci/data-types";
import { AsyncPipe } from "@angular/common";
import { DatabaseItemDetailsComponent } from "../../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../shared/directives/database-item-details.directive";
import { DatabaseService } from "../../shared/services/database.service";
import { MixingRecipeComponent } from "../../shared/components/database-item-details/mixing-recipe/mixing-recipe.component";
import { ListDetailContainerComponent } from "../../shared/components/list-detail-container/list-detail-container.component";
import { ItemIconComponent } from "../../shared/components/item-icon/item-icon.component";

@Component({
    selector: 'app-mixing',
    imports: [
        DatabaseItemDetailsComponent,
        AsyncPipe,
        DatabaseItemDetailsDirective,
        MixingRecipeComponent,
        ListDetailContainerComponent,
        ItemIconComponent
    ],
    templateUrl: './mixing.component.html'
})
export class MixingComponent extends BaseSelectableContainerComponent<ItemMixingRecipeData> {

    itemMixingRecipes = inject(DatabaseService).fetchItemMixingRecipeData$();

}
