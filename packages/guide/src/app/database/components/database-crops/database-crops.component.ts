import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { BaseCrop, Item } from "@ci/data-types";

@Component({
    selector: 'app-database-crops',
    templateUrl: './database-crops.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCropsComponent extends BaseDatabaseDetailPartComponent {}
