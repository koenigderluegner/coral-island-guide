import { Component } from '@angular/core';
import { map, Observable, take, tap } from 'rxjs';
import { ItemProcessing, Quality } from '@ci/data-types';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";

@Component({
    selector: 'app-processor',
    templateUrl: './processor.component.html',
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
