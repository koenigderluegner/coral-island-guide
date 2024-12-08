import { Component, input, Input } from '@angular/core';

@Component({
    selector: 'app-multi-select-trigger',
    templateUrl: './multi-select-trigger.component.html'
})
export class MultiSelectTriggerComponent {
 readonly values = input.required<string[] | number[]>()
}
