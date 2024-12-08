import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { Fish } from "@ci/data-types";
import { CaughtTableComponent } from "../../../journal/components/tables/caught-table/caught-table.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";

@Component({
    selector: 'app-database-fishing',
    templateUrl: './database-fishing.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        CaughtTableComponent,
        DatabaseHeaderButtonComponent,
        ExpandableComponent
    ]
})
export class DatabaseFishingComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected fish?: Fish;

    ngOnInit(): void {
        const fish = this.databaseItem().fish;
        if (fish)
            this.fish = {...fish, item: this.databaseItem().item}
    }
}
