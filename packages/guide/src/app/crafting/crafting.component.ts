import { Component } from '@angular/core';
import { UiIcon } from '../shared/enums/ui-icon.enum';
import { DatabaseService } from '../shared/services/database.service';
import { ItemProcessing } from '@ci/data-types';
import { Observable } from 'rxjs';
import { addSpacesToPascalCase } from '@ci/util';

@Component({
    selector: 'app-crafting',
    templateUrl: './crafting.component.html',
    styleUrls: ['./crafting.component.css'],
})
export class CraftingComponent {
    UI_ICONS = UiIcon;

    itemProcessingRecipes$: Observable<Record<string, ItemProcessing[]>>;
    addSpacesToPascalCase = addSpacesToPascalCase;

    constructor(private readonly _databaseService: DatabaseService) {
        this.itemProcessingRecipes$ = this._databaseService.fetchItemProcessingRecipes$();
    }
}
