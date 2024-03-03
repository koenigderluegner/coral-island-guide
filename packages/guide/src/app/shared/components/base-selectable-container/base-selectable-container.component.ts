import { Component, inject } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { ToDoService } from "../../../core/services/to-do.service";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";

export interface BaseSelectableContainerComponent<T> {
    onIdSelected?(selectedId: string): void;
}

@Component({
    template: '',
})
export class BaseSelectableContainerComponent<T> {


    showTable = false;
    openDrawer = false;
    selectedEntity?: T;
    selectedId?: string;
    protected readonly _database: DatabaseService = inject(DatabaseService)
    protected readonly _todo: ToDoService = inject(ToDoService)
    protected readonly _route: ActivatedRoute = inject(ActivatedRoute);

    constructor() {
        this._route.queryParams.pipe(take(1)).subscribe({
            next: params => {
                this.selectedId = params['selectedId'];
                if (this.onIdSelected && this.selectedId) {
                    this.onIdSelected(this.selectedId)
                }
            }
        })
    }

    showDetails(selectedEntry?: T) {
        this.selectedEntity = selectedEntry;
        this.openDrawer = true;
    }

    registerToToDo?(entry: T): void;

}
