import { Component, Input } from '@angular/core';
import { OpeningHours } from "@ci/data-types";

@Component({
    selector: 'app-opening-hours',
    templateUrl: './opening-hours.component.html',
    styleUrls: ['./opening-hours.component.scss'],
})
export class OpeningHoursComponent {
    @Input({required: true}) openingHours!: Record<string, OpeningHours>

    protected shortenWeekdays(weekdays: string[]): string[] {
        return weekdays.map(s => s.substring(0, 3))
    }
}
