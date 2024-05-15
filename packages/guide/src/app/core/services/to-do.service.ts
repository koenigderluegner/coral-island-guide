import { inject, Injectable } from '@angular/core';
import { ToDoCategory } from "../enums/todo-category.enum";
import { CookingRecipe, Critter, Fish, Item, MinimalItem, MinimalTagBasedItem, Offering } from "@ci/data-types";
import { LegacyToDo } from "../interfaces/legacy-todo.interface";
import { SelectionModel } from "@angular/cdk/collections";
import { SettingsService } from "../../shared/services/settings.service";
import { Observable, Subject } from "rxjs";
import { entityKey } from "@ci/util";
import { ToDo } from "../types/to-do.type";
import { UserDataService } from "./user-data.service";
import { ToDoContext } from "../types/to-do-context.type";
import { ItemEntry } from "../../shared/types/item-entry.type";

type MarkedSelection = { category: ToDoContext | undefined, item: MinimalItem | MinimalTagBasedItem };

@Injectable({
    providedIn: 'root'
})
export class ToDoService {

    private static _CURRENT_TO_DO_VERSION = 1
    // TODO migrate
    private static _LEGACY_TO_DO_STORE_KEY = 'checklist'
    clearTimer?: number;
    clearTimeout = 3000;
    userDataService = inject(UserDataService)
    private _completedCategory$: Subject<ToDoContext> = new Subject<ToDoContext>();
    private _markedAsCompleted: SelectionModel<MarkedSelection> = new SelectionModel<MarkedSelection>(true, [])
    private readonly versionSuffix: string;

    constructor(private readonly _settings: SettingsService) {
        this.versionSuffix = this._settings.getSettings().useBeta ? '_beta' : '_live';
        this.read();
        this._markedAsCompleted.compareWith = (o1, o2) => {
            return o1.category === o2.category && entityKey(o1.item) === entityKey(o2.item)
        }
    }

    get currentToDoAmount(): number {
        return this.getCurrentToDo().length;
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
        // TODO migrate
        this.getCategoryList(type).push(data);

        this.save();

    }

    getCurrentToDo(): ToDo[] {
        const userData = this.userDataService.userData();
        return userData.data[userData.currentIndex].todos
    }

    save(): void {
      this.userDataService.save()
    }

    read(): void {
        const toDos = localStorage.getItem(ToDoService._LEGACY_TO_DO_STORE_KEY + this.versionSuffix);
        if (toDos) {
            this._migrate(JSON.parse(toDos));

        }
    }

    updateStatus(category: ToDoContext | undefined, item: MinimalItem | MinimalTagBasedItem, checked: boolean, skipTimer = false) {
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
        // TODO migrate
        localStorage.setItem(ToDoService._LEGACY_TO_DO_STORE_KEY + '_live', JSON.stringify([this._createEmptyToDo()]));
        this.read();
    }

    resetBetaToDo(): void {
        // TODO migrate
        localStorage.setItem(ToDoService._LEGACY_TO_DO_STORE_KEY + '_beta', JSON.stringify([this._createEmptyToDo()]));
        this.read()
    }

    alreadyInList(type: ToDoContext, data: ItemEntry): boolean {

        const list = this.getCategoryList(type);

        if (list.length === 0) return false;

        const dataId = entityKey(data)

        return !!(list).find(entry => {
            return entityKey(entry.itemEntry) === dataId
        })


    }

    getCategoryList(type?: ToDoContext): ToDo[] {
        const currentToDo = this.getCurrentToDo();
        return currentToDo.filter(t => t.context === type)
    }

    categoryCompleted$(): Observable<ToDoContext> {
        return this._completedCategory$.asObservable();
    }

    completeCategory(category: ToDoContext) {
        this._completedCategory$.next(category);
    }

    private _resetClearTimer() {
        clearTimeout(this.clearTimer);
        this.clearTimer = setTimeout(() => {
            this._completeEntries()
        }, this.clearTimeout) as unknown as number;
    }

    private _createEmptyToDo(): LegacyToDo {
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
        } satisfies LegacyToDo
    }

    private _completeEntries() {
        const completedEntries = this._markedAsCompleted.selected;
        this._markedAsCompleted.clear();

        let foundIndex = -1

        completedEntries.forEach(entry => {
            const entryId = entityKey(entry.item);

            foundIndex = this.getCurrentToDo().findIndex(offering => {
                const offeringKey = entityKey(offering.itemEntry);
                return offeringKey === entryId && offering.context === entry.category
            })
            if (foundIndex >= 0) {
                this.getCurrentToDo().splice(foundIndex, 1);
            }
        });

        this.save()
    }

    private _migrate(parsedSettings: LegacyToDo[] | ToDo[]): ToDo[] {
        if (!parsedSettings.length) return [];
        if ('version' in parsedSettings[0]) {

            (parsedSettings as LegacyToDo[]).forEach((legacyTodo, index) => {
                const toDos: ToDo[] = [];
                legacyTodo.cookingRecipes.forEach(cr => toDos.push({
                    context: "cooking_recipes",
                    itemEntry: cr.item,
                }))

                legacyTodo.offerings.forEach(cr => toDos.push({
                    context: "offerings",
                    itemEntry: cr.item,
                    amount: cr.amount,
                    quality: cr.quality
                }))

                legacyTodo.uncategorized.forEach(cr => toDos.push({
                    itemEntry: cr
                }))

                legacyTodo.journal.artifacts.forEach(cr => toDos.push({
                    context: "journal_artifacts",
                    itemEntry: cr
                }))

                legacyTodo.journal.gems.forEach(cr => toDos.push({
                    context: "journal_gems",
                    itemEntry: cr
                }))

                legacyTodo.journal.fossils.forEach(cr => toDos.push({
                    context: "journal_fossils",
                    itemEntry: cr
                }))

                legacyTodo.journal.critter.forEach(cr => toDos.push({
                    context: "journal_critter",
                    itemEntry: cr.item
                }))

                legacyTodo.journal.fish.forEach(cr => toDos.push({
                    context: "journal_fish",
                    itemEntry: cr.item
                }))

                legacyTodo.journal.insects.forEach(cr => toDos.push({
                    context: "journal_insects",
                    itemEntry: cr.item
                }))

                const userData = this.userDataService.userData().data[index];
                if (userData)
                    userData.todos = toDos

            })


        }
        return parsedSettings as ToDo[];
    }
}
