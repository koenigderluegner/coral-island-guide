import { Component, Input } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',
    styleUrls: ['./caught-details.component.scss'],
})
export class CaughtDetailsComponent {
    @Input() fish?: Fish | Critter;
}
