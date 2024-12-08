import { Component, inject, input } from '@angular/core';
import { HeartEvent } from "@ci/data-types";
import { HeartEventsChecklistService } from "../../../core/services/checklists/heart-events-checklist.service";
import { RequirementsComponent } from "../../../shared/components/requirements/requirements.component";
import { EffectComponent } from "../../../shared/components/effect/effect.component";
import { KeyValuePipe } from "@angular/common";
import { IngameTimePipe } from "../../../shared/pipes/ingame-time.pipe";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
    selector: 'app-heart-event-trigger',
    templateUrl: './heart-event-trigger.component.html',
    styles: [':host{display: block;}'],

    imports: [
        RequirementsComponent,
        EffectComponent,
        KeyValuePipe,
        IngameTimePipe,
        MatCheckbox
    ]
})
export class HeartEventTriggerComponent {

    readonly heartEventTrigger = input.required<HeartEvent["trigger"][0]>();
    heartEventChecklist = inject(HeartEventsChecklistService)

    toggleHeartEvent(checked: boolean) {
        if (checked) {
            this.heartEventChecklist.add(this.heartEventTrigger().cutscene)
        } else {
            this.heartEventChecklist.remove(this.heartEventTrigger().cutscene)
        }
    }
}
