import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-multi-select-trigger',
    standalone: true,
    imports: [],
    templateUrl: './multi-select-trigger.component.html'
})
export class MultiSelectTriggerComponent {
    @Input({required: true}) values!: string[] | number[]
}
