import { Component, OnInit } from '@angular/core';
import { OfferingAltar } from "@ci/data-types";
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { nonNullable } from "@ci/util";

@Component({
    selector: 'app-database-offerings',
    templateUrl: './database-offerings.component.html',
})
export class DatabaseOfferingsComponent extends BaseDatabaseDetailPartComponent {}
