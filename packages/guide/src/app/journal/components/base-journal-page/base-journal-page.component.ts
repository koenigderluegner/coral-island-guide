import { Component, inject } from '@angular/core';
import { Item } from '@ci/data-types';
import { combineLatest, map, Observable } from 'rxjs';
import { JournalOrder } from '../../../../../../data-types/src/lib/interfaces/journal-order.interface';
import { DatabaseService } from '../../../shared/services/database.service';

@Component({
    template: ''
})
export class BaseJournalPageComponent<D> {

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
}
