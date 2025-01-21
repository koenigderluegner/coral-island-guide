import { Component, computed, effect, inject, linkedSignal, untracked } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { UserDataService } from "../../core/services/user-data.service";
import { FormsModule } from "@angular/forms";
import { EditDialogComponent } from "./edit-dialog/edit-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { UiIconComponent } from "../../shared/components/ui-icon/ui-icon.component";
import { UiIcon } from "@ci/data-types";

@Component({
    selector: 'app-user-data-actions',
    imports: [
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        FormsModule,
        UiIconComponent
    ],
    templateUrl: './user-data-actions.component.html',
    host: {
        'class': 'inline-flex gap-2 items-start flex-wrap'
    }
})
export class UserDataActionsComponent {
    protected readonly UiIcon = UiIcon;
    readonly #userDataService = inject(UserDataService);
    protected readonly options = computed(() => this.#userDataService.userData().data);
    protected readonly selectedIndex = linkedSignal(() => this.#userDataService.userData().currentIndex);
    readonly #dialog = inject(MatDialog);

    constructor() {
        effect(() => {
            const selectedIndex = this.selectedIndex();
            this.#userDataService.currentIndex.set(selectedIndex);
            untracked(() => {
                this.#userDataService.save();
            })
        });
    }

    openAddDialog() {
        const dialogRef = this.#dialog.open(AddDialogComponent, {
            hasBackdrop: true,
            width: '400px'
        });

        dialogRef.afterClosed().subscribe({
            next: (newName: string | undefined) => {
                if (newName) {
                    const userdata = this.#userDataService.createEmptyUserData(newName);
                    this.#userDataService.userData()?.data.push(userdata);
                    this.#userDataService.save();
                }

            }
        })
    }

    openEditDialog() {
        const dialogRef = this.#dialog.open(EditDialogComponent, {
            data: {userData: this.#userDataService.currentData()},
            hasBackdrop: true,
            width: '400px'
        });

        dialogRef.afterClosed().subscribe({
            next: (newName: string | undefined) => {
                if (newName) {
                    this.#userDataService.currentData().name = newName;
                    this.#userDataService.save();
                }
            }
        })
    }

    openDeleteDialog() {
        const dialogRef = this.#dialog.open(DeleteDialogComponent, {
            data: {userData: this.#userDataService.currentData()},
            hasBackdrop: true,
            width: '400px'
        });

        dialogRef.afterClosed().subscribe({
            next: (confirmed: undefined | boolean) => {
                if (confirmed) {
                    this.#userDataService.delete();
                    this.selectedIndex.set(this.#userDataService.currentIndex());
                }
            }
        })
    }
}
