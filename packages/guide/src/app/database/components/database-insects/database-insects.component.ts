import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Critter } from "@ci/data-types";
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-insects',
    templateUrl: './database-insects.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatabaseInsectsComponent extends BaseDatabaseDetailPartComponent{}
