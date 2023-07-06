import { Component, Input } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { getTruthyValues } from '@ci/util';

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',
})
export class CaughtDetailsComponent {
    @Input({required: true}) critter!: Fish | Critter;

    getTruthyValues = getTruthyValues;

    dateRangesToString(dateRanges: Fish['dateRangeList']): string {
        return dateRanges.map(range => {
            return `From ${(range.startsFrom.season)} ${range.startsFrom.day} to ${(range.lastsTill.season)} ${range.lastsTill.day}`;
        }).join(', ');
    }
}
