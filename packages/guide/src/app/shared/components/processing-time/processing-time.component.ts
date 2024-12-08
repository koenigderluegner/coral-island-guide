import { Component, input } from '@angular/core';

@Component({
    selector: 'app-processing-time',
    templateUrl: './processing-time.component.html',

})
export class ProcessingTimeComponent {
    readonly processingTime = input.required<{ day: number; time: { minutes: number; hours: number } }>()

}
