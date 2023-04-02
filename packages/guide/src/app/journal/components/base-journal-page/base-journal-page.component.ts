import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { BaseCrop, Item, JournalOrder, Season } from '@ci/data-types';
import { combineLatest, map, Observable, of, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';
import { UiIcon } from '../../../shared/enums/ui-icon.enum';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup } from '@angular/forms';
import { FilterForm } from "../../../shared/types/filter-form.type";
import { MatTabGroup } from "@angular/material/tabs";

export interface BaseJournalPageComponent<D> {
    filterPredicate?(foundEntry: D, filterValues: BaseJournalPageComponent<D>['formControl']['value'], index: number): boolean;
}


@Component({
    template: ''
})
export class BaseJournalPageComponent<D extends ({ item: Item } | Item)> {

    @ViewChild(MatTabGroup) matTabGroup?: MatTabGroup

    uiIcon = UiIcon;
    tabs: { title: string; data: Observable<D[]> }[] = [];
    openDrawer = false;
    selectedEntity?: D;
    season = Season;
    formControl: FormGroup<FilterForm>;
    mobileQuery: MediaQueryList;
    media: MediaMatcher = inject(MediaMatcher);
    protected showTable = false;
    protected readonly _database: DatabaseService = inject(DatabaseService);
    private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
    private readonly _mobileQueryListener: () => void;

    constructor(formControl: FormGroup<FilterForm>) {
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        this.formControl = formControl;

    }

    getFilteredJournalData(journalOrder$: Observable<JournalOrder[]>, data: Observable<D[]>, index: number): Observable<D[]> {
        return combineLatest([
                journalOrder$,
                data,
                this.formControl.valueChanges.pipe(startWith(this.formControl.value)),
                of(index)
            ],
        ).pipe(map(
            ([orders, entries, filterValues, index]) => {
                const res: D[] = [];


                orders.sort((a, b) => a.order > b.order ? 1 : -1).forEach(journalOrder => {
                    const foundEntry: D | undefined = entries.find(f => {

                        if ('dropData' in f) {
                            return ((f as BaseCrop).dropData[0].item?.id === journalOrder.key)
                        }

                        return 'item' in f ? (f.item.id === journalOrder.key) : (f.id === journalOrder.key)
                    });
                    if (foundEntry) {
                        if (!this.filterPredicate)
                            res.push(foundEntry);
                        if (this.filterPredicate && this.filterPredicate(foundEntry, filterValues, index)) {
                            res.push(foundEntry);
                        }


                    }
                });
                return res;
            })
        );
    }

    showDetails(fishEntry?: D) {
        this.selectedEntity = fishEntry;
        this.openDrawer = true;
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
