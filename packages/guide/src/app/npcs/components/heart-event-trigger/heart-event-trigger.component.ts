import { Component, inject, input } from '@angular/core';
import { HeartEvent } from "@ci/data-types";
import { HeartEventsChecklistService } from "../../../core/services/checklists/heart-events-checklist.service";

@Component({
    selector: 'app-heart-event-trigger',
    templateUrl: './heart-event-trigger.component.html',
    styles: [':host{display: block;}'],
    standalone: false
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
