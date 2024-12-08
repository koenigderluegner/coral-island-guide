import { Component, inject } from '@angular/core';
import { BaseItemChecklistComponent } from "../base-item-checklist.component";
import { CookingRecipesChecklistService } from "../../../core/services/checklists/cooking-recipes-checklist.service";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { AddSpacesToPascalCasePipe } from "../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { AsyncPipe, KeyValuePipe, TitleCasePipe } from "@angular/common";
import { MatCheckbox } from "@angular/material/checkbox";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { CookingRecipeComponent } from "../../../shared/components/database-item-details/cooking-recipe/cooking-recipe.component";

@Component({
    selector: 'app-cooking-recipes-checklist',
    templateUrl: './cooking-recipes-checklist.component.html',

    imports: [
        ListDetailContainerComponent,
        DatabaseItemDetailsComponent,
        MatTabGroup,
        MatTab,
        ReactiveFormsModule,
        AddSpacesToPascalCasePipe,
        TitleCasePipe,
        MatCheckbox,
        ItemIconComponent,
        AsyncPipe,
        KeyValuePipe,
        CookingRecipeComponent
    ]
})
export class CookingRecipesChecklistComponent extends BaseItemChecklistComponent {
    checklistService = inject(CookingRecipesChecklistService);
    checklistDefinition$ = this._database.fetchCookingRecipesChecklist$();

    protected cookingUtensilMapping = this._database.getCookingUtensilMapping()

    constructor() {
        super();
    }

    override urlPathFromLabel = (label: string) => {

        const foundKey = Object.keys(this.cookingUtensilMapping).find(key => this.cookingUtensilMapping[key].displayName === label);
        if (foundKey) {
            return foundKey
        }

        return label.toLowerCase().replaceAll(' ', '')
    }
}
