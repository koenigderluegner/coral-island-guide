import { Component, Input } from '@angular/core';
import { MinimalItem, Quality } from "@ci/data-types";

@Component({
    selector: 'app-checklist-entry-base',
    templateUrl: './checklist-entry-base.component.html',
    styleUrls: ['./checklist-entry-base.component.scss'],
})
export class ChecklistEntryBaseComponent {

    @Input() amount?: number;
    @Input() quality?: Quality | undefined;
    @Input({required: true}) item!: MinimalItem;

    protected qualities = Quality;

}
