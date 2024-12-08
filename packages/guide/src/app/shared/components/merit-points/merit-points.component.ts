import { Component, input, numberAttribute } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Component({
    selector: 'app-merit-points',
    templateUrl: './merit-points.component.html',
    styleUrls: ['./merit-points.component.scss'],

    imports: [
        DecimalPipe
    ]
})
export class MeritPointsComponent {

    readonly amount = input.required<number, unknown>({transform: numberAttribute});

}
