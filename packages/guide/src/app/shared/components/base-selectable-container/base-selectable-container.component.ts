import { Component, DestroyRef, effect, inject, viewChild } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { ListDetailService } from "../list-detail-container/list-detail.service";
import { ListDetailContainerComponent } from "../list-detail-container/list-detail-container.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export interface BaseSelectableContainerComponent<T> {
    onIdSelected?(selectedId: string): void;
}

@Component({
    template: '',
    standalone: false
})
export class BaseSelectableContainerComponent<T> {

    showTable = false;
    selectedEntity?: T;
    selectedId?: string;
    listDetailComponent = viewChild.required<ListDetailContainerComponent>(ListDetailContainerComponent);
    protected readonly _database: DatabaseService = inject(DatabaseService)
    protected readonly _route: ActivatedRoute = inject(ActivatedRoute);
    protected readonly listDetail = inject(ListDetailService);

    protected destroyRef = inject(DestroyRef)

    constructor() {
        this._route.queryParams.pipe(take(1)).subscribe({
            next: params => {
                this.selectedId = params['selectedId'];
                if (this.onIdSelected && this.selectedId) {
                    this.onIdSelected(this.selectedId)
                }
            }


        })

        effect(() => {
            this.listDetailComponent().drawer()?._closedStream.pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe({
                next: () => {
                    this.selectedEntity = undefined;
                }
            })

        })

    }

    showDetails(selectedEntry?: T) {
        this.selectedEntity = selectedEntry;
        this.listDetail.open()
    }

}
