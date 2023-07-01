import { Injectable } from '@angular/core';
import { ChecklistCategory } from "../enums/checklist-category.enum";
import { Offering } from "@ci/data-types";
import { Checklist } from "../interfaces/checklist.interface";

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {
    private static _CURRENT_CHECKLIST_VERSION = 1
    private static _CHECKLIST_STORE_KEY = 'checklist'
    private currentChecklistIndex = 0;
    private _checklists: Checklist[] = [];

    constructor() {
        this.read()
    }

    add(type: ChecklistCategory.OFFERINGS, data: Offering): void
    add(type: ChecklistCategory, data: any): void {

        switch (type) {
            case ChecklistCategory.OFFERINGS:
                this.getCurrentChecklist().offerings.push(data);
        }

        this.save();

    }

    getCurrentChecklist(): Checklist {
        let checklist = this._checklists[this.currentChecklistIndex];
        if (!checklist) {
            this.currentChecklistIndex = 0;
            checklist = this._checklists[this.currentChecklistIndex]
        }

        if (!checklist) {
            this._checklists.push(this._createEmptyChecklist());
            checklist = this._checklists[this.currentChecklistIndex];
        }

        return checklist;
    }

    save(): void {
        localStorage.setItem(ChecklistService._CHECKLIST_STORE_KEY, JSON.stringify(this._checklists));
    }

    read(): void {
        const checklists = localStorage.getItem(ChecklistService._CHECKLIST_STORE_KEY);
        if (checklists) {
            this._checklists = JSON.parse(checklists);
        } else {
            this._checklists.push(this._createEmptyChecklist())
        }
    }

    private _createEmptyChecklist(): Checklist {
        return {
            version: ChecklistService._CURRENT_CHECKLIST_VERSION,
            offerings: []
        } satisfies Checklist
    }
}
