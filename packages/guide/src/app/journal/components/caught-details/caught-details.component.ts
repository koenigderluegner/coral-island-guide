import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { getTruthyValues } from '@ci/util';
import { CaughtComponent } from "../caught/caught.component";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',
})
export class CaughtDetailsComponent implements OnInit, OnChanges {
    @Input({required: true}) critter!: Fish | Critter;
    @Input() registerToChecklist?: CaughtComponent['registerToChecklist'];

    protected getTruthyValues = getTruthyValues;
    protected checklistCategory!: ChecklistCategory;

    ngOnInit() {
        this._setCategory();
    }

    dateRangesToString(dateRanges: Fish['dateRangeList']): string {
        return dateRanges.map(range => {
            return `From ${(range.startsFrom.season)} ${range.startsFrom.day} to ${(range.lastsTill.season)} ${range.lastsTill.day}`;
        }).join(', ');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['critter']) {
            this._setCategory()
        }
    }

    private _setCategory() {
        this.checklistCategory = 'fishName' in this.critter
            ? ChecklistCategory.JOURNAL_FISH
            : this.critter.item.inventoryCategory.toLocaleLowerCase() === 'bug'
                ? ChecklistCategory.JOURNAL_INSECTS
                : ChecklistCategory.JOURNAL_CRITTER
    }
}
