import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { HeartEvent } from "@ci/data-types";
import { HeartEventTriggerComponent } from "../heart-event-trigger/heart-event-trigger.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";

@Component({
    selector: 'app-heart-events',
    templateUrl: './heart-events.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        HeartEventTriggerComponent,
        ExpandableComponent
    ]
})
export class HeartEventsComponent {

    readonly heartEvents = input.required<HeartEvent[]>();

}
