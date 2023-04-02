import { Component, inject } from '@angular/core';
import { DatabaseService } from "../../services/database.service";

@Component({
    template: '',
})
export class BaseSelectableContainerComponent<T> {


    showTable = false;
    openDrawer = false;
    selectedEntity?: T;
    protected readonly _database: DatabaseService = inject(DatabaseService)

    showDetails(selectedEntry?: T) {
        this.selectedEntity = selectedEntry;
        this.openDrawer = true;
    }

}
