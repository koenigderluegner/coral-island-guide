import { Component, inject } from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { UiIcon } from "@ci/data-types";

@Component({
    selector: 'app-add-dialog',
    imports: [
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        UiIconComponent
    ],
    templateUrl: './add-dialog.component.html'
})
export class AddDialogComponent {
    dialogRef = inject(MatDialogRef<AddDialogComponent, string>)
    protected nameControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
    protected readonly UiIcon = UiIcon;

    save() {
        this.dialogRef.close(this.nameControl.value.trim());
    }


}
