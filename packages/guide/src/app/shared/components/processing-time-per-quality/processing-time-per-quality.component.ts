import { Component, Input } from '@angular/core';
import { Quality, UiIcon } from "@ci/data-types";

@Component({
    selector: 'app-processing-time-per-quality',
    templateUrl: './processing-time-per-quality.component.html',
    styleUrls: ['./processing-time-per-quality.component.scss'],
    standalone: false
})
export class ProcessingTimePerQualityComponent {

    @Input() baseProcessingTime?: { day: number; time: { hours: number, minutes: number } };
    @Input() processingTimePerQualities?: Record<string | Quality, {
        day: number;
        time: { hours: number, minutes: number }
    }>

    protected qualityValues: Quality[] = Object.values(Quality);
    protected quality = Quality;
    protected uiIcon = UiIcon;
}
