import { Component, input, numberAttribute, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Component({
    selector: 'app-money',
    templateUrl: './money.component.html',
    styleUrls: ['./money.component.scss'],

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        DecimalPipe
    ]
})
export class MoneyComponent {
    readonly amount = input.required<number, unknown>({transform: numberAttribute});
}
