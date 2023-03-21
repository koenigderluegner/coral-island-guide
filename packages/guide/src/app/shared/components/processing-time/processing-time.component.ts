import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-processing-time',
    templateUrl: './processing-time.component.html',
})
export class ProcessingTimeComponent {

    @Input() processingTime?: { day: number; time: { minutes: number; hours: number } };

}
