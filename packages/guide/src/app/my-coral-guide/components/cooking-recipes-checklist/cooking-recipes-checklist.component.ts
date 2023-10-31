import { Component, inject } from '@angular/core';
import { BaseItemChecklistComponent } from "../base-item-checklist.component";
import { CookingRecipesChecklistService } from "../../../core/services/checklists/cooking-recipes-checklist.service";

@Component({
    selector: 'app-cooking-recipes-checklist',
    templateUrl: './cooking-recipes-checklist.component.html',
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
