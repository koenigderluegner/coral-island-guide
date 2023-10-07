import { Injectable } from '@angular/core';
import { ToDoCategory } from "../enums/todo-category.enum";
import { CookingRecipe, Critter, Fish, Item, MinimalItem, Offering } from "@ci/data-types";
import { ToDo } from "../interfaces/todo.interface";
import { SelectionModel } from "@angular/cdk/collections";
import { SettingsService } from "../../shared/services/settings.service";
import { Observable, Subject } from "rxjs";

type MarkedSelection = { category: ToDoCategory, item: MinimalItem };

@Injectable({
    providedIn: 'root'
})
export class ToDoService {

    private static _CURRENT_TO_DO_VERSION = 1
    // TODO migrate
    private static _TO_DO_STORE_KEY = 'checklist'
    clearTimer?: number;
    clearTimeout = 3000;
    private _completedCategory$: Subject<ToDoCategory> = new Subject<ToDoCategory>();
    private currentToDoIndex = 0;
    private _toDos: ToDo[] = [];
    private _markedAsCompleted: SelectionModel<MarkedSelection> = new SelectionModel<{
        category: ToDoCategory;
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

    get currentToDoAmount(): number {
        const toDo = this.getCurrentToDo();
        return toDo.offerings.length
            + toDo.journal.critter.length
            + toDo.journal.insects.length
            + toDo.journal.fish.length
            + toDo.journal.artifacts.length
            + toDo.journal.gems.length
            + toDo.journal.fossils.length
            + toDo.cookingRecipes.length
            + toDo.uncategorized.length
    }

    get currentIsEmpty(): boolean {
        return this.currentToDoAmount === 0;
    }

    add(type: ToDoCategory.JOURNAL_FISH, data: Fish): void;
    add(type: ToDoCategory.JOURNAL_CRITTER | ToDoCategory.JOURNAL_INSECTS, data: Critter): void;
    add(type: ToDoCategory.OFFERINGS, data: Offering): void;
    add(type: ToDoCategory.COOKING_RECIPES, data: CookingRecipe): void;
    add(type: ToDoCategory.JOURNAL_GEMS | ToDoCategory.JOURNAL_FOSSILS | ToDoCategory.JOURNAL_ARTIFACTS, data: Item): void
    add(type: ToDoCategory, data: any): void {

        this.getCategoryList(type).push(data);

        this.save();

    }

    getCurrentToDo(): ToDo {
        let toDo = this._toDos[this.currentToDoIndex];
        if (!toDo) {
            this.currentToDoIndex = 0;
            toDo = this._toDos[this.currentToDoIndex]
        }

        if (!toDo) {
            this._toDos.push(this._createEmptyToDo());
            toDo = this._toDos[this.currentToDoIndex];
        }

        return toDo;
    }

    save(): void {
        localStorage.setItem(ToDoService._TO_DO_STORE_KEY + this.versionSuffix, JSON.stringify(this._toDos));
    }

    read(): void {
        const toDos = localStorage.getItem(ToDoService._TO_DO_STORE_KEY + this.versionSuffix);
        if (toDos) {
            this._toDos = JSON.parse(toDos);
        } else {
            this._toDos.push(this._createEmptyToDo())
            this.save();
        }
    }

    updateStatus(category: ToDoCategory, item: MinimalItem, checked: boolean, skipTimer = false) {
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

    resetLiveToDo(): void {
        localStorage.setItem(ToDoService._TO_DO_STORE_KEY + '_live', JSON.stringify([this._createEmptyToDo()]));
        this.read();
    }

    resetBetaToDo(): void {
        localStorage.setItem(ToDoService._TO_DO_STORE_KEY + '_beta', JSON.stringify([this._createEmptyToDo()]));
        this.read()
    }

    alreadyInList(type: ToDoCategory, data: { item: MinimalItem } | MinimalItem): boolean {


        const list = this.getCategoryList(type);

        if (list.length === 0) return false;

        const dataId = ('item' in data) ? data.item.id : data.id;

        if ('item' in list[0]) {
            return !!(list as { item: MinimalItem }[]).find(entry => entry.item.id === dataId)
        } else {
            return !!(list as MinimalItem[]).find(entry => entry.id === dataId)
        }

    }

    getCategoryList(type: ToDoCategory): Array<MinimalItem | { item: MinimalItem }> {
        switch (type) {
            case ToDoCategory.OFFERINGS:
                return this.getCurrentToDo().offerings;

            case ToDoCategory.COOKING_RECIPES:
                return this.getCurrentToDo().cookingRecipes;

            case ToDoCategory.JOURNAL_CRITTER:
                return this.getCurrentToDo().journal.critter;

            case ToDoCategory.JOURNAL_INSECTS:
                return this.getCurrentToDo().journal.insects;

            case ToDoCategory.JOURNAL_ARTIFACTS:
                return this.getCurrentToDo().journal.artifacts;

            case ToDoCategory.JOURNAL_FOSSILS:
                return this.getCurrentToDo().journal.fossils;

            case ToDoCategory.JOURNAL_GEMS:
                return this.getCurrentToDo().journal.gems;

            case ToDoCategory.JOURNAL_FISH:
                return this.getCurrentToDo().journal.fish;

            default:
                return this.getCurrentToDo().uncategorized;

        }

    }

    categoryCompleted$(): Observable<ToDoCategory> {
        return this._completedCategory$.asObservable();
    }

    completeCategory(category: ToDoCategory) {
        this._completedCategory$.next(category);
    }

    private _resetClearTimer() {
        clearTimeout(this.clearTimer);
        this.clearTimer = setTimeout(() => {
            this._completeEntries()
        }, this.clearTimeout) as unknown as number;
    }

    private _createEmptyToDo(): ToDo {
        return {
            version: ToDoService._CURRENT_TO_DO_VERSION,
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
        } satisfies ToDo
    }

    private _completeEntries() {
        const completedEntries = this._markedAsCompleted.selected;
        this._markedAsCompleted.clear();

        let foundIndex = -1

        completedEntries.forEach(entry => {
            switch (entry.category) {
                case ToDoCategory.OFFERINGS:
                    foundIndex = this.getCurrentToDo().offerings.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentToDo().offerings.splice(foundIndex, 1);
                    }
                    break;
                case ToDoCategory.JOURNAL_CRITTER:
                    foundIndex = this.getCurrentToDo().journal.critter.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentToDo().journal.critter.splice(foundIndex, 1);
                    }
                    break;
                case ToDoCategory.JOURNAL_FISH:
                    foundIndex = this.getCurrentToDo().journal.fish.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentToDo().journal.fish.splice(foundIndex, 1);
                    }
                    break;
                case ToDoCategory.JOURNAL_INSECTS:
                    foundIndex = this.getCurrentToDo().journal.insects.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentToDo().journal.insects.splice(foundIndex, 1);
                    }
                    break;
                case ToDoCategory.JOURNAL_GEMS:
                    foundIndex = this.getCurrentToDo().journal.gems.findIndex(offering => offering.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentToDo().journal.gems.splice(foundIndex, 1);
                    }
                    break;
                case ToDoCategory.JOURNAL_FOSSILS:
                    foundIndex = this.getCurrentToDo().journal.fossils.findIndex(offering => offering.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentToDo().journal.fossils.splice(foundIndex, 1);
                    }
                    break;
                case ToDoCategory.JOURNAL_ARTIFACTS:
                    foundIndex = this.getCurrentToDo().journal.artifacts.findIndex(offering => offering.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentToDo().journal.artifacts.splice(foundIndex, 1);
                    }
                    break;
                case ToDoCategory.COOKING_RECIPES:
                    foundIndex = this.getCurrentToDo().cookingRecipes.findIndex(offering => offering.item.id === entry.item.id)
                    if (foundIndex >= 0) {
                        this.getCurrentToDo().cookingRecipes.splice(foundIndex, 1);
                    }
                    break;
            }
        });

        this.save()
    }
}
