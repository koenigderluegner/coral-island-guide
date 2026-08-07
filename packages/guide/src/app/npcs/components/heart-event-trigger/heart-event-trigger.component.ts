import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { HeartEvent } from "@ci/data-types";
import { HeartEventsChecklistService } from "../../../core/services/checklists/heart-events-checklist.service";
import { RequirementsComponent } from "../../../shared/components/requirements/requirements.component";
import { EffectComponent } from "../../../shared/components/effect/effect.component";
import { KeyValuePipe } from "@angular/common";
import { IngameTimePipe } from "../../../shared/pipes/ingame-time.pipe";
import { MatCheckbox } from "@angular/material/checkbox";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-heart-event-trigger',
    templateUrl: './heart-event-trigger.component.html',
    imports: [
        RequirementsComponent,
        EffectComponent,
        KeyValuePipe,
        IngameTimePipe,
        MatCheckbox,
        TranslatePipe
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    host: {
        'class': 'block text-md font-semibold',
    }
})
export class HeartEventTriggerComponent {

    readonly heartEventTrigger = input.required<HeartEvent["trigger"][0]>();
    protected heartEventChecklist = inject(HeartEventsChecklistService);
    protected readonly HEART_EVENT_TRIGGER_LOCATION_KEY = '0AD71F744EB56C2BD487E88073281F7B'; // "Go to {locationName} between {timeRange} to see the event.",

    toggleHeartEvent(checked: boolean) {
        if (checked) {
            this.heartEventChecklist.add(this.heartEventTrigger().cutscene)
        } else {
            this.heartEventChecklist.remove(this.heartEventTrigger().cutscene)
        }
    }
}
