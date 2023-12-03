import { Component } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { DatabaseService } from '../shared/services/database.service';
import { ItemProcessing } from '@ci/data-types';
import { Observable } from 'rxjs';
import { addSpacesToPascalCase } from '@ci/util';

@Component({
    selector: 'app-crafting',
    templateUrl: './crafting.component.html',
})
export class CraftingComponent {
    UI_ICONS = UiIcon;

    itemProcessingRecipes$: Observable<Record<string, ItemProcessing[]>>;
    addSpacesToPascalCase = addSpacesToPascalCase;

    constructor(private readonly _databaseService: DatabaseService) {
        this.itemProcessingRecipes$ = this._databaseService.fetchItemProcessingRecipes$();
    }
}
