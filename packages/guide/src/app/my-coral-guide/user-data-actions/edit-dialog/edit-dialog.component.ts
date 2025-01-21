import { Component, inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UiIcon } from '@ci/data-types';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { UserData } from "../../../core/types/user-data.type";

@Component({
    selector: 'app-edit-dialog',
    imports: [
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        UiIconComponent,
        ReactiveFormsModule
    ],
    templateUrl: './edit-dialog.component.html'
})
export class EditDialogComponent {

    dialogData = inject<{ userData: UserData }>(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<EditDialogComponent, string>)
    protected nameControl: FormControl<string> = new FormControl<string>(this.dialogData.userData.name, {nonNullable: true});
    protected readonly UiIcon = UiIcon;

    save() {
        this.dialogRef.close(this.nameControl.value.trim());
    }
}
