import { Component, inject } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../shared/components/base-selectable-container/base-selectable-container.component";
import { ItemMixingRecipeData } from "@ci/data-types";
import { AsyncPipe } from "@angular/common";
import { CraftingModule } from "../crafting.module";
import { DatabaseItemDetailsComponent } from "../../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../shared/directives/database-item-details.directive";
import { SharedModule } from "../../shared/shared.module";
import { DatabaseService } from "../../shared/services/database.service";
import { MixingRecipeComponent } from "../../shared/components/database-item-details/mixing-recipe/mixing-recipe.component";

@Component({
    selector: 'app-mixing',
    imports: [
        CraftingModule,
        SharedModule,
        DatabaseItemDetailsComponent,
        AsyncPipe,
        DatabaseItemDetailsDirective,
        MixingRecipeComponent
    ],
    templateUrl: './mixing.component.html'
})
export class MixingComponent extends BaseSelectableContainerComponent<ItemMixingRecipeData> {

    itemMixingRecipes = inject(DatabaseService).fetchItemMixingRecipeData$();

}
