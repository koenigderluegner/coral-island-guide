import { Component, effect, inject, linkedSignal, signal, untracked } from '@angular/core';
import { ToDoService } from "../core/services/to-do.service";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToDoContext, ToDoContextDisplayNames, ToDoContexts } from "../core/types/to-do-context.type";
import { ToDoFilterOptions } from "./types/to-do-filter-options.type";
import { BaseSelectableContainerComponent } from "../shared/components/base-selectable-container/base-selectable-container.component";
import { ItemEntry } from "../shared/types/item-entry.type";
import { ToDoPartialComponent } from "./components/to-do-partial/to-do-partial.component";
import { MatFormField, MatOption, MatSelect, MatSelectTrigger } from "@angular/material/select";
import { CardComponent } from "../shared/components/card/card.component";
import { ItemCardSwitchComponent } from "../shared/components/item-card-switch/item-card-switch.component";
import { OfferingComponent } from "../shared/components/database-item-details/offering/offering.component";
import { ListDetailContainerComponent } from "../shared/components/list-detail-container/list-detail-container.component";
import { DatabaseItemDetailsDirective } from "../shared/directives/database-item-details.directive";
import { MatInput } from "@angular/material/input";
import { RouterLink } from "@angular/router";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { UserDataService } from "../core/services/user-data.service";

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styles: [`
        app-to-do-partial:not(.hidden) ~ .show-when-none-displayed {
            display: none;
        }
    `],
    imports: [
        ToDoPartialComponent,
        MatSelect,
        MatSelectTrigger,
        MatFormField,
        CardComponent,
        ItemCardSwitchComponent,
        OfferingComponent,
        ListDetailContainerComponent,
        DatabaseItemDetailsDirective,
        MatOption,
        ReactiveFormsModule,
        MatInput,
        RouterLink,
        CdkTextareaAutosize,
        FormsModule
    ]
})
export class ToDoComponent extends BaseSelectableContainerComponent<ItemEntry> {

    toDoContexts = ToDoContexts;
    toDoContextDisplayNames = ToDoContextDisplayNames;
    toDoCategoryControl: FormControl<ToDoFilterOptions[]> = new FormControl(['all', ...ToDoContexts, 'uncategorized'], {nonNullable: true});
    protected readonly toDoService = inject(ToDoService);
    protected readonly userDataService = inject(UserDataService);
    protected todoText = linkedSignal(() => this.userDataService.getCurrentData().todoText);
    protected selectedContext = signal<ToDoContext>('uncategorized');
    private hadAllBefore = true;

    constructor() {
        super()
        this.toDoCategoryControl.valueChanges.pipe(
            takeUntilDestroyed()
        ).subscribe({
            next: value => {
                if (this.hadAllBefore && !value.includes('all')) {
                    this.toDoCategoryControl.setValue([], {emitEvent: false})
                    this.hadAllBefore = false;
                } else if (!this.hadAllBefore && value.includes('all')) {
                    this.toDoCategoryControl.setValue(['all', ...this.toDoContexts], {emitEvent: false});
                    this.hadAllBefore = true;
                } else if (this.hadAllBefore && value.length < (this.toDoContexts.length + 1)) {
                    this.toDoCategoryControl.setValue(value.filter(s => s !== 'all'), {emitEvent: false})
                    this.hadAllBefore = false;
                }

            }
        });

        effect(() => {
            const todoText = this.todoText();
            untracked(() => {
                this.userDataService.getCurrentData().todoText = todoText;
                this.userDataService.save();
            })
        });
    }

    openEntry($event: ItemEntry, context: ToDoContext) {
        this.showDetails($event);
        this.selectedContext.set(context)
    }
}
