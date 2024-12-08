import { Component, input } from '@angular/core';
import { Quality, UiIcon } from "@ci/data-types";

@Component({
    selector: 'app-processing-time-per-quality',
    templateUrl: './processing-time-per-quality.component.html',
    styleUrls: ['./processing-time-per-quality.component.scss'],
    standalone: false
})
export class ProcessingTimePerQualityComponent {

    readonly baseProcessingTime = input<{ day: number; time: { hours: number, minutes: number } }>();
    readonly processingTimePerQualities = input<Record<string | Quality, {
        day: number;
        time: {
            hours: number;
            minutes: number;
        };
    }>>();

    protected qualityValues: Quality[] = Object.values(Quality);
    protected quality = Quality;
    protected uiIcon = UiIcon;
}
