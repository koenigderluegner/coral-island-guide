import { Component, input, numberAttribute, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Component({
    selector: 'app-merit-points',
    templateUrl: './merit-points.component.html',
    styleUrls: ['./merit-points.component.scss'],

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        DecimalPipe
    ]
})
export class MeritPointsComponent {

    readonly amount = input.required<number, unknown>({transform: numberAttribute});

}
