import { Component, inject } from '@angular/core';
import { ItemProcessing, UiIcon } from '@ci/data-types';
import { DatabaseService } from '../shared/services/database.service';
import { Observable } from 'rxjs';
import { addSpacesToPascalCase } from '@ci/util';
import { SidebarContainerComponent } from "../shared/components/sidebar-container/sidebar-container.component";
import { ModuleSidebarItemComponent } from "../shared/components/module-sidebar-item/module-sidebar-item.component";
import { RouterOutlet } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { ModuleSidebarComponent } from "../shared/components/module-sidebar/module-sidebar.component";

@Component({
    selector: 'app-crafting',
    templateUrl: './crafting.component.html',

    imports: [
        SidebarContainerComponent,
        ModuleSidebarItemComponent,
        ModuleSidebarComponent,
        RouterOutlet,
        AsyncPipe
    ]
})
export class CraftingComponent {
    UI_ICONS = UiIcon;
    itemProcessingRecipes$: Observable<Record<string, ItemProcessing[]>>;
    addSpacesToPascalCase = addSpacesToPascalCase;
    private readonly _databaseService = inject(DatabaseService);

    constructor() {
        this.itemProcessingRecipes$ = this._databaseService.fetchItemProcessingRecipes$();
    }
}
