import { Component, inject, input, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabaseItem, Item } from "@ci/data-types";
import { DatabaseService } from "../../../shared/services/database.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-database-details',
    templateUrl: './database-details.component.html',
    styleUrls: ['./database-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false,
    host: {
        'class': 'col-span-full database-details'
    }
})
export class DatabaseDetailsComponent implements OnInit {
    readonly item = input.required<Item>();

    protected databaseItem$?: Observable<DatabaseItem>;
    readonly #databaseService = inject(DatabaseService);

    ngOnInit(): void {
        this.databaseItem$ = this.#databaseService.fetchDatabaseItem$(this.item().id)
    }
}
