import { Component } from '@angular/core';
import { DatabaseService } from './shared/services/database.service';
import { Observable } from 'rxjs';
import { Item } from '@ci/data-types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    items$: Observable<Item[]>;

    constructor(
        private databaseService: DatabaseService,
    ) {
        this.items$ = this.databaseService.fetchItems$();
    }

}
