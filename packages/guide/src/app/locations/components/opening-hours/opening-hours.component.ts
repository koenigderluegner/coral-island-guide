import { Component, input } from '@angular/core';
import { OpeningHours } from "@ci/data-types";

@Component({
    selector: 'app-opening-hours',
    templateUrl: './opening-hours.component.html',
    styleUrls: ['./opening-hours.component.scss'],
    standalone: false
})
export class OpeningHoursComponent {
    readonly openingHours = input.required<Record<string, OpeningHours>>();

    protected shortenWeekdays(weekdays: string[]): string[] {
        return weekdays.map(s => s.substring(0, 3))
    }
}
