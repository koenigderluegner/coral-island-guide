import { Component } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { Critter, Fish, Item } from '@ci/data-types';
import { combineLatest, map, Observable } from 'rxjs';
import { JournalOrder } from '../../../../../../data-types/src/lib/interfaces/journal-order.interface';

@Component({
    selector: 'app-caught',
    templateUrl: './caught.component.html',
    styleUrls: ['./caught.component.scss'],
})
export class CaughtComponent {

    selectedEntity?: Fish | Critter;

    fish$: Observable<Fish[]>;
    seaCritters$: Observable<Critter[]>;
    insects$: Observable<Critter[]>;

    constructor(public readonly database: DatabaseService) {
        this.fish$ = this.getFilteredJournalData(
            database.fetchJournalOrder$('journal-fish'),
            database.fetchFish$()
        );
        this.insects$ = this.getFilteredJournalData(
            database.fetchJournalOrder$('journal-insects'),
            database.fetchBugsAndInsects$()
        );
        this.seaCritters$ = this.getFilteredJournalData(
            database.fetchJournalOrder$('journal-sea-critters'),
            database.fetchOceanCritters$()
        );

    }

    getFilteredJournalData<T extends { item: Item }>(journalOrder$: Observable<JournalOrder[]>, data: Observable<T[]>): Observable<T[]> {
        return combineLatest([journalOrder$, data]).pipe(map(
            ([orders, entries]) => {
                const res: T[] = [];

                orders.sort((a, b) => a.order > b.order ? 1 : -1).forEach(journalOrder => {
                    const foundEntry: T | undefined = entries.find(f => f.item.id === journalOrder.key);
                    if (foundEntry) {
                        res.push(foundEntry);
                    }
                });
                return res;
            })
        );
    }
}
