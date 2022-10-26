import { Component } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { Critter, Fish } from '@ci/data-types';

@Component({
    selector: 'app-caught',
    templateUrl: './caught.component.html',
    styleUrls: ['./caught.component.scss'],
})
export class CaughtComponent {

    selectedEntity?: Fish | Critter;

    constructor(public readonly database: DatabaseService) {
    }
}
