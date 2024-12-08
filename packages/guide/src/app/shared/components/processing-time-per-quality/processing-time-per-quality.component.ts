import { Component, input } from '@angular/core';
import { Quality, UiIcon } from "@ci/data-types";
import { UiIconComponent } from "../ui-icon/ui-icon.component";
import { RarityIconComponent } from "../rarity-icon/rarity-icon.component";
import { ProcessingTimeComponent } from "../processing-time/processing-time.component";

@Component({
    selector: 'app-processing-time-per-quality',
    templateUrl: './processing-time-per-quality.component.html',
    styleUrls: ['./processing-time-per-quality.component.scss'],

    imports: [
        UiIconComponent,
        RarityIconComponent,
        ProcessingTimeComponent
    ]
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
