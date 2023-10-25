import { Component } from '@angular/core';
import { DatabaseService } from './shared/services/database.service';
import { combineLatest, Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    prefetchData$: Observable<any>;

    constructor(
        private databaseService: DatabaseService,
    ) {
        this.prefetchData$ = combineLatest([
            this.databaseService.fetchItems$(),
            this.databaseService.fetchTagBasedItems$(),
            this.databaseService.fetchProcessorMapping$(),
            this.databaseService.fetchCookingUtensilMapping$(),
        ]);
    }

}
