import {
    booleanAttribute,
    Component,
    contentChild,
    effect,
    inject,
    input,
    signal,
    TemplateRef,
    untracked,
    WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from "../../services/database.service";
import { take } from "rxjs";
import { DatabaseItem, Quality, UiIcon } from "@ci/data-types";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "../../shared.module";
import { RouterLink } from "@angular/router";
import { AddSpacesToPascalCasePipe } from "../../pipes/add-spaces-to-pascal-case.pipe";
import { ToDoToggleComponent } from "../to-do-toggle/to-do-toggle.component";
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { ListDetailService } from "../list-detail-container/list-detail.service";
import { UiIconComponent } from "../ui-icon/ui-icon.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";


@Component({
    selector: 'app-database-item-details',
    templateUrl: './database-item-details.component.html',
    imports: [
        CommonModule,
        MatTooltipModule,
        RouterLink,
        AddSpacesToPascalCasePipe,
        SharedModule,
        ToDoToggleComponent,
        UiIconComponent,
        MatProgressSpinner
    ]
})
export class DatabaseItemDetailsComponent {
    readonly itemId = input.required<string>();
    readonly hideQualityGrid = input(false, {transform: booleanAttribute});

    readonly context = input<ToDoContext | undefined>();
    readonly amount = input<number>();
    readonly quality = input<Quality>();
    readonly databaseItemDetails = contentChild(TemplateRef)
    protected readonly databaseItem: WritableSignal<DatabaseItem | undefined> = signal(undefined);
    protected readonly isFetching = signal(false)
    protected readonly UiIcon = UiIcon;
    protected readonly uiIcon = UiIcon;
    protected readonly listDetails = inject(ListDetailService);
    private readonly database = inject(DatabaseService);

    #timer: ReturnType<typeof setTimeout> | undefined;

    constructor() {
        effect(() => {
            this.#timer = setTimeout(() => untracked(() => this.isFetching.set(true)), 150)
            this.database
                .fetchDatabaseItem$(this.itemId())
                .pipe(
                    take(1),
                ).subscribe({
                next: i => {
                    untracked(() => {
                        clearTimeout(this.#timer)
                        this.isFetching.set(false)
                        this.databaseItem.set(i);
                    })
                },
                error: () => {
                    clearTimeout(this.#timer)
                    untracked(() => this.isFetching.set(false))
                }
            })
        }, {allowSignalWrites: true});
    }
}
