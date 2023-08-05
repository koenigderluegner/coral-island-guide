import { Injectable } from '@angular/core';
import { ChecklistCategory } from "../enums/checklist-category.enum";
import { CookingRecipe, Critter, Fish, Item, MinimalItem, Offering } from "@ci/data-types";
import { Checklist } from "../interfaces/checklist.interface";
import { SelectionModel } from "@angular/cdk/collections";
import { SettingsService } from "../../shared/services/settings.service";
import { Observable, Subject } from "rxjs";

type MarkedSelection = { category: ChecklistCategory, item: MinimalItem };

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {

    private static _CURRENT_CHECKLIST_VERSION = 1
    private static _CHECKLIST_STORE_KEY = 'checklist'
    clearTimer?: number;
    clearTimeout = 3000;
    private _completedCategory$: Subject<ChecklistCategory> = new Subject<ChecklistCategory>();
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

    get currentChecklistAmount(): number {
        const checklist = this.getCurrentChecklist();
        return checklist.offerings.length
            + checklist.journal.critter.length
            + checklist.journal.insects.length
            + checklist.journal.fish.length
            + checklist.journal.artifacts.length
            + checklist.journal.gems.length
            + checklist.journal.fossils.length
            + checklist.cookingRecipes.length
            + checklist.uncategorized.length
    }

    get currentIsEmpty(): boolean {
        return this.currentChecklistAmount === 0;
    }

    add(type: ChecklistCategory.JOURNAL_FISH, data: Fish): void;
    add(type: ChecklistCategory.JOURNAL_CRITTER | ChecklistCategory.JOURNAL_INSECTS, data: Critter): void;
    add(type: ChecklistCategory.OFFERINGS, data: Offering): void;
    add(type: ChecklistCategory.COOKING_RECIPES, data: CookingRecipe): void;
    add(type: ChecklistCategory.JOURNAL_GEMS | ChecklistCategory.JOURNAL_FOSSILS | ChecklistCategory.JOURNAL_ARTIFACTS, data: Item): void
    add(type: ChecklistCategory, data: any): void {

        this.getCategoryList(type).push(data);

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

    updateStatus(category: ChecklistCategory, item: MinimalItem, checked: boolean, skipTimer = false) {
        const selection: MarkedSelection = {category, item}
        if (checked) {
            this._markedAsCompleted.select(selection)
        } else {
            this._markedAsCompleted.deselect(selection)
        }

        if (skipTimer) {
            this._completeEntries()
        } else {
            this._resetClearTimer();
        }


    }

    resetLiveChecklist(): void {
        localStorage.setItem(ChecklistService._CHECKLIST_STORE_KEY + '_live', JSON.stringify([this._createEmptyChecklist()]));
        this.read();
    }

    resetBetaChecklist(): void {
        localStorage.setItem(ChecklistService._CHECKLIST_STORE_KEY + '_beta', JSON.stringify([this._createEmptyChecklist()]));
        this.read()
    }

    alreadyInList(type: ChecklistCategory, data: { item: MinimalItem } | MinimalItem): boolean {


        const list = this.getCategoryList(type);

        if (list.length === 0) return false;

        const dataId = ('item' in data) ? data.item.id : data.id;

        if ('item' in list[0]) {
            return !!(list as { item: MinimalItem }[]).find(entry => entry.item.id === dataId)
        } else {
            return !!(list as MinimalItem[]).find(entry => entry.id === dataId)
        }

    }

    getCategoryList(type: ChecklistCategory): Array<MinimalItem | { item: MinimalItem }> {
        switch (type) {
            case ChecklistCategory.OFFERINGS:
                return this.getCurrentChecklist().offerings;

            case ChecklistCategory.COOKING_RECIPES:
                return this.getCurrentChecklist().cookingRecipes;

            case ChecklistCategory.JOURNAL_CRITTER:
                return this.getCurrentChecklist().journal.critter;

            case ChecklistCategory.JOURNAL_INSECTS:
                return this.getCurrentChecklist().journal.insects;

            case ChecklistCategory.JOURNAL_ARTIFACTS:
                return this.getCurrentChecklist().journal.artifacts;

            case ChecklistCategory.JOURNAL_FOSSILS:
                return this.getCurrentChecklist().journal.fossils;

            case ChecklistCategory.JOURNAL_GEMS:
                return this.getCurrentChecklist().journal.gems;

            case ChecklistCategory.JOURNAL_FISH:
                return this.getCurrentChecklist().journal.fish;

            default:
                return this.getCurrentChecklist().uncategorized;

        }

    }

    categoryCompleted$(): Observable<ChecklistCategory> {
        return this._completedCategory$.asObservable();
    }

    completeCategory(category: ChecklistCategory) {
        this._completedCategory$.next(category);
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
                case ChecklistCategory.JOURNAL_GEMS:
                    foundIndex = this.getCurrentChecklist().journal.gems.findIndex(offering => offering.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentChecklist().journal.gems.splice(foundIndex, 1);
                    }
                    break;
                case ChecklistCategory.JOURNAL_FOSSILS:
                    foundIndex = this.getCurrentChecklist().journal.fossils.findIndex(offering => offering.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentChecklist().journal.fossils.splice(foundIndex, 1);
                    }
                    break;
                case ChecklistCategory.JOURNAL_ARTIFACTS:
                    foundIndex = this.getCurrentChecklist().journal.artifacts.findIndex(offering => offering.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentChecklist().journal.artifacts.splice(foundIndex, 1);
                    }
                    break;
                case ChecklistCategory.COOKING_RECIPES:
                    foundIndex = this.getCurrentChecklist().cookingRecipes.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentChecklist().cookingRecipes.splice(foundIndex, 1);
                    }
                    break;
            }
        });

        this.save()
    }
}
