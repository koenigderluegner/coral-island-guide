import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { Fish } from "@ci/data-types";

@Component({
    selector: 'app-database-fishing',
    templateUrl: './database-fishing.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DatabaseFishingComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected fish?: Fish;

    ngOnInit(): void {
        if (this.databaseItem.fish)
            this.fish = {...this.databaseItem.fish, item: this.databaseItem.item}
    }
}
