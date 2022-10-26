import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    constructor(private readonly _http: HttpClient,
                private d: DatabaseService
    ) {

        this.items$ = this.d.fetchItems$();


    }


}
