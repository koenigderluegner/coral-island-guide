import { Component, HostBinding, inject, input, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabaseItem, Item } from "@ci/data-types";
import { DatabaseService } from "../../../shared/services/database.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-database-details',
    templateUrl: './database-details.component.html',
    styleUrls: ['./database-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseDetailsComponent implements OnInit {
    item = input.required<Item>();

    protected databaseItem$?: Observable<DatabaseItem>;
    #databaseService = inject(DatabaseService);
    @HostBinding('class') private _classes = 'col-span-full database-details';

    ngOnInit(): void {
        this.databaseItem$ = this.#databaseService.fetchDatabaseItem$(this.item().id)
    }
}
