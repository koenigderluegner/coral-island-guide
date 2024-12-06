import { Component, Input } from '@angular/core';
import { HeartEvent } from "@ci/data-types";

@Component({
    selector: 'app-heart-events',
    templateUrl: './heart-events.component.html',
    standalone: false
})
export class HeartEventsComponent {

    @Input({required: true}) heartEvents!: HeartEvent[];

}
