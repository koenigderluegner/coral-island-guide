import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Item, JournalOrder } from '@ci/data-types';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';
import { UiIcon } from '../../../shared/enums/ui-icon.enum';
import { MediaMatcher } from '@angular/cdk/layout';
import { Season } from '../../../shared/enums/season.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface BaseJournalPageComponent<D> {
    filterPredicate?(foundEntry: D, filterValues: BaseJournalPageComponent<D>['formControl']['value']): boolean;
}

@Component({
    template: ''
})
export class BaseJournalPageComponent<D extends ({ item: Item } | Item)> {

    uiIcon = UiIcon;
    tabs: { title: string; data: Observable<D[]> }[] = [];
    openDrawer = false;
    selectedEntity?: D;

    season = Season;
    formControl: FormGroup<{ season: FormControl<Season[]>, weather: FormControl<string[]> }>;
    mobileQuery: MediaQueryList;
    media: MediaMatcher = inject(MediaMatcher);
    changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
    protected readonly _database: DatabaseService = inject(DatabaseService);
    protected formBuilder: FormBuilder = inject(FormBuilder);
    private readonly _mobileQueryListener: () => void;

    constructor() {
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.formControl = this.formBuilder.nonNullable.group({
            season: this.formBuilder.control<Season[]>([Season.SPRING, Season.SUMMER, Season.FALL, Season.WINTER], {nonNullable: true}),
            weather: this.formBuilder.control<string[]>([], {nonNullable: true}),
        })
    }

    getFilteredJournalData(journalOrder$: Observable<JournalOrder[]>, data: Observable<D[]>): Observable<D[]> {
        return combineLatest([journalOrder$, data, this.formControl.valueChanges.pipe(startWith(this.formControl.value))]).pipe(map(
            ([orders, entries, filterValues]) => {
                const res: D[] = [];


                orders.sort((a, b) => a.order > b.order ? 1 : -1).forEach(journalOrder => {
                    const foundEntry: D | undefined = entries.find(f => 'item' in f ? (f.item.id === journalOrder.key) : (f.id === journalOrder.key));
                    if (foundEntry) {
                        if (!this.filterPredicate)
                            res.push(foundEntry);
                        if (this.filterPredicate && this.filterPredicate(foundEntry, filterValues)) {
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
