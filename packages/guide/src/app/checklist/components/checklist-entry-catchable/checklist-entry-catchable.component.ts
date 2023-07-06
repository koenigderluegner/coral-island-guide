import { Component, Input } from '@angular/core';
import { Critter, Fish } from "@ci/data-types";

@Component({
    selector: 'app-checklist-entry-catchable',
    templateUrl: './checklist-entry-catchable.component.html',
})
export class ChecklistEntryCatchableComponent {

    @Input({required: true}) entry!: Fish | Critter;
}
