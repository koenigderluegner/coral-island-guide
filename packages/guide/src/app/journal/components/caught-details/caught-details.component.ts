import { Component, Input } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { addSpacesToPascalCase, getTruthyValues } from '@ci/util';

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',
    styleUrls: ['./caught-details.component.scss'],
})
export class CaughtDetailsComponent {
    @Input() critter?: Fish | Critter;

    isFish(critter: Fish | Critter): critter is Fish {
        return 'fishName' in critter;
    }

    getTruthyValues = getTruthyValues;
    addSpacesToPascalCase = addSpacesToPascalCase;

    dateRangesToString(dateRanges: Fish['dateRangeList']): string {
        return dateRanges.map(range => {
            return `From ${(range.startsFrom.season)} ${range.startsFrom.day} to ${(range.lastsTill.season)} ${range.lastsTill.day}`;
        }).join(', ');
    }
}
