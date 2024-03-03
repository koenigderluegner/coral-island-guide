import {
    booleanAttribute,
    Component,
    ContentChild,
    inject,
    Input,
    OnChanges,
    signal,
    SimpleChanges,
    TemplateRef,
    WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from "../../services/database.service";
import { take } from "rxjs";
import { DatabaseItem, UiIcon } from "@ci/data-types";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "../../shared.module";
import { RouterLink } from "@angular/router";
import { DatabaseItemDetailsDirective } from "../../directives/database-item-details.directive";
import { AddSpacesToPascalCasePipe } from "../../pipes/add-spaces-to-pascal-case.pipe";


@Component({
    selector: 'app-database-item-details',
    templateUrl: './database-item-details.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MatTooltipModule,
        RouterLink,
        AddSpacesToPascalCasePipe,
        DatabaseItemDetailsDirective,
        SharedModule
    ],

})
export class DatabaseItemDetailsComponent implements OnChanges {
    @Input({required: true}) itemId!: string;
    @Input({transform: booleanAttribute}) hideQualityGrid = false;
    @Input() amount?: number;
    @ContentChild(TemplateRef) databaseItemDetails: TemplateRef<any> | null = null;
    protected databaseItem: WritableSignal<DatabaseItem | undefined> = signal(undefined)
    protected readonly UiIcon = UiIcon;
    protected readonly uiIcon = UiIcon;
    private readonly database = inject(DatabaseService);

    ngOnChanges(changes: SimpleChanges): void {
        const itemId = changes['itemId']?.currentValue;
        if (itemId) {
            console.log('eyo', itemId)
            this.database
                .fetchDatabaseItem$(itemId)
                .pipe(
                    take(1)
                ).subscribe({
                next: i => {
                    this.databaseItem.set(i)
                }
            })
        }
    }
}
