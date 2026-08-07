import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-multi-select-trigger',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './multi-select-trigger.component.html'
})
export class MultiSelectTriggerComponent {
    readonly values = input.required<string[] | number[]>()
}
