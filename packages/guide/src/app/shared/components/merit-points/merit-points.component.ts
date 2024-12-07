import { Component, numberAttribute, input } from '@angular/core';

@Component({
    selector: 'app-merit-points',
    templateUrl: './merit-points.component.html',
    styleUrls: ['./merit-points.component.scss'],
    standalone: false
})
export class MeritPointsComponent {

    readonly amount = input.required<number, unknown>({ transform: numberAttribute });

}
