import { Component, Input } from '@angular/core';
import { HeartEvent } from "@ci/data-types";

@Component({
    selector: 'app-heart-event-trigger',
    templateUrl: './heart-event-trigger.component.html',
    styles: [':host{display: block;}']
})
export class HeartEventTriggerComponent {

    @Input({required: true}) heartEventTrigger!: HeartEvent["trigger"][0];

}
