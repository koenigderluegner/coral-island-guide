import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { Enemy } from "@ci/data-types";

@Component({
    selector: 'app-database-bestiary',
    templateUrl: './database-bestiary.component.html',
})
export class DatabaseBestiaryComponent extends BaseDatabaseDetailPartComponent {}
