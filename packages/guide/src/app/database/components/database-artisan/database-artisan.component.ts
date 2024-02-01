import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { Item, ItemProcessing } from "@ci/data-types";

@Component({
    selector: 'app-database-artisan',
    templateUrl: './database-artisan.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatabaseArtisanComponent extends BaseDatabaseDetailPartComponent{}
