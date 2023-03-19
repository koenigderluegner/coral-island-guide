import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../../shared/services/database.service';
import { combineLatest, map, Observable, take, tap } from 'rxjs';
import { GenericEntry, ItemProcessing, Quality, TagBasedItem } from '@ci/data-types';
import { ItemListComponent } from '../../../shared/components/item-list/item-list.component';
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
    selector: 'app-processor',
    templateUrl: './processor.component.html',
})
export class ProcessorComponent {

    openDrawer = false;

    selectedEntity?: ItemProcessing;
    reusedImages: string[] = [];

    selectedTabIndex = -1;

    quality = Quality;
    machineNames: string[] = [];
    tagBasedItems: TagBasedItem[] = [];

    constructor(private readonly _route: ActivatedRoute,
                private readonly _router: Router,
                private readonly _databaseService: DatabaseService) {

        combineLatest([
            _databaseService.fetchItemProcessingRecipes$(),
            _databaseService.fetchTagBasedItems$()
        ]).pipe(take(1)).subscribe({
            next: ([records, tagBasedItems]) => {
                this.machineNames = Object.keys(records);
                this.tagBasedItems = tagBasedItems;
                this._route.paramMap.pipe(
                    tap(params => {


                        const processor = params.get('processor');

                        if (processor)
                            this.selectedTabIndex = this.machineNames.map(s => s.toLowerCase()).indexOf(processor);
                    })
                ).subscribe();


            }
        });


    }

    getItemList(item: ItemProcessing): ItemListComponent['itemList'] {
        const items: ItemListComponent['itemList'] = [item.input, ...item.additionalInput];
        if (item.genericInput) {
            const genericInput: GenericEntry = {
                shouldBeSameItem: true,
                amount: item.genericInput.amount,
                genericItem: this.tagBasedItems.find(tbi => tbi.key === item.genericInput?.key)
            }

            items.push(genericInput)
        }
        return items;
    }

    private _getMultipleIconNames(iconNames: string[]): string[] {
        const filtered = iconNames.filter((v, i) => iconNames.indexOf(v) !== i);
        return [...new Set(filtered)];
    }

    filteredData$(maschineName: string): Observable<ItemProcessing[]> {
        return this._databaseService.fetchItemProcessingRecipes$().pipe(
            map(records => {
                return records[maschineName];
            }),
            tap(items => {
                this.reusedImages = this._getMultipleIconNames(items.map(i => i.output.item.iconName ?? ''));
            })
        );
    }

    l($event: MatTabChangeEvent) {
        let tab = $event.tab.textLabel.toLowerCase();
        this._router.navigate(['..', tab], {relativeTo: this._route});
    }

    showDetails(entry?: ItemProcessing) {
        this.selectedEntity = entry;
        this.openDrawer = true;
    }
}
