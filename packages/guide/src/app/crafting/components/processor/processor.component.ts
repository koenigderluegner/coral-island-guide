import { Component } from '@angular/core';
import { map, Observable, take, tap } from 'rxjs';
import { ItemProcessing, Quality } from '@ci/data-types';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { ProcessingComponent } from "../../../shared/components/database-item-details/processing/processing.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { AsyncPipe, TitleCasePipe } from "@angular/common";
import { AddSpacesToPascalCasePipe } from "../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { ProcessorTableComponent } from "../tables/processor-table/processor-table.component";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";

@Component({
    selector: 'app-processor',
    templateUrl: './processor.component.html',

    imports: [
        ListDetailContainerComponent,
        DatabaseItemDetailsComponent,
        ProcessingComponent,
        MatTabGroup,
        MatTab,
        DataFilterComponent,
        AsyncPipe,
        AddSpacesToPascalCasePipe,
        TitleCasePipe,
        ItemIconComponent,
        ProcessorTableComponent,
        DatabaseItemDetailsDirective
    ]
})
export class ProcessorComponent extends BaseTabbedSelectableContainerComponent<ItemProcessing> {

    quality = Quality;
    machineNames: string[] = [];
    protected processorMapping = this._database.getProcessorMapping()

    constructor() {
        super();
        this._database.fetchItemProcessingRecipes$().pipe(take(1)).subscribe({
            next: (records) => {
                this.machineNames = Object.keys(records);
                this.activateTabFromRoute(this.machineNames)
            }
        });

    }

    override urlPathFromLabel = (label: string) => {

        const foundKey = Object.keys(this.processorMapping).find(key => this.processorMapping[key].displayName === label);
        if (foundKey) {
            return foundKey
        }

        return label.toLowerCase().replaceAll(' ', '')
    }

    filteredData$(maschineName: string): Observable<ItemProcessing[]> {
        return this._database.fetchItemProcessingRecipes$().pipe(
            map(records => {
                return records[maschineName];
            }),
            tap(items => {
                this.reusedImages = this.getMultipleIconNames(items.map(i => i.output.item.iconName ?? ''));
            })
        );
    }


}
