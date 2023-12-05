import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getTruthyValues } from "@ci/util";
import { Fish, FishSpawnSettings } from '@ci/data-types';
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";

@Component({
  selector: 'app-fish',
  standalone: true,
    imports: [CommonModule, AddSpacesToPascalCasePipe],
  templateUrl: './fish.component.html'
})
export class FishComponent {
    @Input({required: true}) fish!: Omit<Fish, 'item'>;

    protected readonly getTruthyValues = getTruthyValues;
    dateRangesToString(dateRanges: FishSpawnSettings['dateRangeList']): string {
        return dateRanges.map(range => {
            return `From ${(range.startsFrom.season)} ${range.startsFrom.day} to ${(range.lastsTill.season)} ${range.lastsTill.day}`;
        }).join(', ');
    }
}
