import { Component, inject } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { ToDoService } from "../../../core/services/to-do.service";

@Component({
    template: '',
})
export class BaseSelectableContainerComponent<T> {


    showTable = false;
    openDrawer = false;
    selectedEntity?: T;
    protected readonly _database: DatabaseService = inject(DatabaseService)
    protected readonly _todo: ToDoService = inject(ToDoService)

    showDetails(selectedEntry?: T) {
        this.selectedEntity = selectedEntry;
        this.openDrawer = true;
    }

    registerToToDo?(entry: T): void;

}
