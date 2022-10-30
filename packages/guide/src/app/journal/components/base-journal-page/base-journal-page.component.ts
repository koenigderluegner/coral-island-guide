import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Item, JournalOrder } from '@ci/data-types';
import { combineLatest, map, Observable } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';
import { UiIcon } from '../../../shared/enums/ui-icon.enum';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    template: ''
})
export class BaseJournalPageComponent<D> {

    uiIcon = UiIcon;
    tabs: { title: string; data: Observable<D[]> }[] = [];
    openDrawer = false;
    selectedEntity?: D;

    protected readonly _database: DatabaseService = inject(DatabaseService);

    getFilteredJournalData<T extends { item: Item } | Item>(journalOrder$: Observable<JournalOrder[]>, data: Observable<T[]>): Observable<T[]> {
        return combineLatest([journalOrder$, data]).pipe(map(
            ([orders, entries]) => {
                const res: T[] = [];

                orders.sort((a, b) => a.order > b.order ? 1 : -1).forEach(journalOrder => {
                    const foundEntry: T | undefined = entries.find(f => 'item' in f ? (f.item.id === journalOrder.key) : (f.id === journalOrder.key));
                    if (foundEntry) {
                        res.push(foundEntry);
                    }
                });
                return res;
            })
        );
    }

    mobileQuery: MediaQueryList;

    private readonly _mobileQueryListener: () => void;
    media: MediaMatcher = inject(MediaMatcher);
    changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    constructor() {
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    showDetails(fishEntry?: D) {
        this.selectedEntity = fishEntry;
        this.openDrawer = true;
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
