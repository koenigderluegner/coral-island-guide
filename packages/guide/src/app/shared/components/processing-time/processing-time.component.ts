import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-processing-time',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './processing-time.component.html',

})
export class ProcessingTimeComponent {
    readonly processingTime = input.required<{ day: number; time: { minutes: number; hours: number } }>()

}
