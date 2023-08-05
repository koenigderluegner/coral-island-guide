import { Component } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { Item } from '@ci/data-types';
import { FormGroup } from "@angular/forms";
import { FilterForm } from "../../../shared/types/filter-form.type";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-found',
    templateUrl: './found.component.html',
})
export class FoundComponent extends BaseJournalPageComponent<Item> {

    checklistCategory?: ChecklistCategory.JOURNAL_ARTIFACTS | ChecklistCategory.JOURNAL_GEMS | ChecklistCategory.JOURNAL_FOSSILS;


    constructor() {
        super(new FormGroup<FilterForm>({}));

        this.tabs = [
            {
                title: 'Artifacts',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-artifacts'),
                    this._database.fetchItems$(),
                    0
                )
            }, {
                title: 'Gems',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-gems'),
                    this._database.fetchItems$(),
                    1
                )
            }, {
                title: 'Fossils',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-fossils'),
                    this._database.fetchItems$(),
                    2
                )
            }, {
                title: 'Scavangables',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-scavangable'),
                    this._database.fetchItems$(),
                    3
                )
            },
        ];

        this.activateTabFromRoute(this.tabs.map(tab => tab.title));

    }

    override showDetails(selectedEntry?: Item) {
        super.showDetails(selectedEntry);
        this.checklistCategory = this.selectedTabIndex === 0
            ? ChecklistCategory.JOURNAL_ARTIFACTS
            : this.selectedTabIndex === 1
                ? ChecklistCategory.JOURNAL_GEMS
                : this.selectedTabIndex === 2
                    ? ChecklistCategory.JOURNAL_FOSSILS
                    : undefined;

    }

    override registerToChecklist(entry: Item) {
        const checklistCategory = this.checklistCategory;
        if (checklistCategory)
            this._checklist.add(checklistCategory, entry)
    }
}
