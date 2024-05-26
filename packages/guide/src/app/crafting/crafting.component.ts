import { Component, inject } from '@angular/core';
import { ItemProcessing, UiIcon } from '@ci/data-types';
import { DatabaseService } from '../shared/services/database.service';
import { Observable } from 'rxjs';
import { addSpacesToPascalCase } from '@ci/util';

@Component({
    selector: 'app-crafting',
    templateUrl: './crafting.component.html',
})
export class CraftingComponent {
    private readonly _databaseService = inject(DatabaseService);
    UI_ICONS = UiIcon;

    itemProcessingRecipes$: Observable<Record<string, ItemProcessing[]>>;
    addSpacesToPascalCase = addSpacesToPascalCase;

    constructor() {
        this.itemProcessingRecipes$ = this._databaseService.fetchItemProcessingRecipes$();
    }
}
