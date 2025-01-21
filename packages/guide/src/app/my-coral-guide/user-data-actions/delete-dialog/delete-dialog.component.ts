import { Component, inject } from '@angular/core';
import { UserData } from "../../../core/types/user-data.type";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { UiIcon } from "@ci/data-types";

@Component({
    selector: 'app-delete-dialog',
    imports: [
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        UiIconComponent
    ],
    templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {
    dialogData = inject<{ userData: UserData }>(MAT_DIALOG_DATA);
    protected readonly UiIcon = UiIcon;
}
