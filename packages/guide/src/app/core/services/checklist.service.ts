import { Injectable } from '@angular/core';
import { ChecklistCategory } from "../enums/checklist-category.enum";
import { CookingRecipe, Critter, Fish, Item, MinimalItem, Offering } from "@ci/data-types";
import { Checklist } from "../interfaces/checklist.interface";
import { SelectionModel } from "@angular/cdk/collections";
import { SettingsService } from "../../shared/services/settings.service";

type MarkedSelection = { category: ChecklistCategory, item: MinimalItem };

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {
    private static _CURRENT_CHECKLIST_VERSION = 1
    private static _CHECKLIST_STORE_KEY = 'checklist'
    clearTimer?: number;
    clearTimeout = 3000;
    private currentChecklistIndex = 0;
    private _checklists: Checklist[] = [];
    private _markedAsCompleted: SelectionModel<MarkedSelection> = new SelectionModel<{
        category: ChecklistCategory;
        item: MinimalItem
    }>(true, [])
    private readonly versionSuffix: string;

    constructor(private readonly _settings: SettingsService) {
        this.versionSuffix = this._settings.getSettings().useBeta ? '_beta' : '_live';
        this.read();
        this._markedAsCompleted.compareWith = (o1, o2) => {
            return o1.category === o2.category && o1.item.id === o2.item.id
        }
    }

    add(type: ChecklistCategory.JOURNAL_FISH, data: Fish): void
    add(type: ChecklistCategory.JOURNAL_CRITTER | ChecklistCategory.JOURNAL_INSECTS, data: Critter): void
    add(type: ChecklistCategory.OFFERINGS, data: Offering): void
    add(type: ChecklistCategory.COOKING_RECIPES, data: CookingRecipe): void
    add(type: ChecklistCategory.JOURNAL_GEMS | ChecklistCategory.JOURNAL_FOSSILS | ChecklistCategory.JOURNAL_ARTIFACTS, data: Item): void
    add(type: ChecklistCategory, data: any): void {

        switch (type) {
            case ChecklistCategory.OFFERINGS:
                this.getCurrentChecklist().offerings.push(data);
                break;
            case ChecklistCategory.COOKING_RECIPES:
                this.getCurrentChecklist().cookingRecipes.push(data);
                break;
            case ChecklistCategory.JOURNAL_CRITTER:
                this.getCurrentChecklist().journal.critter.push(data);
                break;
            case ChecklistCategory.JOURNAL_INSECTS:
                this.getCurrentChecklist().journal.insects.push(data);
                break;
            case ChecklistCategory.JOURNAL_ARTIFACTS:
                this.getCurrentChecklist().journal.artifacts.push(data);
                break;
            case ChecklistCategory.JOURNAL_FOSSILS:
                this.getCurrentChecklist().journal.fossils.push(data);
                break;
            case ChecklistCategory.JOURNAL_GEMS:
                this.getCurrentChecklist().journal.gems.push(data);
                break;
            case ChecklistCategory.JOURNAL_FISH:
                this.getCurrentChecklist().journal.fish.push(data);
                break;
            default:
                this.getCurrentChecklist().uncategorized.push(data);
                break;
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
        localStorage.setItem(ChecklistService._CHECKLIST_STORE_KEY + this.versionSuffix, JSON.stringify(this._checklists));
    }

    read(): void {
        const checklists = localStorage.getItem(ChecklistService._CHECKLIST_STORE_KEY + this.versionSuffix);
        if (checklists) {
            this._checklists = JSON.parse(checklists);
        } else {
            this._checklists.push(this._createEmptyChecklist())
            this.save();
        }
    }

    updateStatus(category: ChecklistCategory, item: MinimalItem, checked: boolean) {
        const selection: MarkedSelection = {category, item}
        if (checked) {
            this._markedAsCompleted.select(selection)
        } else {
            this._markedAsCompleted.deselect(selection)
        }

        this._resetClearTimer();


    }

    private _resetClearTimer() {
        clearTimeout(this.clearTimer);
        this.clearTimer = setTimeout(() => {
            this._completeEntries()
        }, this.clearTimeout) as unknown as number;
    }

    private _createEmptyChecklist(): Checklist {
        return {
            version: ChecklistService._CURRENT_CHECKLIST_VERSION,
            offerings: [],
            cookingRecipes: [],
            journal: {
                critter: [],
                fish: [],
                gems: [],
                artifacts: [],
                fossils: [],
                insects: [],
            },
            uncategorized: []
        } satisfies Checklist
    }

    private _completeEntries() {
        const completedEntries = this._markedAsCompleted.selected;
        this._markedAsCompleted.clear();

        let foundIndex = -1

        completedEntries.forEach(entry => {
            switch (entry.category) {
                case ChecklistCategory.OFFERINGS:
                    foundIndex = this.getCurrentChecklist().offerings.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentChecklist().offerings.splice(foundIndex, 1);
                    }
                    break;
                case ChecklistCategory.JOURNAL_CRITTER:
                    foundIndex = this.getCurrentChecklist().journal.critter.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentChecklist().journal.critter.splice(foundIndex, 1);
                    }
                    break;
                case ChecklistCategory.JOURNAL_FISH:
                    foundIndex = this.getCurrentChecklist().journal.fish.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentChecklist().journal.fish.splice(foundIndex, 1);
                    }
                    break;
                case ChecklistCategory.JOURNAL_INSECTS:
                    foundIndex = this.getCurrentChecklist().journal.insects.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentChecklist().journal.insects.splice(foundIndex, 1);
                    }
                    break;
            }
        });

        this.save()
    }
}
